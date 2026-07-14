# TalkToFigma Desktop MCP Tool Detail Analysis

Created: 2026-07-01
Source: GA4 `Figma MCP Agent` / `properties/499789310`
Analysis period: 2025-07-01 to 2026-06-30
Filter: `eventName = mcp_tool_call`

Raw data:

- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.md`
- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.csv`
- `data/ga4/talk-to-figma-desktop-ga4-mcp-tools-raw.json`

## One-Line Takeaway

The most repeatedly used MCP tools were not just tools for reading Figma. They were tools for creating and refining things inside Figma: creating text, applying fill colors, creating frames, editing text, rounding corners, and creating rectangles.

## The Interesting Split

By active users, broad tools like `get_document_info`, `get_selection`, `get_node_info`, and `get_active_channels` spread widely. But by event count, the dominant tools were creation and editing tools such as `create_text`, `set_fill_color`, `create_frame`, and `set_text_content`.

That split is the story. Users first read the document, selection, connection, and node context. Then they repeatedly used MCP to create and edit design output.

## Most Repeated Tools

| tool | successful events | active users | events / active user | interpretation |
|---|---:|---:|---:|---|
| create_text | 105,643 | 613 | 172.34 | The most repeated text-layer creation action |
| set_fill_color | 92,561 | 604 | 153.25 | Applying visual color/style |
| create_frame | 52,509 | 613 | 85.66 | Creating layout containers |
| set_text_content | 37,845 | 455 | 83.18 | Filling or replacing generated copy |
| set_corner_radius | 38,053 | 504 | 75.50 | Polishing cards, buttons, and boxes |
| create_rectangle | 34,779 | 473 | 73.53 | Creating blocks, backgrounds, cards, or button material |
| set_layout_sizing | 9,018 | 167 | 54.00 | Tuning Auto Layout sizing |
| move_node | 13,859 | 324 | 42.77 | Positioning nodes |

The important part is that these tools combine high event count with hundreds of active users. This is not merely a tiny-user outlier. It points to repeated real workflow usage.

## Purpose Groups

GA4 does not store these purpose groups directly. They are analyst-defined groups based on tool names.

| Purpose | Successful events | Share of successful MCP calls | Meaning |
|---|---:|---:|---|
| Create and duplicate nodes | 204,042 | 38.05% | Text, frames, rectangles, component instances, node cloning |
| Style and content editing | 186,600 | 34.80% | Fill colors, corner radius, text content, stroke color, batch text editing |
| Inspect and read design context | 60,467 | 11.28% | Node, document, selection, text-node, and style reads |
| Layout and positioning | 53,044 | 9.89% | Moving, resizing, layout sizing, spacing, alignment |
| Export and review | 13,536 | 2.52% | Exporting nodes as images |
| Delete and selection management | 7,766 | 1.45% | Delete, multi-delete, focus, selection |
| Connection and diagnostics | 3,817 | 0.71% | Connection diagnostics, channel join, config |

This is strong retrospective evidence. About 72.8% of successful MCP calls fall into creation/duplication plus style/content editing. The core demand was closer to “make things in Figma” than “inspect Figma.”

## Broad Foundation Tools

The active-user ranking tells a complementary story.

| tool | total events | active users | interpretation |
|---|---:|---:|---|
| get_document_info | 7,825 | 1,177 | The broadest document-state check |
| get_selection | 6,541 | 930 | Reading selected nodes as a baseline behavior |
| get_node_info | 35,808 | 905 | Inspecting nodes before or after edits |
| get_active_channels | 5,653 | 865 | Checking channel/connection state |
| connection_diagnostics | 4,438 | 670 | Connection trouble was part of the product experience |
| read_my_design | 2,590 | 648 | Higher-level design-reading action |

These tools were not always the most repeated, but they reached many users. They are foundation behaviors. The MCP workflow did not jump directly into creation; it first had to understand the document, selection, connection, and node state.

## What Failures Tell Us

Failures by active users also cluster around context and connection.

| tool | failed events | active users | interpretation |
|---|---:|---:|---|
| get_document_info | 2,241 | 683 | Document access/state checks often failed |
| get_active_channels | 2,403 | 626 | Channel or connection-state checks failed |
| get_selection | 1,946 | 574 | No selection or selection read failure |
| connection_diagnostics | 1,905 | 515 | Diagnosis was frequently needed |
| get_node_info | 3,072 | 463 | Node access or identification failed |
| create_frame | 2,207 | 312 | Creation also had some friction |
| read_my_design | 611 | 306 | Design-reading step had friction |

This is an important learning. User anxiety appeared before the question “Can AI design well?” It appeared around “Is Figma connected?”, “Can it read my selection?”, and “Does it understand the current document state?”

## OS And Country Hints

MacOS produced more top MCP event volume for most high-volume tools. For example, `set_fill_color` had 68,248 MacOS events versus 27,877 Windows events, and `create_text` had 61,420 MacOS events versus 46,687 Windows events. But Windows also produced substantial usage for `create_text`, `create_frame`, and `create_rectangle`, so this was not a Mac-only behavior.

South Korea strongly led MCP tool event volume. South Korea alone produced 78,677 `create_text`, 62,890 `set_fill_color`, and 41,017 `create_frame` events. But the same create/style/layout pattern also appeared in Russia, the United States, India, Brazil, Vietnam, and other countries at smaller scale.

## Time Pattern

Early months were dominated by connection and context tools such as `get_selection`, `join_channel`, `read_my_design`, `get_active_channels`, and `connection_diagnostics`. From 2026-02, creation and editing tools such as `set_fill_color`, `create_text`, `set_text_content`, and `create_rectangle` became much more visible. By 2026-04, `create_text` reached 35,140 events, `set_fill_color` 27,972, and `create_frame` 18,889.

That makes a strong narrative: first, users needed connection and context. As usage deepened, the workflow shifted toward actual screen creation and styling.

## Retrospective Sentence Candidates

- The most repeatedly used MCP tools were not read-only tools. They were production tools.
- `create_text` and `set_fill_color` alone accounted for 198,204 successful calls. Users were not only reading Figma; they were making and styling design objects.
- About 72.8% of successful MCP calls were concentrated in creation/duplication and style/content editing.
- By active users, the broadest tools were `get_document_info`, `get_selection`, and `get_node_info`, because the AI needed to understand the current Figma state before making changes.
- The failure-heavy tools were also concentrated around document, selection, and connection checks. The real product challenge was not the number of features; it was reducing uncertainty around first connection and current state.

## Caveats

- Purpose groups are analyst-defined from tool names, not native GA4 dimensions.
- Tools with very high events per active user but only 1 to 5 users should be treated as outliers, not headline metrics.
- `eventCount` is a repeated call count, not a count of unique completed design tasks.
- MCP tool usage is heavily led by South Korea, so global claims should be phrased carefully: the same pattern appears in other countries, but at smaller scale.
