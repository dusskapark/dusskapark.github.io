# TalkToFigma Desktop GA4 Raw Data

Status: raw data snapshot
Property: Figma MCP Agent / `properties/499789310`
Requested range: 2025-07-01 to 2026-06-30
Observed effective range: 2025-08 to 2026-06
Generated from: GA4 Analytics MCP
Timezone: Asia/Seoul

## Notes

- This file preserves raw-ish GA4 report tables gathered during the iterative analysis.
- It is intentionally separate from the retrospective outline.
- Some dimensions such as `region`, `city`, `browser`, `customEvent:platform`, and `customEvent:os_info` contain many `(not set)` values and should be treated carefully.
- `eventCount` should not be used as a pure success metric because `app_exception` and repeated exception messages inflate the total.

## Report: Overall Totals

Dimensions: none
Metrics: `activeUsers`, `totalUsers`, `sessions`, `eventCount`, `screenPageViews`, `averageSessionDuration`, `keyEvents`

| activeUsers | totalUsers | sessions | eventCount | screenPageViews | averageSessionDuration | keyEvents |
|---:|---:|---:|---:|---:|---:|---:|
| 31,360 | 31,560 | 24,429 | 1,826,813 | 52,463 | 9,531.267138194606 | 0 |

## Report: Top Events

Dimensions: `eventName`
Metrics: `eventCount`, `activeUsers`, `totalUsers`

| eventName | eventCount | activeUsers | totalUsers |
|---|---:|---:|---:|
| app_exception | 1,081,199 | 3,684 | 3,684 |
| mcp_tool_call | 570,373 | 1,633 | 1,633 |
| page_view | 52,463 | 15,616 | 15,616 |
| app_start | 40,514 | 30,912 | 31,001 |
| user_action | 37,558 | 21,621 | 21,713 |
| server_action | 21,247 | 4,500 | 4,500 |
| tutorial_shown | 8,863 | 6,875 | 6,875 |
| oauth_action | 6,860 | 2,372 | 2,372 |
| tutorial_completed | 4,316 | 4,126 | 4,126 |
| app_quit | 1,945 | 1,234 | 1,234 |
| tutorial_skipped | 1,419 | 1,392 | 1,392 |
| app_crash | 14 | 0 | 14 |
| figma_plugin_connected | 13 | 2 | 2 |
| figma_plugin_disconnected | 12 | 2 | 2 |
| test_event | 4 | 0 | 1 |
| mcp_tool_success | 2 | 1 | 1 |
| oauth_logout | 2 | 1 | 1 |
| oauth_start | 2 | 1 | 1 |
| oauth_success | 2 | 1 | 1 |
| curl_device_test_static | 1 | 0 | 1 |
| hello_world | 1 | 1 | 1 |
| manual_location_debug | 1 | 1 | 1 |
| server_stop | 1 | 1 | 1 |
| us_location_test | 1 | 1 | 1 |

## Report: Country, Top Rows By Active Users

Dimensions: `country`
Metrics: `activeUsers`, `totalUsers`, `sessions`, `eventCount`
Row count reported by GA4: 165

