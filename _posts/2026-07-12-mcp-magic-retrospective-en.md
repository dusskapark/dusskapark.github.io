---
title: "31,360 Cumulative Users and 570,000 Calls: MCP Magic"
date: 2026-07-12 00:00:00
description: "31,360 cumulative users and 570,373 MCP tool calls. A retrospective on turning the first connection into a product—and what happened as the experience moved into the platform."
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

> What we built was not a new AI feature. It was a doorway people could cross—from installation to their first successful call—without giving up along the way.

GA4 recorded **31,360 cumulative users** and **570,373 MCP tool calls**. Those numbers show that the project was used in the real world. But after helping extend and launch the Talk To Figma desktop app that JooHyung and Jin had built into MCP Magic, I found myself thinking about a different set of questions: How could we keep this experience dependable as more people used it? And where would the path we made ultimately belong?

<figure id="mcp-retro-key-metrics" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" aria-label="View the MCP Magic key metrics image at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-key-metrics-social-en.png" width="1080" height="1350" alt="An infographic showing 31,360 cumulative users, 570,373 MCP tool calls, and a 94.1 percent success rate among status-classified calls">
  </a>
  <figcaption>31,360 is the cumulative user count for the whole app. 1,633 active users generated at least one <code>mcp_tool_call</code> event; these are not sequential funnel stages for the same users. The GA4 query covers July 1, 2025–June 30, 2026, with valid records beginning in August 2025. The success rate uses the 570,044 calls with an explicit success or failure status.</figcaption>
</figure>

Watching AI read and edit a design in Figma was compelling from the start. But when we handed the tools to other people, many stopped before they ever reached that moment. They had to set up a runtime and server, an MCP client, and a Figma plugin separately—and move back and forth between the terminal and the plugin whenever something went wrong.

When JooHyung and Jin showed me their prototype for putting that preparation into one desktop app, I knew we had the right starting point. I was not looking for grand automation. Borrowing a Korean expression, I wanted a **“click, and it just works” experience**—the server simply comes up.

## We built an entrance, not a feature

