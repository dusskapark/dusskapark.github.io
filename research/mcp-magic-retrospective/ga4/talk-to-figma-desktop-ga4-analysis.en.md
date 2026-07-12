# TalkToFigma Desktop GA4 Analysis

Created: 2026-07-01
Source: GA4 `Figma MCP Agent` / `properties/499789310`
Analysis period: 2025-07-01 to 2026-06-30
Effective data start: 2025-08

Raw data:

- `data/ga4/talk-to-figma-desktop-ga4-raw-data.md`
- `data/ga4/talk-to-figma-desktop-ga4-raw-data.csv`
- `data/ga4/talk-to-figma-desktop-ga4-raw-data.json`

## One-Line Takeaway

In the end, the core value was not adding more features. It was reducing the anxiety between first launch and first connection. The GA4 data shows that this desktop app was not just a small experiment: many people opened it, connected it, and used it to call real MCP tools.

## Presentation-Ready Top Metrics

| Metric | Value | Interpretation |
|---|---:|---|
| Active users | 31,360 | Meaningful scale for a desktop utility over one year |
| Total users | 31,560 | Close to active users, suggesting execution-based telemetry |
| Sessions | 24,429 | Evidence of repeated app usage |
| Total events | 1,826,813 | Useful as telemetry scale, but not a pure success metric |
| MCP tool calls | 570,373 | The strongest evidence of actual workflow usage |
| Successful MCP calls | 536,267 | About 94.1% success among calls with explicit success/failure values |
| Country values | 165 | Includes `not set`; use as global spread evidence carefully |
| Top country | South Korea, 4,263 active users | Largest active-user country |
| Top language | English, 18,875 active users | The project reached beyond Korean-speaking users |
| Desktop share | 100% desktop | This is desktop-app telemetry, not a web funnel |

## What Worked

This project was less about adding one more feature to Figma and more about creating an installable desktop path into the Figma MCP workflow.

The data supports that. There were 31,360 active users and 570,373 MCP tool-call events. Among MCP calls with explicit success/failure values, 536,267 were successful and 33,777 failed, for an event-level success rate of about 94.1%.

The top MCP calls also look like real design-editing work, not just passive inspection.

| MCP tool | Successful events | Active users |
|---|---:|---:|
| create_text | 105,643 | 613 |
| set_fill_color | 92,561 | 604 |
| create_frame | 52,509 | 613 |
| set_corner_radius | 38,053 | 504 |
| set_text_content | 37,845 | 455 |
| create_rectangle | 34,779 | 473 |
| get_node_info | 32,736 | 842 |
| export_node_as_image | 13,536 | 455 |

For the retrospective, this is the strongest claim: users did not merely launch the app. They created text, changed colors, created frames, inspected nodes, and exported images through MCP.

## Global Reach

The country data is useful for presentation. GA4 recorded 165 country values. Since that includes `(not set)`, the safer wording is “165 country values” or “users across many regions,” not “exactly 165 countries.”

| Country | Active users | Events |
|---|---:|---:|
| South Korea | 4,263 | 1,143,307 |
| Russia | 3,133 | 132,773 |
| India | 2,774 | 25,859 |
| United States | 2,047 | 132,057 |
| Nigeria | 1,824 | 9,811 |
| Japan | 801 | 6,823 |
| Indonesia | 591 | 3,734 |
| Brazil | 565 | 12,673 |
| Singapore | 564 | 7,779 |
| United Kingdom | 533 | 8,599 |

Language data tells the same story. English was the top language with 18,875 active users, followed by Russian 4,094, Korean 2,766, French 1,209, and Chinese 990. This was made in Korea, but usage did not stay inside a Korean-speaking audience.

## Platform And Depth

By active users, Windows was larger: 21,090 Windows users versus 10,444 MacOS users.

By MCP call depth, MacOS was stronger. Among MCP calls with explicit success/failure values, MacOS had 366,518 calls and Windows had 203,526. A cautious interpretation is: Windows gave the project breadth, while MacOS generated deeper MCP activity.

However, MacOS also contains a lot of exception volume, so this should not be overstated as “Mac users were more engaged.”