| country | activeUsers | totalUsers | sessions | eventCount |
|---|---:|---:|---:|---:|
| South Korea | 4,263 | 4,263 | 5,599 | 1,143,307 |
| (not set) | 4,064 | 4,278 | 2,786 | 153,177 |
| Russia | 3,133 | 3,133 | 1,969 | 132,773 |
| India | 2,774 | 2,774 | 1,839 | 25,859 |
| United States | 2,047 | 2,047 | 1,580 | 132,057 |
| Nigeria | 1,824 | 1,824 | 1,095 | 9,811 |
| Japan | 801 | 801 | 565 | 5,070 |
| Indonesia | 591 | 591 | 369 | 3,678 |
| Brazil | 565 | 565 | 405 | 12,648 |
| Singapore | 564 | 564 | 461 | 77,761 |
| United Kingdom | 533 | 533 | 392 | 4,102 |
| Ukraine | 510 | 510 | 351 | 4,565 |
| Kazakhstan | 472 | 472 | 333 | 7,609 |
| Pakistan | 449 | 449 | 307 | 3,048 |
| Germany | 443 | 443 | 355 | 9,097 |
| South Africa | 397 | 397 | 250 | 2,186 |
| Kenya | 366 | 366 | 214 | 1,465 |
| Canada | 345 | 345 | 251 | 4,818 |
| Philippines | 318 | 318 | 196 | 5,840 |
| Egypt | 281 | 281 | 223 | 1,952 |
| Saudi Arabia | 267 | 267 | 177 | 1,024 |
| Ghana | 254 | 254 | 145 | 968 |
| Poland | 250 | 250 | 185 | 2,357 |
| France | 248 | 248 | 153 | 4,018 |
| Australia | 243 | 243 | 178 | 2,330 |
| Romania | 239 | 239 | 165 | 1,018 |
| Vietnam | 216 | 216 | 239 | 11,836 |
| Cameroon | 207 | 207 | 125 | 850 |
| Turkiye | 198 | 198 | 147 | 1,754 |
| United Arab Emirates | 171 | 171 | 113 | 3,300 |
| Netherlands | 164 | 164 | 114 | 3,907 |
| Italy | 151 | 151 | 100 | 4,319 |
| Morocco | 150 | 150 | 98 | 574 |
| Bangladesh | 144 | 144 | 103 | 940 |
| Spain | 143 | 143 | 126 | 2,162 |
| China | 140 | 140 | 90 | 6,171 |
| Belarus | 139 | 139 | 87 | 727 |
| Senegal | 138 | 138 | 92 | 581 |
| Uzbekistan | 130 | 130 | 74 | 563 |
| Hong Kong | 128 | 128 | 89 | 1,717 |
| Kyrgyzstan | 128 | 128 | 83 | 497 |
| Mexico | 112 | 112 | 79 | 987 |
| Thailand | 100 | 100 | 100 | 2,841 |
| Argentina | 94 | 94 | 66 | 709 |
| Zimbabwe | 92 | 92 | 63 | 248 |
| Algeria | 91 | 91 | 61 | 356 |
| Armenia | 90 | 90 | 61 | 563 |
| Portugal | 81 | 81 | 53 | 1,826 |
| Israel | 78 | 78 | 44 | 2,510 |
| Sweden | 72 | 72 | 58 | 623 |

## Report: Operating System

Dimensions: `operatingSystem`
Metrics: `activeUsers`, `totalUsers`, `sessions`, `eventCount`

| operatingSystem | activeUsers | totalUsers | sessions | eventCount |
|---|---:|---:|---:|---:|
| Windows | 21,090 | 21,090 | 14,337 | 312,554 |
| MacOS | 10,444 | 10,444 | 10,049 | 1,513,895 |
| (not set) | 36 | 249 | 62 | 358 |
| Mac OS X | 2 | 2 | 2 | 5 |
| macOS | 0 | 1 | 0 | 1 |

## Report: Device Category

Dimensions: `deviceCategory`
Metrics: `activeUsers`, `sessions`, `eventCount`

| deviceCategory | activeUsers | sessions | eventCount |
|---|---:|---:|---:|
| desktop | 31,360 | 24,429 | 1,826,813 |

## Report: Monthly Trend

Dimensions: `yearMonth`
Metrics: `activeUsers`, `totalUsers`, `sessions`, `eventCount`

| yearMonth | activeUsers | totalUsers | sessions | eventCount |
|---|---:|---:|---:|---:|
| 202508 | 243 | 445 | 185 | 1,502 |
| 202509 | 311 | 318 | 195 | 2,037 |
| 202510 | 474 | 474 | 292 | 4,366 |
| 202511 | 1,150 | 1,150 | 660 | 8,351 |
| 202512 | 3,323 | 3,324 | 1,981 | 14,398 |
| 202601 | 7,890 | 7,894 | 4,697 | 44,976 |
| 202602 | 5,410 | 5,410 | 3,429 | 107,221 |
| 202603 | 6,084 | 6,084 | 4,738 | 826,851 |
| 202604 | 3,153 | 3,153 | 3,261 | 311,206 |
| 202605 | 2,602 | 2,602 | 2,636 | 211,318 |
| 202606 | 2,505 | 2,505 | 2,576 | 294,587 |