MCP Magic did not start from scratch. Its starting point was [Cursor Talk To Figma MCP](https://github.com/grab/cursor-talk-to-figma-mcp), which the Grab Design team used internally before releasing it as open source. The core capability—reading and editing Figma through natural language—already worked.

The problem JooHyung saw first was not a missing capability; it was the complex path to a user's first success. In July 2025, he and Jin released the Talk To Figma desktop app on GitHub. It gathered service startup, configuration, connection state, and logs into the menu-bar tray. That compact app is now Grab's official open-source project and the backbone of MCP Magic.

The prototype drew me into the project more deeply. I helped refine the desktop UI, translate complex setup into language people could act on, and introduce the work through community channels. That October, we expanded the foundation into a family of apps called MCP Magic. We rewrote the architecture more than once as we listened to users, but the question never changed.

> How could more people get past the first connection and into real work?

The app did not make MCP itself more powerful. It made the path to an existing capability shorter and clearer. If people give up before getting started, even a powerful feature may as well not exist for them.

## The project led to real work

Over the 11 months with valid GA4 records, 1,633 active users generated at least one `mcp_tool_call` event. This figure is counted independently by event from the app-wide total of 31,360 cumulative users, so it does not mean all 31,360 people made it to MCP work. Still, that core group produced 570,373 MCP tool calls: 536,267 successes and 33,777 failures. Among calls with an explicit success or failure status, the success rate was **94.1%**.

**These 1,633 people were professional users already paying to work with AI and Figma.** They were using tools such as Cursor or Claude Code alongside paid Figma plans, then bringing MCP Magic into that stack. So this group represents more than installs or free trials: it is an early-adopter group that pulled a new workflow into real work.

The most encouraging signal was that people did not just verify a connection and leave. `create_text` succeeded 105,643 times, and `set_fill_color` 92,561 times—a combined 198,204. Grouping tool names into creation/duplication and styling/content editing yields 390,642 calls, or **72.8%** of all successful calls.

<figure id="mcp-retro-purpose-chart" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" aria-label="View the MCP successful calls by design purpose chart at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-calls-by-purpose-social-en.png" width="1080" height="1350" alt="A horizontal bar chart of successful MCP calls by design purpose, including 155,623 for content creation and text editing, 151,443 for structure and layout, and 141,524 for visual styling">
  </a>
  <figcaption>This is an analyst-defined classification of the most-used successful tools into six more specific design purposes, based on their names. People did not stop at reading Figma; they created, filled, and refined it.</figcaption>
</figure>

**What people wanted was not a connection for its own sake, but the moment when AI actually touched Figma.** MCP Magic extended the possibility JooHyung and Jin had opened with the desktop app so that more people could turn it into real work.

### Depth was uneven, and some sessions became very deep

GA4 showed reach and call volume; the Aptabase export showed how deeply MCP was used inside observed sessions. The important signal here is not the total number of sessions, but the density of work in the sessions where people began using MCP.

<figure id="mcp-retro-session-depth" class="mcp-retro-image-figure">
  <a href="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" aria-label="View the work depth in observed MCP sessions at full size">
    <img src="/images/projects/2026-mcp-magic-retrospective/mcp-magic-session-depth-social-en.png" width="1080" height="1350" alt="An infographic showing a maximum observed span of 12 hours 36 minutes, a maximum estimated 9,631 MCP calls, a 25 minute 31 second median span with 11 estimated calls, and the top 5 percent of sessions driving 55.1 percent of estimated calls">
  </a>
  <figcaption>Release builds only. A span is the observed interval between the first and last event, not continuous usage time. Call counts are estimates with batch size expanded. Because event IDs are unavailable and identical rows repeat, extreme values cannot all be treated as independent tasks. Gaps in collection during each month mean these data do not represent total adoption or monthly trends.</figcaption>
</figure>

Work depth was not evenly distributed. A typical observed MCP session had a median span of 25 minutes and 31 seconds and 11 estimated calls, while the threshold for the deepest 5% reached 2 hours, 12 minutes, and 54 seconds with 367 calls. The longest observed session spanned 12 hours, 36 minutes, and 41 seconds; the maximum estimated call count was 9,631; and the top 5% of sessions generated 55.1% of all estimated calls. **For some people, MCP was no longer a connection to test—it had become a tool for long, repeated design work.**

## After the click came operations

As the user base grew, the questions I received changed too. I run several KakaoTalk open-chat communities, including Friends of Figma Seoul, with thousands of active members in total. That is where I began to see the shift first.

At first, people were simply intrigued. Then the questions took on a different character.

> “Does design really happen with just one click?”<br>
> “Is this free?”<br>
> “How do I install it for Cursor?”

I cannot pin down a single cause, but the period when AI and MCP felt novel yet distant seemed to pass quickly. Within a year, many designers viewed them as tools they needed for work right away—and the urgency in the questions carried a sense of FOMO: learn it now, use it now.

Those questions converged on one larger question.

> Could we make this something people could keep trusting across different users, operating systems, MCP clients, and network environments?

Every user's “it doesn't work” had a different cause. A connection could fail at the server or port, the plugin channel, MCP client settings, or operating-system security. GA4 recorded 1,539 active users encountering port-binding issues, 1,231 encountering duplicate server-start handlers, and 1,056 encountering request timeouts.

The causes differed, but they arrived to users as the same message.

> It doesn't work.

High call-level success and session-level friction existed at the same time. GA4 showed a 94.1% success rate among calls with an explicit status, while a separate Aptabase release logbook—with a different period and instrumentation—recorded at least one failure event in 1,424 of 2,376 MCP sessions (59.9%). The two figures cannot be compared directly. But the fact that many observed MCP sessions contained at least one failure event shows why call-level success alone cannot explain the friction of doing the work.

That was the realization: making the first connection easy was not enough. Next came diagnosis and recovery appropriate to each user's level, connection reliability, and support operations. These were not ancillary operational chores; they were part of the product we still needed to build after the first connection.

## Success did not guarantee survival

We expanded language support and experimented with working through a local LLM, Google Gemma 4, without a separate IDE. But over time, the case for continuing large updates became weaker—not because there was no usage, but because the most natural home for the core experience we had made into a product began moving into the official platform.

In March 2026, Figma announced [a beta in which agents write directly to the canvas through `use_figma`](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/), followed in May by [the Figma design agent that works directly within the canvas](https://www.figma.com/blog/the-figma-agent-is-here/). The problem itself did not go away. The default place to solve it changed.

Independent tools often discover new demand first where a platform's boundary is thin. Once that demand becomes clear enough, a platform that already has the files, permissions, design system, and deployment surface can bring the flow into its own product through a shorter path. This is natural and welcome for users, but for a third party it means that **the success of a feature and the sustainability of an independent product are entirely different problems.**

This is not a story about Figma seeing us and copying us. Nor can the data prove that official features caused user decline. What we did prove was real demand, while the platform occupied the structural position to solve that demand more naturally.

The judgment that this direction made sense was separate from the feelings of those who built it. We found the problem early enough to turn it into a product and proved demand through tens of thousands of people and 570,000 calls. But we did not decide quickly enough what we would own for the long term: diagnosis and recovery, cross-platform connection, or deep workflows for a particular team. We were not pushed out simply because we were late. Even after solving the problem early enough, we chose our next sustainable position too late.

That is why we plan to keep MCP Magic closer to maintenance mode than shut it down. Necessary fixes will continue, but there is less reason than before to keep making major feature updates in its current form.

## What we will decide earlier next time

In retrospect, we took too long to decide what would come after making the first connection easy. Three notes from building the project together have stayed with me.

First, **we should have narrowed the next goal sooner.** We never decided whether to remain an installation helper, become a connection diagnosis and recovery tool, or combine frequently repeated Figma work into a single workflow. After the first problem was solved, we needed a new product hypothesis.

Second, **we should have made the boundary of support clear.** It needed to be clearer which problems belonged to the app and which belonged to the Figma plugin, MCP client, operating system, or AI costs. Turning repeated “it doesn't work” reports into self-diagnosis and recovery flows mattered as much as developing features.

Third, **we should have connected user data to the next hypothesis sooner.** Only when we organized the data late did we see broad discovery, a few work sessions with concentrated calls, high call-level success, and sessions that also contained failure events—all at once. Had we separated the first connection, first success, repeat use, and behavior after a failure from the start, the priorities for updates might have been different.

## What 570,000 calls left behind

What the project proved was demand, not a right for us to own that demand forever.

MCP Magic reduced the first step to the point where users could actually work with Figma through AI. Those calls record work: creating text, applying color, making frames, and refining layouts.

At the same time, the final 20% still meant diagnosis and recovery, operations and support, and the choice of where our responsibility ended. Once the official platform began solving the same problem more naturally, the more important question was not what we could build, but what we could own for the long term.

This is neither a record of failure nor an excuse for slowing updates. **A successful feature and a product entering maintenance mode can exist at the same time.** The 570,000 calls are evidence that the work JooHyung and Jin started—and that I helped extend with MCP Magic—solved the right problem. They are also the bill reminding us to choose a sustainable position earlier next time.

For denominators, methodology, data-quality limitations, and project history, see the separate [Appendix Markdown (Korean)](https://github.com/dusskapark/dusskapark.github.io/blob/master/research/mcp-magic-retrospective/APPENDIX.ko.md).
