import { exists } from "@std/fs";
import { updateText } from "./lib/util.ts";

interface ApiEndpoint {
  path: string;
  method: string;
  description?: string;
}

function parseApiFile(content: string): ApiEndpoint[] {
  const endpoints: ApiEndpoint[] = [];

  // Split content into lines for easier processing
  const lines = content.split("\n");

  let currentPath = "";
  let currentDescription = "";
  let inPathsInterface = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if we're entering the paths interface
    if (line.includes("export interface paths")) {
      inPathsInterface = true;
      continue;
    }

    // Check if we're leaving the paths interface
    if (inPathsInterface && line === "}") {
      break;
    }

    if (!inPathsInterface) continue;

    // Look for path definitions (lines that start with "/")
    const pathMatch = line.match(/^"([^"]+)":\s*{/);
    if (pathMatch) {
      currentPath = pathMatch[1];
      currentDescription = "";
      continue;
    }

    // Look for HTTP method definitions
    const methodMatch = line.match(
      /^(get|post|put|delete|patch|options|head|trace):\s*(?:operations\["[^"]+"\]|never);/,
    );
    if (methodMatch) {
      const method = methodMatch[1];
      const isNever = line.includes("never");
      if (!isNever) {
        endpoints.push({
          path: currentPath,
          method: method.toUpperCase(),
          description: currentDescription.trim() || undefined,
        });
      }
      continue;
    }

    // Look for JSDoc comments that might contain descriptions
    if (line.startsWith("/**") && !line.includes("@")) {
      // Extract description from JSDoc comment
      const descMatch = line.match(/\/\*\*\s*(.+)/);
      if (descMatch) {
        currentDescription = descMatch[1].replace(/\*\//, "").trim();
      }
    } else if (
      line.startsWith("*") && !line.includes("@") && currentDescription === ""
    ) {
      // Multi-line JSDoc comment
      const descMatch = line.match(/^\*\s*(.+)/);
      if (descMatch) {
        currentDescription = descMatch[1].replace(/\*\//, "").trim();
      }
    }
  }

  return endpoints;
}

function generateMarkdownTable(endpoints: ApiEndpoint[]): string {
  // Sort endpoints alphabetically by path
  const sortedEndpoints = [...endpoints].sort((a, b) =>
    a.path.localeCompare(b.path)
  );

  let markdown = "| Path | Method | Description |\n";
  markdown += "|------|--------|-------------|\n";

  for (const endpoint of sortedEndpoints) {
    const description = endpoint.description || "";
    markdown +=
      `| \`${endpoint.path}\` | ${endpoint.method} | ${description} |\n`;
  }

  return markdown;
}

async function main() {
  const apiFileExists = await exists("./src/frigate-api.d.ts");
  if (!apiFileExists) {
    throw new Error("Frigate API types not found");
  }

  const readmeExists = await exists("README.md");
  if (!readmeExists) {
    throw new Error("README.md not found");
  }

  const readmeContent = await Deno.readTextFile("README.md");

  try {
    // Read the API definition file
    const apiFileContent = await Deno.readTextFile("./src/frigate-api.d.ts");

    const start = apiFileContent.indexOf("export interface paths {");
    if (start === -1) {
      throw new Error("Frigate API types not found");
    }

    const newFile = apiFileContent.slice(start);

    const header = `
  /**
   * Frigate API
   *
   * Auto generated using the frigate-api.yaml and [openapi-typescript](https://openapi-ts.dev/introduction)
   *
   * @see https://github.com/blakeblackshear/frigate/blob/dev/docs/static/frigate-api.yaml
   */
  `;

    const updatedApiFileContent = `${header}\n${newFile}`;

    const endpoints = parseApiFile(updatedApiFileContent);

    console.log(`Found ${endpoints.length} API endpoint methods`);

    // Generate markdown table
    const markdown = generateMarkdownTable(endpoints);

    const { updatedText, hasChanges } = updateText(
      "API_ENDPOINTS",
      readmeContent,
      markdown,
    );

    if (hasChanges) {
      await Deno.writeTextFile("README.md", updatedText);
    }

    console.log("Generated documentation");
    console.log("- api-endpoints.md (Markdown table)");

    // Print summary to console
    console.log("\nSummary:");
    const methodCounts: Record<string, number> = {};
    endpoints.forEach((endpoint) => {
      methodCounts[endpoint.method] = (methodCounts[endpoint.method] || 0) + 1;
    });

    console.log("Method distribution:");
    Object.entries(methodCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([method, count]) => {
        console.log(`  ${method}: ${count} endpoints`);
      });

    // Show first few endpoints as preview
    console.log("\nFirst 5 endpoint methods:");
    endpoints.slice(0, 5).forEach((endpoint) => {
      console.log(
        `  ${endpoint.method} ${endpoint.path} - ${
          endpoint.description || "No description"
        }`,
      );
    });

    await Deno.writeTextFile("./src/frigate-api.d.ts", updatedApiFileContent);
  } catch (error) {
    console.error("Error:", (error as Error).message);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}