## Report: MCP Success

Filter: `eventName = mcp_tool_call`
Dimensions: `customEvent:success`
Metrics: `eventCount`, `activeUsers`

| success | eventCount | activeUsers |
|---|---:|---:|
| 1 | 536,267 | 1,513 |
| 0 | 33,777 | 1,357 |
| (not set) | 4 | 1 |

Derived calculation:

- Success rate by event count: `536,267 / (536,267 + 33,777) = 94.07%`

## Report: Top MCP Tool Calls By Event Count

Filter: `eventName = mcp_tool_call`
Dimensions: `customEvent:tool_name`, `customEvent:success`
Metrics: `eventCount`, `activeUsers`

| tool_name | success | eventCount | activeUsers |
|---|---|---:|---:|
| create_text | 1 | 105,643 | 613 |
| set_fill_color | 1 | 92,561 | 604 |
| create_frame | 1 | 52,509 | 613 |
| set_corner_radius | 1 | 38,053 | 504 |
| set_text_content | 1 | 37,845 | 455 |
| create_rectangle | 1 | 34,779 | 473 |
| get_node_info | 1 | 32,736 | 842 |
| move_node | 1 | 13,859 | 324 |
| export_node_as_image | 1 | 13,536 | 455 |
| set_stroke_color | 1 | 10,910 | 361 |
| resize_node | 1 | 10,133 | 304 |
| set_layout_sizing | 1 | 9,018 | 167 |
| clone_node | 1 | 8,816 | 293 |
| set_multiple_text_contents | 1 | 6,490 | 318 |
| set_item_spacing | 1 | 6,279 | 225 |
| scan_text_nodes | 1 | 5,645 | 396 |
| get_document_info | 1 | 5,584 | 1,018 |
| set_axis_align | 1 | 4,603 | 177 |
| get_selection | 1 | 4,595 | 749 |
| delete_node | 1 | 4,048 | 326 |
| scan_nodes_by_types | 1 | 3,848 | 373 |
| set_fill_color | 0 | 3,564 | 136 |
| get_active_channels | 1 | 3,250 | 864 |
| set_auto_layout | 1 | 3,208 | 5 |
| get_node_info | 0 | 3,072 | 463 |
| set_layout_mode | 1 | 3,014 | 134 |
| set_padding | 1 | 2,930 | 141 |
| connection_diagnostics | 1 | 2,533 | 665 |
| create_text | 0 | 2,464 | 163 |
| get_active_channels | 0 | 2,403 | 626 |
| create_component_instance | 1 | 2,295 | 74 |
| get_document_info | 0 | 2,241 | 683 |
| create_frame | 0 | 2,207 | 312 |
| read_my_design | 1 | 1,979 | 513 |
| get_selection | 0 | 1,946 | 574 |
| connection_diagnostics | 0 | 1,905 | 515 |
| get_nodes_info | 1 | 1,707 | 269 |
| set_focus | 1 | 1,698 | 360 |
| delete_multiple_nodes | 1 | 1,380 | 260 |
| rename_node | 1 | 1,329 | 5 |

## Report: App Version

Dimensions: `customEvent:app_version`
Metrics: `activeUsers`, `eventCount`

| app_version | activeUsers | eventCount |
|---|---:|---:|
| 1.0.9 | 14,384 | 51,954 |
| 1.1.0 | 4,176 | 14,523 |
| 1.0.8 | 3,986 | 28,634 |
| 2.0.16 | 3,281 | 753,616 |
| 3.0.5 | 3,185 | 464,772 |
| 1.99.0 | 1,240 | 4,855 |
| 2.0.14 | 696 | 259,155 |
| 2.0.15 | 226 | 119,088 |
| 1.0.7 | 219 | 2,318 |
| 1.0.6 | 138 | 802 |
| 1.0.5 | 56 | 388 |
| 3.0.3 | 44 | 2,812 |
| 3.0.4 | 37 | 798 |
| 2.0.12 | 32 | 25,337 |
| 2.0.4 | 26 | 10,681 |
| 3.0.1 | 26 | 2,809 |
| 2.0.10 | 19 | 1,990 |
| 3.0.0 | 12 | 1,401 |
| 3.0.2 | 12 | 1,762 |
| 2.0.9 | 11 | 621 |
| 2.0.13 | 10 | 183 |
| 2.0.7 | 10 | 3,490 |
| 2.0.11 | 4 | 1,248 |
| 2.0.8 | 4 | 138 |
| 2.0.6 | 3 | 57,383 |
| 2.0.0 | 2 | 13,084 |
| 2.0.1 | 2 | 9 |
| (not set) | 1 | 12 |
| 1.0.0 | 1 | 35 |
| 2.0.2 | 1 | 1 |
| 2.0.3 | 1 | 112 |

