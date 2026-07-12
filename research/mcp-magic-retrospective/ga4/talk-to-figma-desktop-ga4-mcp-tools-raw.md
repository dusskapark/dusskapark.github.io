# TalkToFigma Desktop GA4 MCP Tool Raw Detail

Source: GA4 Analytics MCP
Property: `properties/499789310`
Date range: 2025-07-01 to 2026-06-30
Filter: `eventName = mcp_tool_call`

## Successful Tools By Event Count

| tool | successful events | active users | events / active user | inferred purpose |
|---|---:|---:|---:|---|
| create_text | 105,643 | 613 | 172.34 | Create text layers |
| set_fill_color | 92,561 | 604 | 153.25 | Apply visual styling |
| create_frame | 52,509 | 613 | 85.66 | Create layout containers |
| set_corner_radius | 38,053 | 504 | 75.50 | Polish UI shapes |
| set_text_content | 37,845 | 455 | 83.18 | Edit generated copy |
| create_rectangle | 34,779 | 473 | 73.53 | Create basic visual blocks |
| get_node_info | 32,736 | 842 | 38.88 | Inspect selected/design nodes |
| move_node | 13,859 | 324 | 42.77 | Position nodes |
| export_node_as_image | 13,536 | 455 | 29.75 | Preview or externalize design result |
| set_stroke_color | 10,910 | 361 | 30.22 | Apply border styling |
| resize_node | 10,133 | 304 | 33.33 | Resize objects |
| set_layout_sizing | 9,018 | 167 | 54.00 | Tune auto-layout sizing |
| clone_node | 8,816 | 293 | 30.09 | Duplicate existing nodes |
| set_multiple_text_contents | 6,490 | 318 | 20.41 | Batch-edit text |
| set_item_spacing | 6,279 | 225 | 27.91 | Tune spacing |

## Successful Tools By Active Users

| tool | successful events | active users | events / active user |
|---|---:|---:|---:|
| get_document_info | 5,584 | 1,018 | 5.49 |
| get_active_channels | 3,250 | 864 | 3.76 |
| get_node_info | 32,736 | 842 | 38.88 |
| get_selection | 4,595 | 749 | 6.13 |
| connection_diagnostics | 2,533 | 665 | 3.81 |
| create_text | 105,643 | 613 | 172.34 |
| create_frame | 52,509 | 613 | 85.66 |
| set_fill_color | 92,561 | 604 | 153.25 |

## Failure Tools By Active Users

| tool | failed events | active users |
|---|---:|---:|
| get_document_info | 2,241 | 683 |
| get_active_channels | 2,403 | 626 |
| get_selection | 1,946 | 574 |
| connection_diagnostics | 1,905 | 515 |
| get_node_info | 3,072 | 463 |
| create_frame | 2,207 | 312 |
| read_my_design | 611 | 306 |

## Purpose Groups

Purpose groups are heuristic analysis groups, not GA4-native dimensions.

| purpose | successful events | share of successful MCP calls | included examples |
|---|---:|---:|---|
| Create and duplicate nodes | 204,042 | 38.05% | create_text, create_frame, create_rectangle, clone_node, create_component_instance |
| Style and content editing | 186,600 | 34.80% | set_fill_color, set_corner_radius, set_text_content, set_stroke_color, set_multiple_text_contents |
| Inspect and read design context | 60,467 | 11.28% | get_node_info, get_document_info, get_selection, scan_text_nodes, read_my_design |
| Layout and positioning | 53,044 | 9.89% | move_node, resize_node, set_layout_sizing, set_item_spacing, set_axis_align |
| Export and review | 13,536 | 2.52% | export_node_as_image |
| Delete and selection management | 7,766 | 1.45% | delete_node, delete_multiple_nodes, set_focus, set_selections |
| Connection and diagnostics | 3,817 | 0.71% | connection_diagnostics, join_channel, figma_get_config |

## Segment Notes

- MacOS dominated top MCP event volume for most high-volume tools, but Windows also produced substantial `create_text` and `create_frame` usage.
- South Korea dominated MCP tool event volume; non-Korean countries still showed the same create/style/layout pattern at smaller scale.
- Early months were mostly context/connection tools. Heavier create/style/edit usage became visible from 2026-02 and especially 2026-04.
