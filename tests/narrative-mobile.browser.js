async page => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  const scrollToTrigger = async (scene) => {
    const link = page.locator(`a[data-scene="${scene}"]`);
    await link.evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.57, behavior: "instant" }));
    await page.waitForFunction(scene => document.querySelector(`a[data-scene="${scene}"]`)?.classList.contains("is-active"), scene);
    const key = await link.getAttribute("data-trigger");
    return { link, title: await page.locator(`#scene-${key.split("-link-")[0]} h2`).textContent() };
  };

  await page.setViewportSize({ width: 320, height: 568 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(origin + "/");
  const first = await scrollToTrigger("tstore");
  check(first.title === "T store Developer Center", "First project should open on scroll");
  const second = await scrollToTrigger("onestore");
  check(second.title === "ONE store", "Next project in the same paragraph should replace the card");
  check(await second.link.getAttribute("href") === "/project/onestore", "Project title should be a real link");
  await second.link.click();
  await page.waitForURL("**/project/onestore");
  await page.goto(origin + "/");
  const later = await scrollToTrigger("gdc");
  check(later.title === "LINE Game Developer Center", "A later project should open on scroll");
  check(await page.locator('a[data-scene="builderDay"]').getAttribute("href"), "Award link should remain a link");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await page.locator('a[data-scene="ldsg"]').focus();
  await page.waitForFunction(() => document.querySelector(".narrative-stage h2")?.textContent === "LINE Design System Global");
  check(await page.locator(".narrative-inline-scene").count() === 0, "Desktop should use the stage, not inline cards");
  return "Mobile and desktop narrative checks passed";
}