## Report: Language

Dimensions: `language`
Metrics: `activeUsers`, `sessions`, `eventCount`
Row count reported by GA4: 37

| language | activeUsers | sessions | eventCount |
|---|---:|---:|---:|
| English | 18,875 | 15,497 | 1,485,167 |
| Russian | 4,094 | 2,489 | 21,686 |
| Korean | 2,766 | 2,759 | 264,062 |
| French | 1,209 | 744 | 5,224 |
| Chinese | 990 | 620 | 31,502 |
| Portuguese | 629 | 372 | 3,284 |
| Spanish | 490 | 310 | 3,494 |
| Japanese | 389 | 221 | 1,803 |
| Ukrainian | 372 | 217 | 1,694 |
| Arabic | 294 | 186 | 979 |
| German | 212 | 131 | 1,315 |
| Indonesian | 157 | 93 | 437 |
| Turkish | 130 | 81 | 548 |
| Polish | 115 | 68 | 471 |
| Romanian | 88 | 55 | 331 |
| Dutch | 74 | 52 | 321 |
| Italian | 72 | 43 | 645 |
| Hebrew | 51 | 29 | 1,737 |
| Swedish | 42 | 27 | 169 |
| Czech | 39 | 26 | 155 |

## Report: Tutorial Events

Dimensions: `eventName`
Metrics: `activeUsers`, `eventCount`

| eventName | activeUsers | eventCount |
|---|---:|---:|
| tutorial_shown | 6,875 | 8,863 |
| tutorial_completed | 4,126 | 4,316 |
| tutorial_skipped | 1,392 | 1,419 |

Derived calculation:

- Tutorial completion by active users: `4,126 / 6,875 = 60.01%`
- Tutorial skip by active users: `1,392 / 6,875 = 20.25%`

## Report: Key Events By Operating System

Dimensions: `eventName`, `operatingSystem`
Metrics: `eventCount`, `activeUsers`

| eventName | operatingSystem | eventCount | activeUsers |
|---|---|---:|---:|
| app_start | Windows | 23,290 | 20,757 |
| app_start | MacOS | 17,109 | 10,311 |
| app_start | (not set) | 113 | 36 |
| app_start | Mac OS X | 2 | 2 |
| mcp_tool_call | MacOS | 366,847 | 1,266 |
| mcp_tool_call | Windows | 203,526 | 367 |
| tutorial_completed | MacOS | 3,503 | 3,345 |
| tutorial_completed | Windows | 813 | 781 |
| tutorial_shown | MacOS | 7,190 | 5,599 |
| tutorial_shown | Windows | 1,673 | 1,253 |
| tutorial_skipped | MacOS | 1,185 | 1,166 |
| tutorial_skipped | Windows | 234 | 226 |

## Report: App Exceptions By Type

Filter: `eventName = app_exception`
Dimensions: `customEvent:exception_type`
Metrics: `eventCount`, `activeUsers`

| exception_type | eventCount | activeUsers |
|---|---:|---:|
| Error | 1,076,870 | 1,319 |
| BindException | 2,296 | 2,092 |
| Exception | 1,205 | 192 |
| TimeoutCancellationException | 650 | 102 |
| UncheckedIOException | 43 | 43 |
| IllegalArgumentException | 30 | 14 |
| RuntimeException | 20 | 7 |
| UnhandledRejection | 16 | 2 |
| NoClassDefFoundError | 15 | 6 |
| RangeError | 11 | 10 |
| OutOfMemoryError | 8 | 8 |
| DuplicatePluginException | 6 | 6 |
| IllegalStateException | 3 | 3 |
| JobCancellationException | 3 | 3 |
| IOException | 2 | 2 |
| NotImplementedError | 2 | 2 |
| SocketException | 2 | 2 |
| IIOException | 1 | 1 |
| MissingApplicationPluginException | 1 | 1 |

