---
title: "How Far Can a Product Designer Build with Codex?"
subtitle: "A solo product builder case study: from web Rider MVP to native Rider-Driver platform"
date: 2026-06-08 00:00:00
description: "I built a real rider-driver shuttle platform with Codex as my development partner, moving from a web Rider MVP to native Rider and Driver apps, store readiness, and launch storytelling."
featured_image: "2026-rider-driver-codex/05-rider-driver-story-hero-v3.webp"
gallery_images: "2026-rider-driver-codex/05-rider-driver-story-hero-v3.webp"
team: Joo Hyung Park (Jude), with Codex as development partner
role: Product Designer, Solo Product Builder
visible: false
highlight_first: true
---

I wanted to know how far a product designer could build when AI became part of the actual product development loop.

Not a prototype. Not a design exploration. Not a polished demo that stops before the hard parts.

I wanted to see whether I could take a real problem, shape it into a working service, connect the server and database, build web and native apps, validate the flows on real devices, prepare store releases, and even produce the final promotional story myself.

So I built a rider-driver shuttle platform with Codex.

![Rider-driver shuttle platform overview](/images/projects/2026-rider-driver-codex/05-rider-driver-story-hero-v3.webp)

The product started with a simple problem at a Korean church in Singapore. Riders needed more confidence about routes, stops, boarding, and arrival. Operators needed less manual coordination. I first built a Rider experience around route lookup, QR check-in, notifications, admin flows, and native apps. Then I discovered a deeper system gap: the Rider app alone could not create arrival signals when nobody boarded at a stop. That led to a second iteration, a separate Driver app that made the shuttle itself the signal source.

The result was not just an app. It became a small operating system for shuttle movement: Rider app, Driver app, server, database, maps, check-ins, location updates, notifications, app links, store prep, and launch communication.

## The Frame I Used

I did not treat this as a one-shot AI coding task. I treated it like a product development loop:

**Problem -> Hypothesis -> Build -> Validate -> Learn -> Iterate**

That loop matters because the most important decisions did not come from code generation. They came from repeatedly finding where the product model was still wrong.

There were two major iterations:

1. **Web Rider MVP to native Rider apps**
   I first used web and LINE LIFF to validate the product flow quickly. Once the flow worked, I moved the Rider experience into native iOS and Android apps for better access, push notifications, deep links, maps, and platform fit.

2. **Rider-only product to Rider-Driver platform**
   I first assumed QR check-in could work as an arrival signal. Then I learned that empty stops create no event. To solve that, I built separate Driver apps so the bus itself could publish location and status.

Those two iterations are the core of the case study. They show the difference between building screens and changing the product system.

## Why I Wanted to Build This

The shuttle problem was real, but my motivation was bigger than the shuttle.

As a product designer, I have always been close to code. I could build prototypes, touch front-end code, and speak with engineers in practical terms. But I still felt a boundary around the full product loop. Server logic, data modeling, native apps, deployment, store review, analytics, crash reporting, and operational QA often belonged to another side of the process.

Codex made me want to test that boundary.

I wanted to learn whether a designer could own more than problem definition and interface design. Could I reason about API contracts? Could I build a database-backed service? Could I translate a working web product into native iOS and Android experiences? Could I debug real-device issues? Could I prepare a store release? Could I make the final communication assets too?

In short, I wanted to find out what kind of product designer I could become when I was no longer waiting for every handoff.

The project became a playground for that question. It gave me a real user problem, real operational constraints, real platform limits, and enough complexity to force learning.

## Problem Discovery

My family attends a Korean church in Singapore, and the church operates a weekend shuttle. The shuttle is generous and useful, especially in a city where transport costs add up quickly. But the actual rider experience still depended heavily on scattered manual updates.

Routes were shared through PDFs or map links. Stop information lived across messages. Arrival updates depended on people voluntarily posting in a KakaoTalk group chat. If someone wrote "the bus just passed this stop," everyone benefited. If nobody posted, riders waited with uncertainty.

