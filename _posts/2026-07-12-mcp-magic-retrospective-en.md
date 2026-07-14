---
title: "31,360 Cumulative Users and 570,000 Calls: MCP Magic"
date: 2026-07-12 00:00:00
description: "31,360 cumulative users and 570,373 MCP tool calls. A retrospective on turning the first connection into a product—and what happened once the center of that experience moved into the platform."
featured_image: "/images/projects/2026-mcp-magic-retrospective/mcp-magic-desktop-en.png"
article_class: "post__content--mcp-magic-retrospective"
title_class: "post__title--mcp-magic-retrospective"
visible: true
lang: en
translation_key: mcp-magic-retrospective
---

> What we built was not a new AI feature. It was a doorway people could cross—from installation to their first successful call—without giving up along the way.

_Read the [original Korean post](/blog/mcp-magic-retrospective)._

GA4 recorded **31,360 cumulative users** and **570,373 MCP tool calls**. The project worked. But as usage grew, operating the connection became the harder problem, and the center of the experience we were solving for began moving into the official platform.

<figure id="mcp-retro-key-metrics" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" aria-label="View the MCP Magic key metrics image at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" width="1122" height="1402" alt="An overview of 31,360 cumulative GA4 users, 570,373 MCP tool calls, and a 94.1 percent success rate for status-classified calls">
  </a>
  <figcaption>31,360 is the cumulative user count for the whole app. 1,633 active users generated at least one <code>mcp_tool_call</code> event; these are not sequential funnel stages for the same users. The GA4 query covers July 1, 2025–June 30, 2026, with valid records beginning in August 2025. The success rate uses the 570,044 calls with an explicit success or failure status.</figcaption>
</figure>

Watching AI read and edit a design in Figma was compelling. But when we handed the tools to other people, many stopped before reaching that moment. They had to set up a runtime and server, an MCP client and a Figma plugin separately—and when something went wrong, move back and forth between the terminal and the plugin.

So we brought those scattered preparation steps into one desktop app. Borrowing a Korean expression, we wanted a **“one-click” experience** where the server would just come up.

## We built an entrance, not a feature