## Report: App Exceptions By Message

Filter: `eventName = app_exception`
Dimensions: `customEvent:exception_message`
Metrics: `eventCount`, `activeUsers`

| exception_message | eventCount | activeUsers |
|---|---:|---:|
| write EPIPE | 897,378 | 12 |
| net::ERR_TUNNEL_CONNECTION_FAILED | 99,996 | 1 |
| write EIO | 56,708 | 1 |
| EPIPE: broken pipe, write | 20,036 | 1 |
| Attempted to register a second handler for 'server:start' | 2,605 | 1,231 |
| Address already in use: bind | 1,539 | 1,539 |
| Address already in use | 756 | 552 |
| Timed out waiting for 30000 ms | 650 | 102 |
| Not connected to Figma | 334 | 32 |
| Must join a channel before sending commands | 268 | 148 |
| Cannot create BrowserWindow before app is ready | 72 | 66 |
| net::ERR_HTTP2_PING_FAILED | 45 | 36 |
| java.io.IOException: Unable to establish loopback connection | 43 | 43 |
| Error setting text content: in loadFontAsync: Cannot unwrap symbol | 24 | 4 |
| net::ERR_TIMED_OUT | 18 | 15 |
| Node type TEXT does not support item spacing | 17 | 1 |
| Node type TEXT does not support padding | 17 | 1 |
| ks is not a function | 12 | 1 |
| Array buffer allocation failed | 11 | 10 |
| Error setting text content: undefined | 11 | 2 |

## Report: App Exceptions By Fatal Flag

Filter: `eventName = app_exception`
Dimensions: `customEvent:fatal`
Metrics: `eventCount`, `activeUsers`

| fatal | eventCount | activeUsers |
|---|---:|---:|
| 1 | 1,079,288 | 3,505 |
| 0 | 1,896 | 221 |

## Report: App Exceptions By App Version

Filter: `eventName = app_exception`
Dimensions: `customEvent:app_version`
Metrics: `eventCount`, `activeUsers`

| app_version | eventCount | activeUsers |
|---|---:|---:|
| 2.0.16 | 434,566 | 926 |
| 3.0.5 | 299,974 | 129 |
| 2.0.14 | 172,509 | 233 |
| 2.0.15 | 100,039 | 41 |
| 2.0.6 | 56,712 | 1 |
| 2.0.0 | 13,017 | 1 |
| 1.0.8 | 2,104 | 624 |
| 1.0.9 | 1,412 | 1,203 |
| 1.1.0 | 401 | 351 |
| 1.0.7 | 235 | 60 |
| 1.99.0 | 93 | 80 |
| 1.0.6 | 39 | 20 |
| 2.0.4 | 15 | 6 |
| 3.0.4 | 15 | 9 |
| 2.0.8 | 12 | 1 |
| 3.0.3 | 9 | 6 |
| 2.0.10 | 6 | 3 |
| 2.0.12 | 5 | 4 |
| 2.0.7 | 5 | 3 |
| 3.0.1 | 5 | 5 |
| 3.0.0 | 4 | 2 |
| 1.0.5 | 3 | 3 |
| 3.0.2 | 2 | 1 |
| 2.0.13 | 1 | 1 |
| 2.0.3 | 1 | 1 |

## Report: MCP Calls By Country, Top Rows By Event Count

Filter: `eventName = mcp_tool_call`
Dimensions: `country`
Metrics: `activeUsers`, `eventCount`

| country | activeUsers | eventCount |
|---|---:|---:|
| South Korea | 913 | 391,543 |
| (not set) | 70 | 35,074 |
| Russia | 19 | 19,656 |
| United States | 87 | 18,916 |
| India | 50 | 14,100 |
| Brazil | 25 | 9,484 |
| Vietnam | 46 | 9,483 |
| Germany | 16 | 6,331 |
| China | 8 | 5,192 |
| Kazakhstan | 13 | 4,797 |
| Singapore | 65 | 4,565 |
| Philippines | 7 | 4,507 |
| Nigeria | 8 | 3,565 |
| Italy | 6 | 3,341 |
| Netherlands | 9 | 2,981 |
| France | 5 | 2,827 |
| Canada | 15 | 2,552 |
| Taiwan | 6 | 2,266 |
| Israel | 2 | 2,157 |
| United Arab Emirates | 6 | 2,150 |

