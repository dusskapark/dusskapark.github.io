async page => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const scrollToTrigger = async (scene) => {
    const button = page.locator(`button[data-scene="${scene}"]`);
    await button.evaluate(el => window.scrollTo(0, window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.57));
    await page.waitForFunction(scene => document.querySelector(`button[data-scene="${scene}"]`)?.getAttribute("aria-expanded") === "true", scene);
    const cardId = await button.getAttribute("aria-controls");
    return { button, title: await page.locator(`#${cardId} h2`).textContent() };
  };

  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:3000/");
  const first = await scrollToTrigger("tstore");
  check(first.title === "T store Developer Center", "First project should open on scroll");
  const second = await scrollToTrigger("onestore");
  check(second.title === "ONE store", "Next project in the same paragraph should replace the card");
  await second.button.click();
  check(await second.button.getAttribute("aria-expanded") === "false", "Click should close the card");
  await second.button.click();
  check(await second.button.getAttribute("aria-expanded") === "true", "Click should reopen the card");
  await page.waitForFunction(() => {
    const card = document.querySelector('button[data-scene="onestore"]')?.getAttribute("aria-controls");
    const rect = card && document.getElementById(card)?.getBoundingClientRect();
    return rect && Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2) < 2;
  });
  const later = await scrollToTrigger("gdc");
  check(later.title === "LINE Game Developer Center", "A later project should open on scroll");
  check(await page.locator('a[data-scene="builderDay"]').getAttribute("href"), "Award link should remain a link");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.locator('button[data-scene="ldsg"]').focus();
  await page.waitForFunction(() => document.querySelector(".narrative-stage h2")?.textContent === "LINE Design System Global");
  check(await page.locator(".narrative-inline-scene").count() === 0, "Desktop should use the stage, not inline cards");
  return "Mobile and desktop narrative checks passed";
}
