async page => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  const positionWord = async (word, offset) => {
    await word.evaluate((element, offset) => {
      const top = window.scrollY + element.getBoundingClientRect().top;
      window.scrollTo({ top: top - window.innerHeight * 0.58 + offset, behavior: "instant" });
    }, offset);
    await settle();
  };
  const progress = word => word.evaluate(element => Number.parseFloat(getComputedStyle(element).getPropertyValue("--read")));

  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "none" });
    await page.goto(origin + "/");
    await page.evaluate(() => document.fonts.ready);
    await page.waitForSelector('.narrative-story[data-reading-reveal="active"]');
    const word = page.locator(".narrative-paragraph").nth(3).locator(".narrative-word").first();
    await positionWord(word, -120);
    const before = await progress(word);
    const beforeOpacity = await word.locator(".narrative-word-reveal").evaluate(element => Number(getComputedStyle(element).opacity));
    await positionWord(word, 120);
    const after = await progress(word);
    const afterOpacity = await word.locator(".narrative-word-reveal").evaluate(element => Number(getComputedStyle(element).opacity));
    await positionWord(word, -120);
    const reversed = await progress(word);
    check(after - before > 80, `${viewport.width}px: scrolling down should reveal the word`);
    check(Math.abs(reversed - before) < 2, `${viewport.width}px: scrolling up should restore its earlier state`);
    check(afterOpacity - beforeOpacity > 0.8, "Foreground word opacity should follow the scroll position");
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + "/");
  const project = page.locator('a[data-scene="tstore"]');
  check(await project.getAttribute("href") === "/project/tstore", "Project title must remain a navigable link");
  await project.focus();
  await page.waitForFunction(() => document.querySelector(".narrative-stage h2")?.textContent === "T store Developer Center");
  check(await project.locator(".narrative-dia-text").evaluate(element => getComputedStyle(element).backgroundImage.includes("linear-gradient")), "Active project title should use Dia's color sweep");
  check(await page.locator('button[data-scene]:not([data-scene="grabConsole"]):not([data-scene="grabData"])').count() === 0, "Public project names should remain links");
  const copy = await page.locator(".narrative-paragraph > p").first().evaluate(element => {
    const clone = element.cloneNode(true);
    clone.querySelectorAll(".narrative-word-muted").forEach(item => item.remove());
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    const normalize = text => text.replace(/\s+/g, " ").trim();
    const result = { selected: normalize(selection.toString()), expected: normalize(clone.textContent) };
    selection.removeAllRanges();
    return result;
  });
  check(copy.selected === copy.expected, "Copying text must not duplicate the faded layer");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.querySelector(".narrative-story")?.dataset.readingReveal !== "active");
  const word = page.locator(".narrative-word").first();
  check(await word.evaluate(element => getComputedStyle(element).backgroundImage === "none"), "Reduced motion must keep text readable");
  check(await word.locator(".narrative-word-reveal").evaluate(element => getComputedStyle(element).opacity === "1"), "Reduced motion must reveal the full text");
  check(await project.locator(".narrative-dia-text").evaluate(element => getComputedStyle(element).backgroundImage === "none"), "Reduced motion must disable the Dia sweep");

  await page.emulateMedia({ reducedMotion: "no-preference", forcedColors: "active" });
  await page.waitForSelector('.narrative-story[data-reading-reveal="active"]');
  check(await word.evaluate(element => getComputedStyle(element).backgroundImage === "none"), "Forced colors must keep text readable");
  check(await word.locator(".narrative-word-reveal").evaluate(element => getComputedStyle(element).opacity === "1"), "Forced colors must reveal the full text");
  await page.emulateMedia({ forcedColors: "none", contrast: "more" });
  check(await word.locator(".narrative-word-reveal").evaluate(element => getComputedStyle(element).opacity === "1"), "Increased contrast must reveal the full text");

  const context = await page.context().browser().newContext({ javaScriptEnabled: false });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto(origin + "/");
    const staticWord = staticPage.locator(".narrative-word").first();
    check(await staticWord.evaluate(element => getComputedStyle(element).backgroundImage === "none"), "Text must remain readable without JavaScript");
    check(await staticWord.locator(".narrative-word-reveal").evaluate(element => getComputedStyle(element).opacity === "1"), "No-JavaScript text must be fully visible");
  } finally {
    await context.close();
  }
  return "Desktop, mobile, reverse scroll, reduced motion, forced colors and no-JavaScript checks passed";
}
