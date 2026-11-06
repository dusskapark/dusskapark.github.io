async page => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(origin + "/");
  await page.locator('button[data-scene="grabConsole"]').focus();
  await page.waitForFunction(() => document.querySelector(".narrative-stage h2")?.textContent === "Grab Console");
  const scene = page.locator(".narrative-stage [data-confidential-media]");
  await page.waitForFunction(() => [...document.querySelectorAll(".narrative-stage .confidential-beam path:first-child")].length === 4 && [...document.querySelectorAll(".narrative-stage .confidential-beam path:first-child")].every(path => path.getAttribute("d")));
  check(await scene.locator('.confidential-beam[aria-hidden="true"]').count() === 4, "Beams must be decorative");
  const firstGradient = scene.locator(".confidential-beam linearGradient").first();
  const start = await firstGradient.getAttribute("x1");
  await page.waitForFunction(start => document.querySelector(".narrative-stage .confidential-beam linearGradient")?.getAttribute("x1") !== start, start);
  check(await scene.locator(".confidential-brand img").count() === 5, "All five icons must remain visible");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.querySelectorAll(".narrative-stage .confidential-beam linearGradient").length === 0);
  check(await scene.locator(".confidential-beam path").count() === 4, "Reduced motion should retain only static connection lines");

  await page.setViewportSize({ width: 320, height: 568 });
  await page.reload();
  const trigger = page.locator('button[data-scene="grabConsole"]');
  await trigger.evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.57, behavior: "instant" }));
  const card = trigger.locator("xpath=ancestor::div[contains(@class, 'narrative-paragraph')]").locator("[data-confidential-media]");
  await card.waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll('.narrative-inline-scene .confidential-beam path:first-child')].some(path => path.getAttribute("d")));
  check(await card.locator(".confidential-beam").count() === 4, "Mobile card must show four connections");
  check(await card.locator(".confidential-media-brands").evaluate(group => {
    const outer = group.closest("[data-confidential-media]").getBoundingClientRect();
    return [...group.querySelectorAll(".confidential-brand")].every(item => {
      const rect = item.getBoundingClientRect();
      return rect.left >= outer.left && rect.right <= outer.right && rect.top >= outer.top && rect.bottom <= outer.bottom;
    });
  }), "Mobile icons must stay within the media card");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForFunction(() => document.querySelector('.narrative-inline-scene .confidential-beam linearGradient'));
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.waitForFunction(() => {
    const media = document.querySelector('button[data-scene="grabConsole"]')?.closest(".narrative-paragraph")?.querySelector("[data-confidential-media]");
    return media && media.getBoundingClientRect().bottom < -200 && media.querySelectorAll("linearGradient").length === 0;
  });
  return "Animated beams, reduced motion and responsive layout passed";
}