## Report: MCP Success By Operating System

Filter: `eventName = mcp_tool_call`
Dimensions: `operatingSystem`, `customEvent:success`
Metrics: `eventCount`, `activeUsers`

| operatingSystem | success | eventCount | activeUsers |
|---|---|---:|---:|
| MacOS | 1 | 339,816 | 1,157 |
| MacOS | 0 | 26,702 | 1,048 |
| MacOS | (not set) | 4 | 1 |
| Windows | 1 | 196,451 | 356 |
| Windows | 0 | 7,075 | 309 |

Derived calculations:

- MacOS MCP event success rate: `339,816 / (339,816 + 26,702) = 92.72%`
- Windows MCP event success rate: `196,451 / (196,451 + 7,075) = 96.52%`

## Report: Funnel, App Start To MCP Tool Call

Tool: GA4 funnel report
Breakdown: `operatingSystem`
Steps: `app_start` -> `tutorial_shown` -> `tutorial_completed` -> `mcp_tool_call`

| step | segment | activeUsers | completionRate | abandonments | abandonmentRate |
|---|---|---:|---:|---:|---:|
| App start | TOTAL | 4,555 | 0.6395 | 1,642 | 0.3605 |
| App start | MacOS | 3,151 | 0.8061 | 611 | 0.1939 |
| App start | Windows | 1,404 | 0.2657 | 1,031 | 0.7343 |
| Tutorial shown | TOTAL | 2,913 | 0.5613 | 1,278 | 0.4387 |
| Tutorial shown | MacOS | 2,540 | 0.5575 | 1,124 | 0.4425 |
| Tutorial shown | Windows | 373 | 0.5871 | 154 | 0.4129 |
| Tutorial completed | TOTAL | 1,635 | 0.1352 | 1,414 | 0.8648 |
| Tutorial completed | MacOS | 1,416 | 0.1137 | 1,255 | 0.8863 |
| Tutorial completed | Windows | 219 | 0.2740 | 159 | 0.7260 |
| MCP tool call | TOTAL | 221 | 1.0000 | 0 | 0 |
| MCP tool call | MacOS | 161 | 1.0000 | 0 | 0 |
| MCP tool call | Windows | 60 | 1.0000 | 0 | 0 |

Important caveat:

- The funnel result is useful for directional activation analysis, but it does not match the broader event totals because GA4 funnel semantics use ordered user progression and may exclude users who skip tracked steps or perform actions outside the expected order.

## Report: Weekly Trend

Dimensions: `yearWeek`
Metrics: `activeUsers`, `sessions`, `eventCount`
Row count reported by GA4: 49

| yearWeek | activeUsers | sessions | eventCount |
|---|---:|---:|---:|
| 202532 | 18 | 51 | 240 |
| 202533 | 64 | 41 | 284 |
| 202536 | 149 | 92 | 928 |
| 202543 | 254 | 165 | 2,640 |
| 202548 | 310 | 185 | 2,227 |
| 202551 | 746 | 440 | 3,048 |
| 202552 | 1,210 | 715 | 4,869 |
| 202602 | 1,764 | 1,045 | 6,744 |
| 202603 | 2,022 | 1,219 | 8,425 |
| 202607 | 1,489 | 935 | 66,848 |
| 202611 | 1,842 | 1,166 | 115,633 |
| 202612 | 1,174 | 1,007 | 275,247 |
| 202613 | 1,304 | 1,148 | 322,864 |
| 202615 | 955 | 828 | 166,005 |
| 202622 | 820 | 667 | 121,568 |
| 202625 | 701 | 667 | 224,812 |
| 202627 | 372 | 276 | 7,547 |

Important caveat:

- The weeks with the largest `eventCount` are driven heavily by exception volume, not only healthy product usage.

