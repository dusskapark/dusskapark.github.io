async page => {
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const origin = new URL(page.url()).origin;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin + "/");

  for (const [scene, title] of [["grabConsole", "Grab Console"], ["grabData", "내부 데이터 플랫폼"]]) {
    const trigger = page.locator(`button[data-scene="${scene}"]`);
    check((await trigger.getAttribute("aria-label")).includes("비공개 프로젝트"), `${scene}: missing accessible confidentiality label`);
    check(await trigger.locator(".narrative-trigger-lock").count() === 1, `${scene}: missing lock icon`);
    await trigger.focus();
    await page.waitForFunction(title => document.querySelector(".narrative-stage h2")?.textContent === title, title);
    const card = page.locator(".narrative-stage .narrative-scene");
    check(await card.locator('[data-confidential-media] img[alt="Grab"]').count() === 1, `${scene}: missing Grab icon`);
    check(await card.locator('[data-confidential-media] img[alt="Figma"]').count() === 1, `${scene}: missing Figma icon`);
    for (const name of ["Grab", "Figma", "React", "Claude Code", "Codex"]) {
      const icon = card.locator(`[data-confidential-media] img[alt="${name}"]`);
      check(await icon.count() === 1, `${scene}: missing ${name} icon`);
      check(await icon.evaluate(async image => { await image.decode(); return image.naturalWidth > 0; }), `${scene}: ${name} icon did not load`);
    }
    check(await card.locator(".narrative-scene-links a").count() === 0, `${scene}: private project must not have a fabricated detail link`);
  }

  const naver = page.locator('a[data-scene="naver"]');
  check(await naver.getAttribute("href") === "/project/naver-now", "NAVER's existing public case-study link must remain available");
  check(await naver.locator(".narrative-trigger-lock").count() === 1, "NAVER trigger needs a lock icon");
  await naver.focus();
  await page.waitForFunction(() => document.querySelector(".narrative-stage h2")?.textContent === "NAVER NOW & TV");
  check(await page.locator('.narrative-stage [data-confidential-media] img[src="/images/projects/2022-naver-now/Portfolio.008.png"]').count() === 1, "NAVER should use its hero image");
  check(await page.locator(".narrative-stage video").count() === 0, "NAVER should not autoplay its former video");

  await page.setViewportSize({ width: 320, height: 568 });
  await page.reload();
  for (const [scene, title] of [["grabConsole", "Grab Console"], ["grabData", "내부 데이터 플랫폼"]]) {
    const trigger = page.locator(`button[data-scene="${scene}"]`);
    await trigger.evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.57, behavior: "instant" }));
    await page.waitForFunction(scene => document.querySelector(`button[data-scene="${scene}"]`)?.closest(".narrative-paragraph")?.querySelector(".narrative-inline-scene h2"), scene);
    const card = trigger.locator("xpath=ancestor::div[contains(@class, 'narrative-paragraph')]").locator(".narrative-inline-scene");
    check(await card.locator("h2").textContent() === title, `${scene}: wrong mobile scene`);
    check(await card.locator("[data-confidential-media]").count() === 1, `${scene}: missing mobile confidential media`);
    check(await card.locator(".confidential-media-brands").evaluate(group => {
      const outer = group.closest("[data-confidential-media]").getBoundingClientRect();
      return [...group.querySelectorAll(".confidential-brand")].every(item => {
        const rect = item.getBoundingClientRect();
        return rect.left >= outer.left && rect.right <= outer.right;
      });
    }), `${scene}: mobile icons overflow`);
  }
  await page.getByRole("button", { name: "English" }).click();
  await page.locator('button[data-scene="grabConsole"]').focus();
  check((await page.locator('button[data-scene="grabConsole"]').getAttribute("aria-label")).includes("confidential project"), "English confidentiality label is missing");
  return "Confidential Grab and NAVER scenes passed on desktop and mobile";
}
