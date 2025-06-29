# Frigate Data API

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/j3lte/frigate-api?style=for-the-badge)](https://github.com/j3lte/frigate-api/releases/latest "GitHub release (latest by date)")
[![NPM Version](https://img.shields.io/npm/v/@j3lte/frigate-api?style=for-the-badge)](https://www.npmjs.com/package/frigate-api "NPM Version")
[![GitHub Release Date](https://img.shields.io/github/release-date/j3lte/frigate-api?style=for-the-badge)](https://github.com/j3lte/frigate-api/releases/latest "GitHub Release Date")
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/j3lte/frigate-api?style=for-the-badge)
[![GitHub](https://img.shields.io/github/license/j3lte/frigate-api?style=for-the-badge)](https://github.com/j3lte/frigate-api/blob/main/LICENSE "GitHub License")
[![GitHub last commit](https://img.shields.io/github/last-commit/j3lte/frigate-api?style=for-the-badge)](https://github.com/j3lte/frigate-api/commits/main "GitHub last commit")
[![GitHub issues](https://img.shields.io/github/issues/j3lte/frigate-api?style=for-the-badge)](https://github.com/j3lte/frigate-api/issues "Github Issues")
[![JSR docs](https://img.shields.io/badge/JSR-Docs-blue?style=for-the-badge)](https://jsr.io/@j3lte/frigate-api/doc "Deno docs")

This is a Deno/Node.js library for the
[Frigate Data API](https://docs.frigate.video/).

## Installation

### Deno

```bash
deno add jsr:@j3lte/frigate-api
```

### Node.js

```bash
npm install @j3lte/frigate-api
```

## Docs

Documentation is available at [JSR.io](https://jsr.io/@j3lte/frigate-api).

## Usage

```typescript
import { FrigateClient } from "@j3lte/frigate-api";

const frigate = new FrigateClient("http://localhost:8000/api/");

// You can use `get`, `post`, `put`, `delete` to make raw requests
// Note: Some endpoints do not return JSON, so you need to specify the parseAs option (text, blob, stream)
const healty = await frigate.get("/", { parseAs: "text" });

console.log(healty.data);
// Should return: 'Frigate is running. Alive and healthy!'

// Use other methods
const isHealthy = await frigate.isHealthy(); // Boolean
const version = await frigate.version(); // String
const config = await frigate.config(); // JSON
const configRaw = await frigate.configRaw(); // YAML
const configSchema = await frigate.configSchema(); // JSON
const stats = await frigate.stats(); // JSON
const statsHistory = await frigate.statsHistory(); // JSON
const timeline = await frigate.timeline(); // JSON
const logs = await frigate.logs("frigate"); // LogsServiceReturn
```

# Frigate API Endpoints

> Note: Not all endpoints might work, some might be unavailable in the Open
> Source version of Frigate.

Please consult the
[Frigate HTTPAPI documentation](https://docs.frigate.video/integrations/api/frigate-http-api)

<!-- START API_ENDPOINTS -->

| Path                                                          | Method | Description                       |
| ------------------------------------------------------------- | ------ | --------------------------------- |
| `/`                                                           | GET    | Is Healthy                        |
| `/{camera_name}`                                              | GET    | Mjpeg Feed                        |
| `/{camera_name}/{label}/best.jpg`                             | GET    | Label Thumbnail                   |
| `/{camera_name}/{label}/clip.mp4`                             | GET    | Label Clip                        |
| `/{camera_name}/{label}/snapshot.jpg`                         | GET    | Label Snapshot                    |
| `/{camera_name}/{label}/thumbnail.jpg`                        | GET    | Label Thumbnail                   |
| `/{camera_name}/grid.jpg`                                     | GET    | Grid Snapshot                     |
| `/{camera_name}/latest.{extension}`                           | GET    | Latest Frame                      |
| `/{camera_name}/plus/{frame_time}`                            | POST   | Submit Recording Snapshot To Plus |
| `/{camera_name}/ptz/info`                                     | GET    | Camera Ptz Info                   |
| `/{camera_name}/recordings`                                   | GET    | Recordings                        |
| `/{camera_name}/recordings/{frame_time}/snapshot.{format}`    | GET    | Get Snapshot From Recording       |
| `/{camera_name}/recordings/summary`                           | GET    | Recordings Summary                |
| `/{camera_name}/start/{start_ts}/end/{end_ts}/clip.mp4`       | GET    | Recording Clip                    |
| `/{camera_name}/start/{start_ts}/end/{end_ts}/preview.gif`    | GET    | Preview Gif                       |
| `/{camera_name}/start/{start_ts}/end/{end_ts}/preview.mp4`    | GET    | Preview Mp4                       |
| `/auth`                                                       | GET    | Auth                              |
| `/config`                                                     | GET    | Config                            |
| `/config/raw`                                                 | GET    | Config Raw                        |
| `/config/save`                                                | POST   | Config Save                       |
| `/config/schema.json`                                         | GET    | Config Schema                     |
| `/config/set`                                                 | PUT    | Config Set                        |
| `/event_ids`                                                  | GET    | Event Ids                         |
| `/events`                                                     | GET    | Events                            |
| `/events/`                                                    | DELETE | Delete Events                     |
| `/events/{camera_name}/{label}/create`                        | POST   | Create Event                      |
| `/events/{event_id}`                                          | GET    | Event                             |
| `/events/{event_id}`                                          | DELETE | Delete Event                      |
| `/events/{event_id}/clip.mp4`                                 | GET    | Event Clip                        |
| `/events/{event_id}/description`                              | POST   | Set Description                   |
| `/events/{event_id}/description/regenerate`                   | PUT    | Regenerate Description            |
| `/events/{event_id}/end`                                      | PUT    | End Event                         |
| `/events/{event_id}/false_positive`                           | PUT    | False Positive                    |
| `/events/{event_id}/plus`                                     | POST   | Send To Plus                      |
| `/events/{event_id}/preview.gif`                              | GET    | Event Preview                     |
| `/events/{event_id}/retain`                                   | POST   | Set Retain                        |
| `/events/{event_id}/retain`                                   | DELETE | Delete Retain                     |
| `/events/{event_id}/snapshot-clean.png`                       | GET    | Event Snapshot Clean              |
| `/events/{event_id}/snapshot.jpg`                             | GET    | Event Snapshot                    |
| `/events/{event_id}/sub_label`                                | POST   | Set Sub Label                     |
| `/events/{event_id}/thumbnail.{extension}`                    | GET    | Event Thumbnail                   |
| `/events/explore`                                             | GET    | Events Explore                    |
| `/events/search`                                              | GET    | Events Search                     |
| `/events/summary`                                             | GET    | Events Summary                    |
| `/export/{camera_name}/start/{start_time}/end/{end_time}`     | POST   | Export Recording                  |
| `/export/{event_id}`                                          | DELETE | Export Delete                     |
| `/export/{event_id}/rename`                                   | PATCH  | Export Rename                     |
| `/exports`                                                    | GET    | Get Exports                       |
| `/exports/{export_id}`                                        | GET    | Get Export                        |
| `/faces`                                                      | GET    | Get Faces                         |
| `/faces/{name}/create`                                        | POST   | Create Face                       |
| `/faces/{name}/delete`                                        | POST   | Deregister Faces                  |
| `/faces/{name}/register`                                      | POST   | Register Face                     |
| `/faces/recognize`                                            | POST   | Recognize Face                    |
| `/faces/reprocess`                                            | POST   | Reclassify Face                   |
| `/faces/train/{name}/classify`                                | POST   | Train Face                        |
| `/ffprobe`                                                    | GET    | Ffprobe                           |
| `/go2rtc/streams`                                             | GET    | Go2Rtc Streams                    |
| `/go2rtc/streams/{camera_name}`                               | GET    | Go2Rtc Camera Stream              |
| `/labels`                                                     | GET    | Get Labels                        |
| `/login`                                                      | POST   | Login                             |
| `/logout`                                                     | GET    | Logout                            |
| `/logs/{service}`                                             | GET    | Logs                              |
| `/lpr/reprocess`                                              | PUT    | Reprocess License Plate           |
| `/metrics`                                                    | GET    | Metrics                           |
| `/notifications/pubkey`                                       | GET    | Get Vapid Pub Key                 |
| `/notifications/register`                                     | POST   | Register Notifications            |
| `/nvinfo`                                                     | GET    | Nvinfo                            |
| `/plus/models`                                                | GET    | Plusmodels                        |
| `/preview/{camera_name}/start/{start_ts}/end/{end_ts}`        | GET    | Preview Ts                        |
| `/preview/{camera_name}/start/{start_ts}/end/{end_ts}/frames` | GET    | Get Preview Frames From Cache     |
| `/preview/{file_name}/thumbnail.jpg`                          | GET    | Preview Thumbnail                 |
| `/preview/{file_name}/thumbnail.webp`                         | GET    | Preview Thumbnail                 |
| `/preview/{year_month}/{day}/{hour}/{camera_name}/{tz_name}`  | GET    | Preview Hour                      |
| `/profile`                                                    | GET    | Profile                           |
| `/recognized_license_plates`                                  | GET    | Get Recognized License Plates     |
| `/recordings/storage`                                         | GET    | Get Recordings Storage Usage      |
| `/recordings/summary`                                         | GET    | All Recordings Summary            |
| `/reindex`                                                    | PUT    | Reindex Embeddings                |
| `/restart`                                                    | POST   | Restart                           |
| `/review`                                                     | GET    | Review                            |
| `/review_ids`                                                 | GET    | Review Ids                        |
| `/review/{event_id}/preview`                                  | GET    | Review Preview                    |
| `/review/{review_id}`                                         | GET    | Get Review                        |
| `/review/{review_id}/viewed`                                  | DELETE | Set Not Reviewed                  |
| `/review/activity/motion`                                     | GET    | Motion Activity                   |
| `/review/event/{event_id}`                                    | GET    | Get Review From Event             |
| `/review/summary`                                             | GET    | Review Summary                    |
| `/reviews/delete`                                             | POST   | Delete Reviews                    |
| `/reviews/viewed`                                             | POST   | Set Multiple Reviewed             |
| `/stats`                                                      | GET    | Stats                             |
| `/stats/history`                                              | GET    | Stats History                     |
| `/sub_labels`                                                 | GET    | Get Sub Labels                    |
| `/timeline`                                                   | GET    | Timeline                          |
| `/timeline/hourly`                                            | GET    | Hourly Timeline                   |
| `/users`                                                      | GET    | Get Users                         |
| `/users`                                                      | POST   | Create User                       |
| `/users/{username}`                                           | DELETE | Delete User                       |
| `/users/{username}/password`                                  | PUT    | Update Password                   |
| `/users/{username}/role`                                      | PUT    | Update Role                       |
| `/vainfo`                                                     | GET    | Vainfo                            |
| `/version`                                                    | GET    | Version                           |
| `/vod/{camera_name}/start/{start_ts}/end/{end_ts}`            | GET    | Vod Ts                            |
| `/vod/{year_month}/{day}/{hour}/{camera_name}`                | GET    | Vod Hour No Timezone              |
| `/vod/{year_month}/{day}/{hour}/{camera_name}/{tz_name}`      | GET    | Vod Hour                          |
| `/vod/event/{event_id}`                                       | GET    | Vod Event                         |

<!-- END API_ENDPOINTS -->