## First Launch And First Connection

This should be the center of the retrospective.

The app's core value was not owning the MCP feature forever. It was helping users get from first launch to a working Figma/MCP connection with less uncertainty.

Supporting events:

| Event/action | Active users | Events |
|---|---:|---:|
| app_start | 30,912 | 40,514 |
| start_websocket_server | 21,115 | 23,898 |
| tutorial_shown | 6,875 | 8,863 |
| tutorial_completed | 4,126 | 4,316 |
| direct_oauth_start | 3,016 | 4,382 |
| Direct OAuth completed | 1,620 | 2,124 |
| copy_mcp_config | 1,495 | 2,448 |
| kill_all_servers | 540 | 1,017 |
| report_issue | 99 | 133 |

Among users who triggered `tutorial_shown`, 4,126 out of 6,875 also triggered `tutorial_completed`, a simple active-user completion ratio of about 60.0%. The `start_websocket_server` event reached 21,115 active users. This suggests the real product surface was not only “let AI control Figma,” but also “make the connection server feel visible, recoverable, and understandable.”

Page title and path data support the same claim more directly.

| Screen/path | Active users | Views/events |
|---|---:|---:|
| Step 1: Open MCP Configuration (windows) | 6,772 | 7,775 |
| Step 2: Run Figma Plugin (windows) | 3,545 | 4,261 |
| Step 3: Do MCP Magic (windows) | 3,042 | 3,439 |
| Step 4: Figma OAuth (Optional) (windows) | 2,866 | 3,016 |
| Step 1: Open MCP Configuration (mac) | 2,474 | 3,232 |
| MCP Configuration Dialog | 2,174 | 3,675 |
| Server Error Dialog | 1,033 | 1,925 |
| View Logs | 860 | 964 |

In other words, the product contained an explicit first-connection journey: open the MCP configuration, run the Figma plugin, do MCP work, and optionally connect OAuth. `Server Error Dialog` and `View Logs` also appeared often enough to show that diagnosis and recovery were real product surfaces, not side details.

## Growth Over Time

Monthly active users grew quickly after launch.

| Month | Active users | Sessions | Events |
|---|---:|---:|---:|
| 2025-08 | 243 | 185 | 1,502 |
| 2025-11 | 1,150 | 660 | 8,351 |
| 2025-12 | 3,323 | 1,981 | 14,398 |
| 2026-01 | 7,890 | 4,697 | 44,976 |
| 2026-02 | 5,410 | 3,429 | 107,221 |
| 2026-03 | 6,084 | 4,738 | 826,851 |
| 2026-06 | 2,505 | 2,576 | 294,587 |

The active-user peak was January 2026 with 7,890 active users. The event-count peak was March 2026 with 826,851 events, but that spike includes heavy exception volume and should not be treated as pure healthy usage.

## Operational Burden

The project worked, but the data also shows the operational cost clearly.

`app_exception` recorded 1,081,199 events across 3,684 active users. That number should not be framed as simply “over a million errors.” Some errors were repeated many times by a very small number of users: `write EPIPE` had 897,378 events from 12 active users, and `net::ERR_TUNNEL_CONNECTION_FAILED` had 99,996 events from 1 active user.

Other issues were more meaningful by affected user count.

| Error message | Events | Active users |
|---|---:|---:|
| Attempted to register second handler for server:start | 2,605 | 1,231 |
| Address already in use: bind | 1,539 | 1,539 |
| Address already in use | 756 | 552 |
| Request timed out | 18,105 | 1,056 |
| Failed to make WebSocket port 3055 available | 1,610 | 246 |
| Must join a channel before sending commands | 269 | 148 |

This belongs in Problem or Learning. Users feel anxiety around connection state, port conflicts, server restarts, OAuth, timeout, logs, and issue reporting before they ever judge the feature itself.

## Why Major Updates Became Lower Priority

Based on the data alone, the project worked. 31,360 active users, 570,373 MCP tool calls, 165 country values, and 37 language values make it more than a tiny experiment.

