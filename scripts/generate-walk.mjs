#!/usr/bin/env node
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8080";
mkdirSync("/workspace/screenshots", { recursive: true });

const browser = await chromium.launch({ args: ["--no-sandbox", "--disable-dev-shm-usage"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

async function shot(name) {
  await page.screenshot({ path: `/workspace/screenshots/${name}.png`, fullPage: false });
}

await page.goto(BASE, { waitUntil: "networkidle", timeout: 45000 });
await page.getByRole("button", { name: /quick hero/i }).click();
await page.waitForURL(/\/characters\/new/, { timeout: 15000 });
await page.waitForTimeout(500);
const heroName = (await page.locator("h1").first().textContent())?.trim() ?? "";
if (!heroName || heroName === "New adventurer") {
  errors.push(`Quick hero did not generate a name (got "${heroName}")`);
}
await shot("hero-generated");

await page.goto(`${BASE}/worlds/new?roll=1`, { waitUntil: "domcontentloaded", timeout: 45000 });
await page.waitForTimeout(700);
if (page.url().includes("/login")) {
  errors.push("Navigating to worlds/new redirected to login");
}
const worldName = (await page.locator("h1").first().textContent())?.trim() ?? "";
if (!worldName || worldName === "New campaign") {
  errors.push(`Rolled world had no name (got "${worldName}")`);
}
await shot("world-generated");

await page.getByRole("button", { name: /keep world/i }).first().click();
await page.waitForTimeout(500);
if (!page.url().includes("/login")) {
  errors.push(`Keep world as guest should send to login, landed on ${page.url()}`);
}

await page.goto(`${BASE}/characters/new`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(300);
await page.getByRole("button", { name: /roll 3d6/i }).click();
await page.waitForTimeout(200);
await page.getByRole("button", { name: /use the array/i }).click();
await page.waitForTimeout(150);
await shot("hero-array");

await browser.close();

const unique = [...new Set(errors.filter((e) => !/favicon|Failed to load resource/i.test(e)))];
console.log(JSON.stringify({ ok: unique.length === 0, heroName, worldName, errors: unique }, null, 2));
process.exit(unique.length === 0 ? 0 : 1);
