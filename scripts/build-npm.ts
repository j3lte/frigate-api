import { build, emptyDir } from "@deno/dnt";

const cleanupTypes = async (dir: string) => {
  for await (const dirEntry of Deno.readDir(dir)) {
    const entryPath = `${dir}/${dirEntry.name}`;
    if (dirEntry.isDirectory) {
      await cleanupTypes(entryPath);
    } else {
      const file = await Deno.readTextFile(entryPath);
      const newFile = file.replaceAll('.js"', '"');
      await Deno.writeTextFile(entryPath, newFile);
    }
  }
};

await emptyDir("./npm");

console.log("Building npm package");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  declaration: "separate",
  skipSourceOutput: true,
  // scriptModule: false,
  shims: {},
  test: false,
  typeCheck: false,
  compilerOptions: {
    importHelpers: true,
    target: "ES2021",
    lib: ["ESNext"],
  },
  package: {
    // package.json properties
    name: "@j3lte/frigate-api",
    version: Deno.args[0] || "0.1.0",
    description: "Get Frigate data from the Frigate Data API",
    license: "MIT",
    publishConfiig: {
      access: "public",
    },
    keywords: [
      "frigate",
      "api",
      "deno",
      "typescript",
    ],
    author: {
      name: "J.W. Lagendijk",
      email: "jwlagendijk@gmail.com",
    },
    repository: {
      type: "git",
      url: "git+https://github.com/j3lte/frigate-api.git",
    },
    bugs: {
      url: "https://github.com/j3lte/frigate-api/issues",
    },
  },
  async postBuild(): Promise<void> {
    // steps to run after building and before running the tests
    await Deno.copyFile("./LICENSE", "npm/LICENSE");
    await Deno.copyFile("./README.md", "npm/README.md");
    await Deno.copyFile(
      "./src/frigate-api.d.ts",
      "npm/types/src/frigate-api.d.ts",
    );
    await cleanupTypes("./npm/types");
  },
});
