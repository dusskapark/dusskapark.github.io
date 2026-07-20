---
title: "[Interview] MCP Magic and 570,000 Calls: Putting AI to Work in Figma"
date: 2026-07-12 00:00:00
description: "MCP Magic helped people connect AI and Figma and reach a first real task. Friends of Figma Seoul operators look back on 31,360 users and 570,373 calls."
featured_image: "/images/projects/2026-mcp-magic-retrospective/mcp-magic-desktop-en.png"
article_class: "post__content--mcp-magic-retrospective"
title_class: "post__title--mcp-magic-retrospective"
visible: true
lang: en
translation_key: mcp-magic-retrospective
authors:
  - JooHyung
  - Yiseo
  - Jin
---

For an AI agent to read a Figma file and change text, color, or layout, people normally have to connect an MCP server and client, then a Figma plugin. **MCP Magic bundled that setup into a desktop app and shortened the path to the first moment an AI could move something in Figma.**

The Friends of Figma Seoul editorial team asked JooHyung and Yiseo—both FoF Seoul operators and MCP Magic contributors—where the app began and what it left behind. This is their retrospective, combined with project data and the early desktop-app work by Jin.

GA4 recorded **31,360 total users** and **570,373 MCP tool calls**. That tells us MCP Magic reached real users. The bigger questions for JooHyung and Yiseo were how to keep the experience dependable as that audience grew—and where the tool should go next.

<figure id="mcp-retro-key-metrics" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" aria-label="View the MCP Magic key metrics image at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" width="1080" height="1350" alt="An infographic showing 31,360 total users, 570,373 MCP tool calls, and a 94.1 percent success rate among status-classified calls">
  </a>
  <figcaption>31,360 is the total user count across the whole app. 1,633 active users generated at least one <code>mcp_tool_call</code> event; these are not sequential funnel stages for the same users. The GA4 query covers July 1, 2025–June 30, 2026, with valid records beginning in August 2025. The success rate uses the 570,044 calls with an explicit success or failure status.</figcaption>
</figure>

## Q. What problem did MCP Magic start with?

Watching AI read and edit a design in Figma was compelling from the start. But when the team handed the tools to other people, many stopped before they ever reached that moment. They had to set up a runtime and server, an MCP client, and a Figma plugin separately—and move back and forth between the terminal and the plugin whenever something went wrong.