![KakaoTalk arrival updates before the product](/images/projects/2026-rider-driver-codex/06-driver-context.webp)

![Route information shared as manual documents](/images/projects/2026-rider-driver-codex/07-kakao-arrival-chat.webp)

![Route map context before the dedicated product flow](/images/projects/2026-rider-driver-codex/08-codex-mobile-remote-setup.png)

From the rider side, the pain was uncertainty:

- Where should I wait?
- Which route should I take?
- Has the shuttle already passed?
- Is anyone else boarding here?

From the operator side, the pain was manual coordination:

- Which stops are actually used?
- How many people boarded?
- Where is demand increasing or disappearing?
- How do we reduce repeated chat-based coordination?

The first product definition was not "make a prettier shuttle page." It was:

> Help riders and operators see the same operating signals, with less manual coordination.

That definition shaped the first iteration.

## Iteration 1: From Web Rider MVP To Native Rider Apps

### Hypothesis

My first hypothesis was that a web-based Rider flow could validate the core product quickly.

LINE LIFF was a practical starting point. It could wrap login, user context, web entry, links, QR check-in, and messaging into one flow without requiring a full native app from day one. It also kept early cost low, which mattered because this was a goodwill-driven church service, not a commercial product.

The goal was speed and validation:

- Can riders check routes and stops?
- Can QR check-in create a boarding record?
- Can operators see route, stop, and boarding data?
- Can notifications connect the service flow?
- Can the API and database model support the product?

### Build

I built the first version as a web and API project.

The stack was intentionally pragmatic: Next.js for web and API routes, Neon Postgres for the database, Prisma for the data layer, Vercel for deployment, LINE LIFF for the first entry point, and LINE Messaging API for notifications.

The first working loop included route lookup, stop information, QR check-in, admin management, authentication, and operational health checks.

![LINE LIFF Rider validation flow](/images/projects/2026-rider-driver-codex/01-liff-rider-flow.webp)

The most important artifact at this stage was not the UI. It was the API contract.

Once the route, stop, user, check-in, and notification flows were expressed as API behavior, the product became easier to move across surfaces. The web app was no longer just a screen. It became a working blueprint.

![API contract documented with Swagger](/images/projects/2026-rider-driver-codex/02-swagger-api-contract.png)

### Validate

The web version proved that the product flow could work. Riders could see route and stop information. QR check-in could create structured records. Operators could start seeing the shuttle operation as data instead of a long chat history.

But validation also exposed a product access problem.

LINE was useful for the first implementation, but it was not the most natural channel for this user group. In Singapore, WhatsApp is more common. Among Korean users, KakaoTalk is more familiar. A service trapped inside one messenger was not the most accessible long-term form.

The learning was clear:

> Web validated the flow. Native apps were needed to make the product easier to access and more platform-native.

### Learn And Iterate

So I moved the Rider experience into native apps.

For iOS, I used SwiftUI, native maps, push notifications, and deep links. I also used the project as a chance to experiment with newer native design language ideas, including glass-like interface treatments where they made sense.

![Native iOS Rider app](/images/projects/2026-rider-driver-codex/03-ios-rider-app.png)

For Android, I used Kotlin, Jetpack Compose, Material 3 Expressive, Google Maps Compose, Firebase, and FCM. The goal was not to copy the web UI. It was to translate the same validated product flow into a more natural Android experience.

![Native Android Rider app](/images/projects/2026-rider-driver-codex/04-android-rider-app.png)

This iteration taught me one of the most important lessons of the project:

> A working web product can be more useful than a static spec when building with Codex.

The web app gave Codex concrete context: information architecture, state transitions, API behavior, edge cases, and interaction flow. When I moved to native apps, I was not asking Codex to imagine a product from scratch. I was asking it to translate a working system into platform-specific experiences.

That changed the quality of the collaboration.

