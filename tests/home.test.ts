import { remote, Browser } from "webdriverio";
import {
  ClassicRunner,
  Eyes,
  Target,
  Configuration,
  RectangleSize,
  BatchInfo,
} from "@applitools/eyes.webdriverio";

describe("Visual Testing: Home Page", function () {
  let driver: Browser<"async">;
  let eyes: Eyes;

  beforeEach(async () => {
    const configuration = new Configuration();
    const runner = new ClassicRunner();
    const chrome = {
      desiredCapabilities: {
        browserName: "chrome",
      },
      hostname: "localhost",
      port: 9515,
    };

    driver = await remote(chrome);
    await driver.init();
    eyes = new Eyes(runner);
    configuration.setBatch(new BatchInfo("Visual Testing : Home Page Batch"));
    eyes.setConfiguration(configuration);
  });

  it("Validating Login", async () => {
    await eyes.open(driver, "Visual Testing", "Home Page", new RectangleSize(800, 600));
    await driver.url("https://demo.applitools.com");

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.url("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1.
    await eyes.check("Login Window", Target.window().fully());

    // Click the "Log in" button.
    await driver.click("#log-in");

    // Visual checkpoint #2.
    await eyes.check("App Window", Target.window().fully());

    // End the test
    eyes.close();
  });

  afterEach(async () => {
    // Close the browser
    await driver.end();

    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abort();

    // Wait and collect all test results
    const results = await eyes.getRunner().getAllTestResults(false);
    console.log(results);
    console.log(results.getAllResults());
  });
});
