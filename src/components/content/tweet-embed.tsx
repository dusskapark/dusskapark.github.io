"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { EmbeddedTweet } from "react-tweet";
import type { Tweet } from "react-tweet/api";
import "react-tweet/theme.css";
import tweets from "../../../content/tweets.json";

const snapshots = tweets as unknown as Record<string, Tweet>;

/**
 * Renders a tweet from the committed build-time snapshot. If no snapshot
 * exists, the authored blockquote from the MDX is shown instead.
 */
export function TweetEmbed({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  const id = url.match(/\/status\/(\d+)/)?.[1];
  const tweet = id ? snapshots[id] : undefined;

  return (
    <div className="content-tweet">
      {tweet ? (
        <div className="content-tweet-widget">
          <EmbeddedTweet tweet={tweet} />
        </div>
      ) : (
        <>
          <div className="content-tweet-quotation">{children}</div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="content-original-link"
          >
            Read the original post
            <ArrowUpRight size={15} aria-hidden="true" />
            <span className="content-sr-only"> (opens in a new tab)</span>
          </a>
        </>
      )}
    </div>
  );
}