## Iteration 2: From Rider App To Rider-Driver Platform

### Hypothesis

After the Rider app was working, I believed QR check-in could also behave like an arrival signal.

If someone scanned a QR code at a stop, that meant the shuttle had reached that stop. In theory, that event could help other riders understand where the bus was.

It was a useful hypothesis, but it was incomplete.

### Validate

Feedback from people who understood the shuttle operation made the limitation obvious.

On some weekends, especially during holidays or school breaks, ridership changes a lot. Some stops may have no riders at all. If nobody boards at a stop, nobody scans a QR code. If nobody scans, the system receives no event.

That meant the Rider app could only tell part of the story.

QR check-in worked as a boarding signal. It did not work as a complete arrival signal.

### Learn

The missing event changed the product architecture.

The question was no longer:

> How do we make riders check in?

It became:

> How does the shuttle itself become a trusted signal source?

The answer was a Driver app.

Rider apps should not carry unnecessary background location responsibility. Operators should not rely on riders to create every operational event. The driver, or the shuttle device, needed a simple way to publish location and route status.

This was the second major product iteration: from Rider-only logic to a Rider-Driver platform.

### Build

I built separate Driver apps for iOS and Android. The Driver app sends location and status updates. The server updates the active route state. The Rider app reflects those updates through maps, stop status, and notifications. I also added a test-drive mode so I could validate the full flow without needing a real shuttle trip every time.

This was the moment when the product became more than a set of user-facing screens. It became a connected system:

- Driver app sends route and location signals.
- Server stores and distributes active shuttle status.
- Rider app shows map and stop updates.
- QR check-in continues to record actual boarding.
- Notifications and deep links connect the experience.
- Test-drive mode makes repeated validation possible.

![Driver app and Rider map validation loop](/images/projects/2026-rider-driver-codex/15-driver-test-run.png)

This iteration is the part of the project I am proudest of because it was not cosmetic. I discovered a structural gap and changed the system around it.

That is the kind of product work I want to do more of: finding where the current model fails, then moving quickly enough to test a better one.

## Building With Codex

Codex was not a magic button. It was a development partner that made the scope more reachable.

I used it across the whole project loop:

- planning the feature scope
- breaking large product goals into small tasks
- defining API contracts
- implementing server routes and data flows
- connecting web and native clients
- debugging logs and build failures
- checking simulator and emulator behavior
- preparing native permissions, app links, push flows, and store details
- turning ambiguous failures into smaller, testable problems

The most useful pattern was not one perfect prompt. It was a repeated loop:

> Ask for a small step, run it locally, inspect the signal, reduce the failure, and ask again.

When I knew what signal to check, Codex became much more effective. On the server, the signal was API response shape, health checks, and database state. On the web, it was UI, console logs, and network requests. On native apps, it was build success, simulator behavior, real-device behavior, push registration, deep links, and crash logs.

Codex helped me move faster, but the product judgment stayed with me. I still had to decide what mattered, what to cut, when to switch platforms, when the current hypothesis was wrong, and how to validate the next one.

## The Mobile Episode

The strangest and most memorable part happened away from my desk.

I was in Korea, spending long hours in a hospital room while helping care for my father. My development environment was still on a Mac mini in Singapore. I did not have the normal desktop setup where I could keep multiple apps, logs, simulators, and browser windows open.

But the Driver app work could not simply wait.

So I used ChatGPT mobile as the control surface. Codex worked in the remote Mac mini environment, and I reviewed progress from my phone. I spoke tasks into the mobile app, checked summaries and screenshots, and kept the product loop moving.

![Codex mobile remote setup](/images/projects/2026-rider-driver-codex/09-codex-mobile-mac-mini.png)

![Remote Mac mini development from mobile](/images/projects/2026-rider-driver-codex/10-voice-coding-screen-01.png)

The phone was not the development machine. It was the cockpit.