## Report: Custom Event Actions

Dimensions: `customEvent:action`
Metrics: `eventCount`, `activeUsers`

| action | eventCount | activeUsers |
|---|---:|---:|
| (not set) | 1,759,519 | 30,792 |
| start_websocket_server | 23,898 | 21,115 |
| start | 16,870 | 4,719 |
| stop | 5,700 | 2,531 |
| direct_oauth_start | 4,382 | 3,016 |
| figma | 3,882 | 2,709 |
| copy_mcp_config | 2,448 | 1,495 |
| success | 2,140 | 1,950 |
| restart | 2,070 | 1,024 |
| error | 1,090 | 485 |
| kill_all_servers | 1,017 | 540 |
| app_exit | 344 | 317 |
| logout | 237 | 191 |
| report_issue | 133 | 99 |
| refresh_logs | 87 | 38 |
| clear_logs | 75 | 48 |
| graceful_kill_servers_from_dialog | 49 | 31 |
| copy_logs | 44 | 29 |

## Report: Custom Event Error Messages

Dimensions: `customEvent:error_message`
Metrics: `eventCount`, `activeUsers`
Row count reported by GA4: 3,819

| error_message | eventCount | activeUsers |
|---|---:|---:|
| (not set) | 1,788,623 | 30,945 |
| Request timed out | 18,105 | 1,056 |
| cannot convert to object | 2,595 | 20 |
| Failed to make WebSocket port 3055 available | 1,610 | 246 |
| Error executing command | 822 | 89 |
| Unknown command: set_auto_layout | 690 | 5 |
| Unknown command: set_font_name | 496 | 2 |
| Timed out waiting for 30000 ms | 434 | 92 |
| in set_layoutSizingHorizontal: FILL can only be set on children of auto-layout frames | 427 | 158 |
| Node type TEXT does not support layout sizing | 344 | 54 |
| in set_x: Property "x" failed validation: Expected number, received string | 306 | 73 |
| Not connected to Figma | 285 | 29 |
| Unknown command: insert_child | 284 | 4 |
| Must join a channel before sending commands | 269 | 148 |
| Error setting text content: in loadFontAsync: Cannot unwrap symbol | 232 | 51 |

## Report: Acquisition Source Sanity Check

Dimensions: `firstUserSourceMedium`, `sessionSourceMedium`
Metrics: `activeUsers`, `sessions`, `eventCount`

| dimension | value | activeUsers | sessions | eventCount |
|---|---|---:|---:|---:|
| firstUserSourceMedium | (direct) / (none) | 31,360 | 24,429 | 1,826,813 |
| sessionSourceMedium | (not set) | 31,360 | 24,429 | 1,826,813 |

Interpretation:

- Acquisition dimensions are not useful for this desktop-app retrospective. The property behaves like app telemetry rather than a web acquisition funnel.

## Report: Custom Event Category and Label

Dimensions: `customEvent:category`, `customEvent:label`
Metrics: `activeUsers`, `eventCount`

| category | label | activeUsers | eventCount |
|---|---|---:|---:|
| (not set) | (not set) | 30,793 | 1,773,175 |
| server_management | WebSocket server started | 21,115 | 23,898 |
| mcp_tool | (not set) | 303 | 14,451 |
| figma | Direct OAuth from Menu | 3,016 | 4,382 |
| ui_interaction | config_dialog_copy_button | 1,495 | 2,448 |
| direct_oauth_success | Direct OAuth completed | 1,620 | 2,124 |
| direct_oauth_failed | OAuth Error: callback_error - Unknown error | 738 | 1,020 |
| emergency_action | All servers killed | 540 | 1,017 |
| direct_oauth_error | rememberCoroutineScope left the composition | 587 | 655 |
| app_lifecycle | App exit requested | 317 | 343 |
| ui_interaction | Report an Issue | 99 | 133 |
| ui_interaction | Logs refreshed | 38 | 87 |
| ui_interaction | Clear logs | 48 | 75 |
| server_error | Connection error recovery with graceful shutdown | 31 | 49 |
| ui_interaction | Copy logs to clipboard | 29 | 44 |

Interpretation:

