"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type TwitterWidgets = {
  widgets: {
    createTweet: (
      id: string,
      container: HTMLElement,
      options?: Record<string, unknown>,
    ) => Promise<HTMLElement | undefined>;
  };
};

let widgetsPromise: Promise<TwitterWidgets> | undefined;

function loadWidgets() {
  if (widgetsPromise) return widgetsPromise;
  widgetsPromise = new Promise<TwitterWidgets>((resolve, reject) => {
    const twitterWindow = window as Window & { twttr?: TwitterWidgets };
    if (twitterWindow.twttr?.widgets) {
      resolve(twitterWindow.twttr);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.dataset.portfolioTweets = "true";
    const timeout = window.setTimeout(
      () => reject(new Error("Tweet loading timed out")),
      12000,
    );
    script.onload = () => {
      window.clearTimeout(timeout);
      if (twitterWindow.twttr?.widgets) resolve(twitterWindow.twttr);
      else reject(new Error("Tweet widgets unavailable"));
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("Tweet widgets unavailable"));
    };
    document.head.appendChild(script);
  });
  return widgetsPromise;
}

export function TweetEmbed({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const container = widgetRef.current;
    const id = url.match(/\/status\/(\d+)/)?.[1];
    if (!root || !container || !id) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        void loadWidgets()
          .then(async (twitter) => {
            if (cancelled) return;
            const tweet = await twitter.widgets.createTweet(id, container, {
              dnt: true,
              conversation: "none",
              align: "center",
            });
            if (!cancelled && tweet) setLoaded(true);
          })
          .catch(() => {
            // The original quotation is server-rendered and remains readable when
            // third-party scripts are blocked, unavailable, or disabled.
          });
      },
      { rootMargin: "200px" },
    );
    observer.observe(root);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [url]);

  return (
    <div className="content-tweet" ref={rootRef}>
      <div ref={widgetRef} className="content-tweet-widget" />
      <div className="content-tweet-quotation" hidden={loaded}>
        {children}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="content-original-link"
      >
        Read the original post ↗
      </a>
    </div>
  );
}