The hard part was not typing code. The hard part was verification. On desktop, I could quickly build, inspect, compare, and give feedback. On mobile, every feedback loop became slower. I had to depend more on Codex to create task lists, read logs, summarize failures, and verify each step before moving on.

![Voice coding with Codex mobile](/images/projects/2026-rider-driver-codex/11-voice-coding-screen-02.png)

![Continuing the product loop from mobile](/images/projects/2026-rider-driver-codex/13-simulator-feedback-loop-01.png)

This changed how I worked. I became more deliberate about asking Codex to define success criteria before implementation. I asked it to show what it checked, what failed, and what the next smallest fix should be. That made the mobile workflow possible, even when it was uncomfortable.

The lesson was not "now I can code from a phone."

The lesson was:

> A product builder can keep momentum in imperfect conditions if the validation loop is explicit enough.

![Codex mobile thread history for the product work](/images/projects/2026-rider-driver-codex/12-voice-coding-moment.png)

![Codex code changes and task checklist from mobile](/images/projects/2026-rider-driver-codex/14-simulator-feedback-loop-02.png)

![Simulator screenshot review during mobile workflow](/images/projects/2026-rider-driver-codex/15-driver-test-run.png)

## Launch And Storytelling

The launch work reminded me that shipping is not just uploading a build.

There were store listings, privacy details, permission explanations, app links, review notes, test accounts, real-device checks, analytics, performance monitoring, Crashlytics, and push notification behavior. Store preparation became a practical QA checklist. It forced hidden assumptions into the open.

I also made the promotional video myself.

That mattered to me because a product is not finished when the code compiles. People still need to understand what changed, why it matters, and how to use it. Owning the launch story was part of owning the product.

<!-- PROMO_VIDEO_SLOT: add images/projects/2026-rider-driver-codex/17-promo-video.mp4 or an external embed when the promotional video file or URL is available. -->

![The screen got smaller, but the workflow did not](/images/projects/2026-rider-driver-codex/16-driver-app-final.jpeg)

By the end, I had built and prepared a real multi-surface product: server, database, web, admin, iOS Rider app, Android Rider app, iOS Driver app, Android Driver app, store readiness, and launch communication.

That was far beyond the kind of project I used to imagine doing alone.

## What I Learned

This project changed how I think about being a product designer.

I do not think every designer needs to become a traditional full-stack engineer. That is not the point. The point is that AI makes it more realistic for a technically curious designer to own more of the product loop.

But owning more of the loop requires more than prompting.

It requires understanding:

- how a product problem becomes a system model
- how APIs define contracts across surfaces
- how web validation can become a native app blueprint
- how real-device behavior differs from simulator behavior
- how store requirements expose operational gaps
- how analytics and crash logs become product signals
- how to turn vague failure into a smaller testable sentence

Codex expanded my reach, but it did not remove the need for judgment. If anything, it made judgment more important. The faster I could build, the more important it became to know what I was testing and why.

That is the builder version of product design I want to keep practicing.

Not just designing the ideal flow. Not just handing off screens. Not just asking AI to generate code.

Finding a real problem, forming a hypothesis, building the smallest useful system, validating it, learning where it fails, and iterating quickly enough to make the product truer.

That is how far I wanted to see if I could go with Codex.

And now I know I can go much further than I expected.

## References

- Original Korean post: [Product designer with Codex](https://dusskapark.medium.com/%ED%94%84%EB%A1%9C%EB%8D%95%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B4%EB%84%88%EB%8A%94-codex%EB%A1%9C-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C-d725a9be4d3e)
- Original Korean post: [Mobile voice coding with Codex](https://dusskapark.medium.com/codex-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9E%85%EC%BD%94%EB%94%A9%EB%A7%8C%EC%9C%BC%EB%A1%9C-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C-e6a068bb4218)
- Planning sample: [Gist](https://gist.github.com/dusskapark/c56f110aa513bf0ade4bc326d5228c10)
