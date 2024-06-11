import { test as setup } from "@playwright/test";
import user from "../../.auth/user.json"; // we need the "user file"
import fs from "fs"; // this library for interacting with file systems

const authFile = ".auth/user.json"; // in this folder/file will be saved "Authentication State = TOKEN"

setup("authentication", async ({ request }) => {
  // AUTHENTICATION by FE
  // await page.goto("https://buggy.justtestit.org/");
  // await page.getByPlaceholder("Login").fill("yolas");
  // await page
  //   .getByRole("navigation")
  //   .locator('input[name="password"]')
  //   .fill("Buggy_2024");
  // await page.getByRole("button", { name: "Login" }).click();
  // await page.waitForResponse(
  //   "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/current"
  // );
  // await page.waitForSelector('a:has-text("Logout")');

  // await page.context().storageState({ path: authFile });

  // AUTHENTICATION by API

  const response = await request.post(
    "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token",
    {
      form: {
        grant_type: "password",
        username: process.env.USERNAME,
        password: process.env.PWD,
      },
    }
  );
  //console.log(process.env.USERNAME, process.env.PWD);
  const responseBody = await response.json();
  //console.log(responseBody);
  const accessToken = responseBody.access_token;
  //console.log(accessToken)

  //then call the User object and assigned the token value that we get from API
  user.origins[0].localStorage[0].value = accessToken;

  //then save those changes in the file
  fs.writeFileSync(authFile, JSON.stringify(user));
});