MCP Magic did not start from scratch. Its starting point was [Cursor Talk To Figma MCP](https://github.com/grab/cursor-talk-to-figma-mcp), which the Grab Design team had used internally and released as open source. The core capability—reading and editing Figma through natural language—already worked.

The product problem we had to solve was not the core capability, but the path to first success. MCP Magic brought service startup, copied configuration, connection status, and logs—previously scattered across several tools—onto one screen.

We released the first KMP-based desktop version on July 18, 2025, then expanded it into a family of apps called MCP Magic that October. After listening to users, we rewrote the architecture in Electron. I worked through this with my fellow contributors **Yiseo and Jin**. The implementation changed more than once, but the question stayed the same.

> How could more people get past the first connection and into real work?

The app did not make MCP itself more powerful. It made the path to power that already existed shorter and clearer. A powerful capability that people abandon before their first connection might as well not exist to them.

## The project led to real work

Over the 11 months with valid GA4 records, 1,633 active users generated at least one `mcp_tool_call` event. This figure is counted independently by event from the app-wide total of 31,360 cumulative users, so it does not mean all 31,360 people made it to MCP work. Still, that core group produced 570,373 MCP tool calls: 536,267 successes and 33,777 failures. Among calls with an explicit success or failure status, the success rate was **94.1%**.

The core group that generated calls did not simply check whether a connection was live and leave. `create_text` succeeded 105,643 times, and `set_fill_color` 92,561 times—a combined 198,204. Grouping tool names into creation/duplication and styling/content editing yields 390,642 calls, or **72.8%** of all successful calls.

<figure id="mcp-retro-purpose-chart" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" aria-label="View the MCP successful calls by design purpose chart at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" width="1080" height="1350" alt="A horizontal bar chart of successful MCP calls by design purpose, including 155,623 for content creation and text editing, 151,443 for structure and layout, and 141,524 for visual styling">
  </a>
  <figcaption>This is an analyst-defined classification of the most-used successful tools into six more specific design purposes, based on their names. People did not stop at reading Figma; they created, filled, and refined it.</figcaption>
</figure>

**What people wanted was not a connection for its own sake, but the moment when AI actually touched Figma.** MCP Magic's role was to build the entrance that made that moment reachable.

### Depth was uneven, and some sessions became very deep

GA4 showed reach and call volume; the Aptabase export showed how deeply MCP was used inside observed sessions. The important signal here is not the total number of sessions, but the density of work in the sessions where people began using MCP.

<figure id="mcp-retro-session-depth" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" aria-label="View the work depth in observed MCP sessions at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" width="1080" height="1350" alt="A maximum observed span of 12 hours and 36 minutes and a maximum estimated 9,631 MCP calls; a median span of 25 minutes and 31 seconds with 11 estimated calls per session; a P95 span of 2 hours, 12 minutes, and 54 seconds with 367 calls; and the top 5 percent of sessions driving 55.1 percent of estimated calls">
  </a>
  <figcaption>Release builds only. A span is the observed interval between the first and last event, not continuous usage time. Call counts are estimates with batch size expanded. Because event IDs are unavailable and identical rows repeat, extreme values cannot all be treated as independent tasks. Gaps in collection during each month mean these data do not represent total adoption or monthly trends.</figcaption>
</figure>

Work depth was not evenly distributed. A typical observed MCP session had a median span of 25 minutes and 31 seconds and 11 estimated calls, while the threshold for the deepest 5% reached 2 hours, 12 minutes, and 54 seconds with 367 calls. The longest observed session spanned 12 hours, 36 minutes, and 41 seconds; the maximum estimated call count was 9,631; and the top 5% of sessions generated 55.1% of all estimated calls. **For some people, MCP was no longer a connection to test—it had become a tool for long, repeated design work.**

## After the click came operations

As the user base grew, the question changed.

> Could we make this something people could keep trusting across different users, operating systems, MCP clients, and network environments?

The channel run by Yiseo received questions about whether design really happened with just one click, whether all AI was free, and whether the app would handle Cursor or Claude Code setup too.

Every user's “it doesn't work” had a different cause. A connection could fail at the server or port, the plugin channel, MCP client settings, or operating-system security. GA4 recorded 1,539 active users encountering port-binding issues, 1,231 encountering duplicate server-start handlers, and 1,056 encountering request timeouts.

The causes differed, but they arrived to users as the same message.

> It doesn't work.

High call-level success and session-level friction existed at the same time. GA4 showed a 94.1% success rate among calls with an explicit status, while a separate Aptabase release logbook—with a different period and instrumentation—recorded at least one failure event in 1,424 of 2,376 MCP sessions (59.9%). The two figures cannot be compared directly. But the fact that many observed MCP sessions contained at least one failure event shows why call-level success alone cannot explain the friction of doing the work.

Making the first connection easy was not enough. Next came diagnosis and recovery appropriate to each user's level, connection reliability, and support operations. These were not ancillary operational chores; they were the product we still needed to build after the first connection.

## Success did not guarantee survival

We expanded language support and experimented with working through a local LLM without a separate IDE. But over time, the case for continuing large updates became weaker—not because there was no usage, but because the most natural home for the core experience we had made into a product began moving into the official platform.

In March 2026, Figma announced [a beta in which agents write directly to the canvas through `use_figma`](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/), followed in May by [the Figma design agent that works directly within the canvas](https://www.figma.com/blog/the-figma-agent-is-here/). The problem itself did not go away. The default place to solve it changed.

Independent tools often discover new demand first where a platform's boundary is thin. Once that demand becomes clear enough, a platform that already has the files, permissions, design system, and deployment surface can bring the flow into its own product through a shorter path. This is natural and welcome for users, but for a third party it means that **the success of a feature and the sustainability of an independent product are entirely different problems.**

This is not a story about Figma seeing us and copying us. Nor can the data prove that official features caused user decline. What we did prove was real demand, while the platform occupied the structural position to solve that demand more naturally.

The judgment that this direction made sense was separate from the feelings of those who built it. We found the problem early enough to turn it into a product and proved demand through tens of thousands of people and 570,000 calls. But we did not decide quickly enough what we would own for the long term: diagnosis and recovery, cross-platform connection, or deep workflows for a particular team. We were not pushed out simply because we were late. Even after solving the problem early enough, we chose our next sustainable position too late.

That is why we plan to keep MCP Magic closer to maintenance mode than shut it down. Necessary fixes will continue, but there is less reason than before to keep making major feature updates in its current form.

## What we will decide earlier next time

In retrospect, we waited too long after making the first connection easy.

First, **we should have narrowed the next goal sooner.** We never decided whether to remain an installation helper, become a connection diagnosis and recovery tool, or combine the frequently repeated Figma work into a single workflow. After the first problem was solved, we needed a new product hypothesis.

Second, **we should have made the boundary of support clear.** It needed to be clearer which problems belonged to the app and which belonged to the Figma plugin, MCP client, operating system, or AI costs. Turning repeated “it doesn't work” reports into self-diagnosis and recovery flows mattered as much as developing features.

Third, **we should have connected user data to the next hypothesis sooner.** Only when we organized the data late did we see broad discovery, a few work sessions with concentrated calls, high call-level success, and sessions that also contained failure events—all at once. Had we separated the first connection, first success, repeat use, and behavior after a failure from the start, the priorities for updates might have been different.

## What 570,000 calls left behind

What the project proved was demand, not a right for us to own that demand forever.

MCP Magic reduced the first step of taking users from 0 to 80 to “one click.” The app reached 31,360 cumulative users, who accumulated 570,373 MCP tool calls. Those calls record work: creating text, applying color, making frames, and refining layouts.

At the same time, the final 20% still meant diagnosis and recovery, operations and support, and the choice of where our responsibility ended. Once the official platform began solving the same problem more naturally, the more important question was not what we could build, but what we could own for the long term.

This is neither a record of failure nor an excuse for slowing updates. **A successful feature and a product entering maintenance mode can exist at the same time.** The 570,000 calls are both evidence that we solved the right problem and an invoice reminding us to choose a sustainable position earlier next time.

For denominators, methodology, data-quality limitations, and project history, see the separate [Appendix Markdown (Korean)](https://github.com/dusskapark/dusskapark.github.io/blob/master/research/mcp-magic-retrospective/APPENDIX.ko.md).
