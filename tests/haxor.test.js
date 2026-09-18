import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Haxor App Test Suite", () => {
  it("should load the production application", async (context) => {
    const testdriver = TestDriver(context);

    // Target the production URL discovered in the repository readme
    await testdriver.provision.chrome({
      url: process.env.TARGET_URL || "https://app.haxor.sh",
    });

    const isLoaded = await testdriver.assert("the webpage is loaded");
    expect(isLoaded).toBeTruthy();
  });

  it("should run a sample smoke test", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "https://example.com",
    });

    const heading = await testdriver.find("heading");
    expect(heading).toBeTruthy();

    const isVisible = await testdriver.assert("the page has loaded successfully");
    expect(isVisible).toBeTruthy();
  });
});