But the reason to keep pushing major updates became weaker. The core experience this project helped prove, connecting Figma to an AI/MCP workflow, has moved into official or platform-level surfaces such as Figma's official MCP and Canvas-style agents.

So the retrospective should not say “the project is being shut down because it failed.” A more accurate frame is: the project proved a need, and then that need moved into larger platform surfaces. Emotionally, that is also difficult, which is enough to say plainly without overexplaining it.

## KPT Candidates

Keep:

- Focused on reducing anxiety from first launch to first connection.
- Turned the Figma MCP workflow into an installable, usable desktop experience.
- Instrumented enough analytics to verify usage scale, geography, OS distribution, MCP success, and onboarding behavior.
- Built a product, not a test environment.

Problem:

- Once the core capability is absorbed by official platform features, maintaining the same update intensity becomes hard to justify.
- Exception events accumulated heavily, and repeated errors from a few users made some event-count metrics hard to interpret.
- Connection, port, server state, OAuth, and logs became a larger product surface than expected.
- Too many analytics dimensions were `(not set)`, limiting deeper segmentation.

Try/Learning:

- Next time, define the user context that platforms are less likely to absorb, not only the feature.
- Separate success, failure, first successful connection, reconnection, config copy, and diagnostic actions more rigorously in analytics.
- Track affected active users alongside raw error-event counts.
- Decide future major updates by combining usage, platform absorption risk, operational burden, and personal sustainability.

## Retrospective Sentence Candidates

- In the end, the core value was not adding more features. It was reducing the anxiety between first launch and first connection.
- Over one year, the app reached 31,360 active users and recorded 570,373 MCP tool calls.
- Users did not merely open the app. They created text, changed colors, created frames, inspected nodes, and exported images through MCP.
- It was a small desktop app built in Korea, but GA4 recorded 165 country values and 37 language values.
- The project worked, which is why it feels bittersweet. As the core experience moved into official platform features, the reason to keep shipping major updates as an individual project became weaker.
- This is not about putting down a failed project. It is closer to accepting the emptiness that remains after a need you helped prove moves into a bigger platform.

## Data To Use Carefully

- Total `eventCount` of 1,826,813 includes 1,081,199 `app_exception` events, so it is not a pure usage metric.
- The 165 country values include `(not set)`, so avoid claiming exactly 165 countries.
- Region and city data are dominated by `(not set)` and should not be used for fine-grained geography.
- Browser, `customEvent:platform`, and `customEvent:os_info` are mostly `(not set)` and should not support strong claims.
- GA4 funnel numbers are ordered funnel results and should not be directly compared with broad event totals.
- `averageSessionDuration` looks unusually high in this desktop telemetry context and should not be used as a primary bragging metric.

## Questions To Defer

- The relationship between GitHub stars, releases, downloads, page visits, and GA4 app execution.
- The exact correlation between official Figma MCP/platform announcements and the decline in usage.
- Code-level causes for high exception volume in specific app versions.
- MCP depth after separating heavy users from typical users.

## Iteration Log

1. Checked overall scale, events, countries, languages, OS, app versions, MCP calls, success/failure, onboarding, exceptions, monthly trends, and weekly trends.
2. Added action/category/label analysis to support the first-connection product-surface interpretation.
3. Checked acquisition dimensions and decided not to use them because they collapse into `direct / none` or `not set`.
4. Checked page titles and paths, confirming the first-connection tutorial sequence and error/log surfaces.
5. Audited browser, screen resolution, new/returning, referrer, channel group, stream, `customEvent:value`, and `customEvent:duration_ms`. No new presentation-worthy insight emerged; most were classified as axes not to use.
6. Rechecked auxiliary acquisition/stream dimensions and found no new insight. This satisfies the termination condition of two consecutive iterations without new presentation-worthy findings.

## Coverage Checklist

| Category | Status |
|---|---|
| Overall scale | Done |
| Geographic spread | Done |
| Platform/environment | Done |
| MCP usage depth | Done |
| Representative MCP actions | Done |
| Onboarding/first success | Done |
| Operational burden | Done |
| Time trend | Done |
| Segment comparison | Done |
| Counterargument/caveat check | Done |
