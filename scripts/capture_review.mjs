import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("No Chromium browser found");
  process.exit(1);
}

const outDir = path.resolve(process.cwd(), ".impeccable/review");
fs.mkdirSync(outDir, { recursive: true });

const url = process.env.CAPTURE_URL || "http://localhost:3030";

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  // Desktop 1440
  const desktopPage = await browser.newPage();
  await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await desktopPage.goto(url, { waitUntil: "networkidle0" });
  await desktopPage.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  await desktopPage.screenshot({
    path: path.join(outDir, "desktop.png"),
    fullPage: true,
  });

  // Mobile 390
  const mobilePage = await browser.newPage();
  await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mobilePage.goto(url, { waitUntil: "networkidle0" });
  await mobilePage.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 400));
  await mobilePage.screenshot({
    path: path.join(outDir, "mobile.png"),
    fullPage: true,
  });

  console.log("Captured desktop.png and mobile.png successfully.");
} finally {
  await browser.close();
}