- The strongest non-MCP action evidence is connection and setup oriented: WebSocket server start, OAuth, config copy, emergency server cleanup, logs, and issue reporting.
- This supports the retrospective framing that the desktop app's product value was reducing the anxiety between first launch and first connection.

## Report: Page Titles and Paths

Dimensions: `pageTitle`, `pagePath`
Metrics: `activeUsers`, `screenPageViews`, `eventCount`

Top page titles:

| pageTitle | activeUsers | screenPageViews | eventCount |
|---|---:|---:|---:|
| Step 1: Open MCP Configuration (windows) | 6,772 | 7,775 | 7,775 |
| Step 2: Run Figma Plugin (windows) | 3,545 | 4,261 | 4,261 |
| Settings | 3,328 | 6,999 | 6,999 |
| Step 3: Do MCP Magic (windows) | 3,042 | 3,439 | 3,439 |
| Step 4: Figma OAuth (Optional) (windows) | 2,866 | 3,016 | 3,016 |
| Step 1: Open MCP Configuration (mac) | 2,474 | 3,232 | 3,232 |
| MCP Configuration Dialog | 2,174 | 3,675 | 3,675 |
| Step 2: Run Figma Plugin (mac) | 1,914 | 2,522 | 2,522 |
| Terminal | 1,854 | 3,455 | 3,455 |
| Step 3: Do MCP Magic (mac) | 1,732 | 2,095 | 2,095 |
| Step 4: Figma OAuth (Optional) (mac) | 1,662 | 1,801 | 1,801 |
| Server Error Dialog | 1,033 | 1,925 | 1,925 |
| Assistant | 987 | 1,861 | 1,861 |
| Help | 885 | 1,297 | 1,297 |
| View Logs | 860 | 964 | 964 |

Top page paths:

| pagePath | activeUsers | screenPageViews | eventCount |
|---|---:|---:|---:|
| /tutorial/windows/step1 | 6,772 | 7,775 | 7,775 |
| /tutorial/windows/step2 | 3,543 | 4,259 | 4,259 |
| /tutorial/windows/step3 | 3,043 | 3,443 | 3,443 |
| /tutorial/windows/step4 | 2,869 | 3,023 | 3,023 |
| /tutorial/mac/step1 | 2,474 | 3,232 | 3,232 |
| /mcp/config | 2,174 | 3,675 | 3,675 |
| /tutorial/mac/step2 | 1,921 | 2,532 | 2,532 |
| /tutorial/mac/step3 | 1,739 | 2,103 | 2,103 |
| /tutorial/mac/step4 | 1,668 | 1,808 | 1,808 |
| /error/server-connection | 1,033 | 1,925 | 1,925 |
| /logs | 861 | 965 | 965 |

Interpretation:

- Page titles and paths directly show that the app had an explicit first-connection journey: open MCP configuration, run the Figma plugin, do MCP work, optionally connect OAuth.
- `Server Error Dialog` and `/logs` reinforce that connection recovery and diagnosis were part of the real product surface.

## Auxiliary Audit Reports With No New Presentation Insight

These reports were checked as termination-audit passes. They did not add a new presentation-worthy insight beyond the analysis already captured above.

| dimension | result | reason not used |
|---|---|---|
| browser | `(not set)` for 31,352 active users; `DesktopApp` for 2 active users | Mostly unset; not a useful browser segment |
| screenResolution | 218 rows, top values include `1536x864`, `1366x768`, `1280x720`, `1920x1080` | Confirms desktop variety but does not change the retrospective story |
| newVsReturning | `new` 30,864 active users; `(not set)` 485 | Desktop telemetry identity makes retention interpretation weak |
| customEvent:value | `(not set)` for 1,823,862 events | Not useful |
| customEvent:duration_ms | 19,943 rows, many numeric buckets | Too granular as a dimension; not reliable as a performance metric here |
| pageReferrer | empty for all 31,360 active users | Not useful for app telemetry |
| firstUserDefaultChannelGroup | Direct for all 31,360 active users | Confirms acquisition/channel data is not useful |
| defaultChannelGroup | 0 rows with compatible metrics | Not useful |
| streamName | TalkToFigma Desktop for all 31,360 active users | Confirms this dataset is the desktop app stream |
