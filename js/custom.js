(function () {
  "use strict";

  var EMBED_TIMEOUT = 12000;
  var mutationTimer = null;
  var revealObserver = null;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function all(root, selector) {
    var scope = root || document;
    var matches = [];

    if (scope.nodeType === 1 && scope.matches(selector)) {
      matches.push(scope);
    }

    return matches.concat(Array.prototype.slice.call(scope.querySelectorAll(selector)));
  }

  function getRevealObserver() {
    if (revealObserver) {
      return revealObserver;
    }

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    return revealObserver;
  }

  function observeAnimatedElements(root) {
    var observer = getRevealObserver();

    all(root, ".gallery, .video-wrap, .image-wrap, .timeline-item, .embed-shell").forEach(function (element) {
      if (element.dataset.animateObserved === "true") {
        return;
      }

      element.dataset.animateObserved = "true";
      observer.observe(element);
    });
  }

  function initCardSlider(root) {
    if (!window.Flickity) {
      return;
    }

    all(root, ".card-wrap").forEach(function (cardWrapElement) {
      if (cardWrapElement.dataset.flickityReady === "true") {
        return;
      }

      cardWrapElement.dataset.flickityReady = "true";
      new Flickity(cardWrapElement, {
        contain: true,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        adaptiveHeight: true,
        setGallerySize: false,
        selectedAttraction: 0.05,
        freeScrollFriction: 0.1
      });
    });
  }

  function initTypeIt(root) {
    if (!window.TypeIt) {
      return;
    }

    all(root, "pre span").forEach(function (span) {
      if (span.dataset.typeitReady === "true") {
        return;
      }

      span.dataset.typeitReady = "true";
      new TypeIt(span, {
        speed: 50,
        lifeLike: true,
        cursor: false
      })
        .pause(1000)
        .go();
    });

    all(root, ".typeIt").forEach(function (element) {
      if (element.dataset.typeitReady === "true") {
        return;
      }

      element.dataset.typeitReady = "true";
      new TypeIt(element, {
        speed: 50,
        lifeLike: true
      })
        .pause(1000)
        .go();
    });
  }

  function normalizeUrl(url) {
    if (!url) {
      return "";
    }

    if (url.indexOf("//") === 0) {
      return window.location.protocol + url;
    }

    return url;
  }

  function embedLabel(type) {
    if (type === "slides") {
      return "Loading slide deck";
    }

    if (type === "video") {
      return "Loading video";
    }

    return "Loading embedded content";
  }

  function iframeType(iframe) {
    var src = (iframe.getAttribute("src") || "").toLowerCase();

    if (src.indexOf("youtube") >= 0 || src.indexOf("vimeo") >= 0) {
      return "video";
    }

    if (src.indexOf("slideshare") >= 0) {
      return "slides";
    }

    return "frame";
  }

  function isTwitterIframe(iframe) {
    var src = (iframe.getAttribute("src") || "").toLowerCase();
    var id = (iframe.getAttribute("id") || "").toLowerCase();

    return id.indexOf("twitter-widget") === 0 || src.indexOf("twitter.com") >= 0 || src.indexOf("x.com") >= 0;
  }

  function ratioFromIframe(iframe) {
    var width = parseFloat(iframe.getAttribute("width"));
    var height = parseFloat(iframe.getAttribute("height"));

    if (width > 0 && height > 0) {
      return width + " / " + height;
    }

    return "16 / 9";
  }

  function ensureFramePlaceholder(shell, type, sourceUrl) {
    var existing = shell.querySelector(":scope > .embed-shell__placeholder");

    if (existing) {
      return existing;
    }

    var placeholder = document.createElement("div");
    placeholder.className = "embed-shell__placeholder";
    placeholder.innerHTML =
      '<div class="embed-shell__pulse"></div>' +
      '<div class="embed-shell__label">' + embedLabel(type) + "</div>";

    if (sourceUrl) {
      var link = document.createElement("a");
      link.className = "embed-shell__fallback-link";
      link.href = normalizeUrl(sourceUrl);
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Open embed";
      placeholder.appendChild(link);
    }

    shell.insertBefore(placeholder, shell.firstChild);
    return placeholder;
  }

  function markFrameLoaded(shell) {
    if (!shell) {
      return;
    }

    shell.classList.remove("is-loading", "is-fallback");
    shell.classList.add("is-loaded");
  }

  function markFrameFallback(shell) {
    if (!shell || shell.classList.contains("is-loaded")) {
      return;
    }

    shell.classList.remove("is-loading");
    shell.classList.add("is-fallback");
  }

  function wrapLooseIframe(iframe, type) {
    var shell = document.createElement("div");
    shell.className = "embed-shell embed-shell--frame embed-shell--" + type + " is-loading";
    shell.style.setProperty("--embed-ratio", ratioFromIframe(iframe));

    iframe.parentNode.insertBefore(shell, iframe);
    shell.appendChild(iframe);
    return shell;
  }

  function enhanceIframes(root) {
    all(root, ".post__content iframe").forEach(function (iframe) {
      if (isTwitterIframe(iframe)) {
        return;
      }

      if (iframe.dataset.embedEnhanced === "true") {
        return;
      }

      iframe.dataset.embedEnhanced = "true";
      iframe.setAttribute("loading", "lazy");

      var type = iframeType(iframe);
      var shell = iframe.closest(".video");

      if (shell) {
        shell.classList.add("embed-shell", "embed-shell--frame", "embed-shell--" + type, "is-loading");
      } else {
        shell = wrapLooseIframe(iframe, type);
      }

      ensureFramePlaceholder(shell, type, iframe.getAttribute("src"));

      iframe.addEventListener("load", function () {
        markFrameLoaded(shell);
      });

      window.setTimeout(function () {
        markFrameFallback(shell);
      }, EMBED_TIMEOUT);
    });
  }

  function resetTwitterRuntime() {
    all(document, 'script[src*="platform.twitter.com/"], script[src*="platform.x.com/"]').forEach(function (script) {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });

    all(
      document,
      'iframe[id="rufous-sandbox"], iframe[src*="platform.twitter.com/widgets/widget_iframe"], iframe[src*="platform.x.com/widgets/widget_iframe"]'
    ).forEach(function (iframe) {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    });

    try {
      delete window.twttr;
    } catch (error) {
      window.twttr = undefined;
    }

    try {
      delete window.__twttr;
    } catch (error) {
      window.__twttr = undefined;
    }

    try {
      delete window.__twttrll;
    } catch (error) {
      window.__twttrll = undefined;
    }
  }

  function ensureTwitterScript() {
    var twttr = window.twttr || {};

    window.twttr = twttr;
    twttr._e = twttr._e || [];
    twttr.ready = twttr.ready || function (callback) {
      twttr._e.push(callback);
    };

    if (document.getElementById("twitter-wjs")) {
      return twttr;
    }

    var script = document.createElement("script");
    script.id = "twitter-wjs";
    script.async = true;
    script.charset = "utf-8";
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    return twttr;
  }

  function hasTwitterWidgetApi() {
    return !!(window.twttr && window.twttr.widgets && window.twttr.widgets.load);
  }

  function renderedTweetCount() {
    return all(document, 'iframe[id^="twitter-widget-"]').filter(function (iframe) {
      var src = iframe.getAttribute("src") || "";
      return src.indexOf("/embed/Tweet.html") >= 0;
    }).length;
  }

  function renderTwitterWidgets(root) {
    if (document.getElementById("twitter-wjs") && !hasTwitterWidgetApi()) {
      resetTwitterRuntime();
    }

    var twttr = ensureTwitterScript();

    function load(api) {
      api = api || window.twttr;

      if (api && api.widgets && api.widgets.load) {
        api.widgets.load(root || document);
      }
    }

    if (hasTwitterWidgetApi()) {
      load(twttr);
    } else {
      twttr.ready(load);
    }
  }

  function enhanceTweets(root) {
    var tweets = all(root, "blockquote.twitter-tweet").filter(function (tweet) {
      return tweet.dataset.twitterRenderRequested !== "true";
    });

    if (!tweets.length) {
      return;
    }

    tweets.forEach(function (tweet) {
      tweet.dataset.twitterRenderRequested = "true";
    });

    renderTwitterWidgets(root);

    window.setTimeout(function () {
      var pendingTweets = tweets.filter(function (tweet) {
        return document.documentElement.contains(tweet);
      });

      if (pendingTweets.length && renderedTweetCount() < tweets.length) {
        resetTwitterRuntime();
        renderTwitterWidgets(root);
      }
    }, 5000);
  }

  function enhancePage(root) {
    var scope = root || document;

    observeAnimatedElements(scope);
    initCardSlider(scope);
    initTypeIt(scope);
    enhanceIframes(scope);
    enhanceTweets(scope);
    observeAnimatedElements(scope);
  }

  function scheduleEnhance() {
    window.clearTimeout(mutationTimer);
    mutationTimer = window.setTimeout(function () {
      enhancePage(document);
    }, 80);
  }

  function watchAjaxContent() {
    var page = document.querySelector(".page");

    if (!page || page.dataset.embedObserverReady === "true") {
      return;
    }

    page.dataset.embedObserverReady = "true";

    new MutationObserver(function (mutations) {
      var hasNewNodes = mutations.some(function (mutation) {
        return mutation.addedNodes && mutation.addedNodes.length;
      });

      if (hasNewNodes) {
        scheduleEnhance();
      }
    }).observe(page, { childList: true, subtree: true });
  }

  ready(function () {
    enhancePage(document);
    watchAjaxContent();
  });

  window.refreshEmbeddedContent = function () {
    enhancePage(document);
  };
})();