MCP Magic did not start from scratch. Its starting point was [Cursor Talk To Figma MCP](https://github.com/grab/cursor-talk-to-figma-mcp), which the Grab Design team used internally before releasing it as open source. The core capability—reading and editing Figma through natural language—already worked.

> **JooHyung:** “The problem was not that the capability was missing. The path to a user's first success was just too complicated.”

In July 2025, JooHyung and Jin released the Talk To Figma desktop app on GitHub. It gathered service startup, configuration, connection state, and logs into the menu-bar tray. That compact app is now Grab's official open-source project and the backbone of MCP Magic.

> **Yiseo:** “When I saw the prototype, I thought, ‘This is it.’ Before grand automation, we needed a click-and-it-works experience—one click, and the server comes up.”

Yiseo joined the project through that prototype, helping refine the desktop UI, turn complex setup into language people could act on, and introduce the work through community channels. That October, the team expanded the foundation into the MCP Magic family of apps. They rewrote the architecture more than once as they listened to users, but the question stayed the same: how could more people get past the first connection and into real work?

MCP Magic did not make MCP itself more powerful. It made the path to an existing capability shorter and clearer. If people give up before getting started, even a powerful feature may as well not exist for them.

## Q. What showed that people were using it?

Over the 11 months with valid GA4 records, 1,633 active users generated at least one `mcp_tool_call` event. This figure is counted independently from the app-wide total of 31,360 users, so it does not mean all 31,360 people made it to MCP work. Still, that core group produced 570,373 MCP tool calls: 536,267 successes and 33,777 failures. Among calls with an explicit success or failure status, the success rate was **94.1%**.

**These 1,633 people were close to a professional user group already paying to work with AI and Figma.** They were using tools such as Cursor or Claude Code alongside paid Figma plans, then bringing MCP Magic into that stack. In other words, this was more than installs or free trials: it was an early-adopter group pulling a new workflow into real work.

One especially encouraging signal was that people did not just verify a connection and leave. `create_text` succeeded 105,643 times, and `set_fill_color` 92,561 times—a combined 198,204. Grouping tool names into creation/duplication and styling/content editing yields 390,642 calls, or **72.8%** of all successful calls.

<figure id="mcp-retro-purpose-chart" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" aria-label="View the MCP successful calls by design purpose chart at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" width="1080" height="1350" alt="A horizontal bar chart of successful MCP calls by design purpose, including 155,623 for content creation and text editing, 151,443 for structure and layout, and 141,524 for visual styling">
  </a>
  <figcaption>This is an analyst-defined classification of the most-used successful tools into six more specific design purposes, based on their names. People did not stop at reading Figma; they created content, applied fills, and refined designs.</figcaption>
</figure>

> **Yiseo:** “The part that made me happiest was realizing people were not just trying it because it was trendy. They were using it in real work.”

JooHyung and Jin opened the possibility with the desktop app; MCP Magic helped more people carry it through into actual work. Call volume alone cannot show how deeply they worked, but it did show that people had reached the point where AI was changing their Figma files.

### Q. Were people just trying it, or using it deeply?

GA4 showed reach and call volume. The Aptabase export showed how deeply MCP was used within observed sessions. Some people may have been trying it out lightly, but what stood out in this data were sessions that lasted and returned to repeated work.

<figure id="mcp-retro-session-depth" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" aria-label="View the work depth in observed MCP sessions at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" width="1080" height="1350" alt="An infographic showing a maximum observed span of 12 hours 36 minutes, a maximum estimated 9,631 MCP calls, a 25 minute 31 second median span with 11 estimated calls, and the top 5 percent of sessions driving 55.1 percent of estimated calls">
  </a>
  <figcaption>Release builds only. A span is the observed interval between the first and last event, not continuous usage time. Call counts are estimates with batch size expanded. Because event IDs are unavailable and identical rows repeat, extreme values cannot all be treated as independent tasks. Gaps in collection during each month mean these data do not represent total adoption or monthly trends.</figcaption>
</figure>

As the image shows, this was not only traffic that checked a connection and left. Some sessions continued for a long time, with the AI repeatedly working on Figma tasks. **For some people, MCP Magic was not a tool to test briefly; it was a tool for long, repeated design work.** This is where the “real use” Yiseo described becomes clearest.

## Q. What changed as the audience grew?

Yiseo is a Figma creator who runs several community channels. As she did, more varied questions began arriving through Friends of Figma Seoul, KakaoTalk open chats, and other channels. As the audience grew, the questions changed too.

At first, people were simply intrigued. Over time, more asked about installation, cost, and practical use.

> “Does design really happen with just one click?”<br>
> “Is this free?”<br>
> “How do I install it for Cursor?”

It is hard to point to a single cause, but the period when AI and MCP felt novel yet distant seemed to pass quickly. Within a year, many designers viewed them as tools they needed for work right away—and the urgency in those questions carried a sense of FOMO: learn it now, use it now.

Those questions converged on one larger question.

> “Could we make this something people could keep trusting across different users, operating systems, MCP clients, and network environments?”

Every user's “it doesn't work” had a different cause. A connection could fail at the server or port, the plugin channel, MCP client settings, or operating-system security. GA4 recorded 1,539 active users encountering port-binding issues, 1,231 encountering duplicate server-start handlers, and 1,056 encountering request timeouts.

The causes differed, but they arrived to users as the same message.

> “It doesn't work.”

High call-level success and session-level friction existed at the same time. GA4 showed a 94.1% success rate among calls with an explicit status, while a separate Aptabase release logbook—with a different period and instrumentation—recorded at least one failure event in 1,424 of 2,376 MCP sessions (59.9%). The two figures cannot be compared directly. But the fact that many observed MCP sessions contained at least one failure event shows why call-level success alone cannot explain the friction of doing the work.

> **Yiseo:** “As the audience grew, support and recovery became part of the product too.”

The team learned that making the first connection easy was not enough. Next came diagnosis and recovery, reliable connections, and support that met users where they were. These were not ancillary operational chores; they were part of the product still left to build.

## Q. What happens to the project now?

The team expanded language support and experimented with working through a local LLM, Google Gemma 4, without a separate IDE. But over time, the case for continuing large updates became weaker—not because there was no usage, but because the most natural home for the core experience they had made into a product began moving into the official platform.

In March 2026, Figma announced [a beta in which agents write directly to the canvas through `use_figma`](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/), followed in May by [the Figma design agent that works directly within the canvas](https://www.figma.com/blog/the-figma-agent-is-here/). The problem itself did not go away. The default place to solve it was changing.

Independent tools often discover new demand first where a platform's boundary is thin. Once that demand becomes clear enough, a platform that already has the files, permissions, design system, and deployment surface can bring the flow into its own product through a shorter path. This is natural and welcome for users. For a third party, though, **the success of a feature and the sustainability of an independent product are entirely different problems.**

This is not a story about Figma seeing MCP Magic and copying it. Nor can the data prove that official features caused user decline. What MCP Magic did prove was real demand, while the platform was structurally better positioned to meet that demand.

> **JooHyung:** “A successful feature does not automatically mean an independent product can be sustained for the long term.”

The team found the problem early enough to turn it into a product and proved demand through tens of thousands of people and 570,000 calls. But they did not decide quickly enough what they would own for the long term: diagnosis and recovery, cross-platform connection, or deep workflows for a particular team.

MCP Magic will therefore remain closer to maintenance mode than shutdown. Necessary fixes will continue, but there is less reason than before to keep making major feature updates in its current form.

## Q. What would you do differently next time?

> **The operators' retrospective:** “Next time, we need to decide sooner what to build after solving the first problem.”

In retrospect, the team took too long to decide what would come after making the first connection easy. Three notes from the project stand out.

First, **they should have narrowed the next goal sooner.** They never decided whether to remain an installation helper, become a connection diagnosis and recovery tool, or combine frequently repeated Figma work into a single workflow. After the first problem was solved, they needed a new product hypothesis.

Second, **they should have made the boundary of support clear.** It needed to be clearer which problems belonged to the app and which belonged to the Figma plugin, MCP client, operating system, or AI costs. Turning repeated “it doesn't work” reports into self-diagnosis and recovery flows mattered as much as developing features.

Third, **they should have connected user data to the next hypothesis sooner.** Only when they organized the data late did they see broad discovery, a few work sessions with concentrated calls, high call-level success, and sessions that also contained failure events—all at once. Had they separated the first connection, first success, repeat use, and behavior after a failure from the start, the priorities for updates might have been different.

## Q. What did 570,000 calls leave behind?

What the project proved was demand, not a right to own that demand forever.

MCP Magic reduced the first step to the point where users could actually work with Figma through AI. Those calls record work: creating text, applying color, making frames, and refining layouts.

At the same time, the final 20% still meant diagnosis and recovery, operations and support, and the choice of where responsibility ended. Once the official platform began solving the same problem more naturally, the more important question was not what the team could build, but what it could own for the long term.

> **JooHyung and Yiseo:** “This is not a record of failure or an excuse for slowing updates. A successful feature and a product entering maintenance mode can exist at the same time.”

The 570,000 calls are evidence that the work JooHyung and Jin started—and that Yiseo helped extend with MCP Magic—solved the right problem. They are also a reminder to choose a sustainable position earlier next time.

For denominators, methodology, data-quality limitations, and project history, see the separate [Appendix Markdown (Korean)](https://github.com/dusskapark/dusskapark.github.io/blob/master/research/mcp-magic-retrospective/APPENDIX.ko.md).
