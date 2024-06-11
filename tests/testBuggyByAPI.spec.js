import { test } from "./fixtures/fixture";
import { expect, request } from "@playwright/test";
import { dataAge, dataAddress, dataPhone } from "./setup/utilities";

test.beforeEach(async ({ homePage }) => {
  await homePage.load();
});

// test("Should logout from the page ", async ({ homePage, page, request }) => {
//   // should login by API TOKEN
//   const response = await request.post(
//     "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token",
//     {
//       form: {
//         grant_type: "password",
//         username: "yolas",
//         password: "Buggy_2024",
//       },
//     }
//   );
//   const responseBody = await response.json();
//   //console.log(responseBody);
//   const accessToken = responseBody.access_token;
//   //console.log(accessToken);

//   //review that this get is showing the CURRENT API is fully authenticated
//   const loginCheck = await request.get(
//     "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/current",
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   const responseLoginCheck = await loginCheck.json();
//   console.log(responseLoginCheck);
//   expect(loginCheck.status()).toEqual(200);

//   //updating profile
//   // const profileUpdating = await request.put(
//   //   "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users/profile",
//   //   {
//   //     data: {
//   //       username: "yolas",
//   //       firstName: "Wily",
//   //       lastName: "Winstor",
//   //       gender: "Female",
//   //       age: "29",
//   //       address: "123 albany",
//   //       phone: "1111111111",
//   //       hobby: "Biking",
//   //       currentPassword: "",
//   //       newPassword: "",
//   //       newPasswordConfirmation: "",
//   //     },
//   //     headers: { Authorization: `Bearer ${accessToken}` },
//   //   }
//   // );

//   // const responseProfileUpdating = await profileUpdating.json();
//   // console.log(responseProfileUpdating);

//   //await expect(homePage.logoutOption).toBeVisible();
//   //   await homePage.logoutOption.click();
//   //   await page
//   //     .locator(".navbar.navbar-full.navbar-dark.bg-inverse")
//   //     .screenshot({ path: "screenshots/logoutNavigationBar.png" });
//   //   await homePage.expectInitialElements();
// });

test("should logout", async ({ homePage, page }) => {
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
  await page.getByRole("link", { name: "Logout" }).click();
  await page
    .locator(".navbar.navbar-full.navbar-dark.bg-inverse")
    .screenshot({ path: "screenshots/logoutNavigationBar.png" });
  await homePage.expectInitialElements();
});

test("Should add additional information after user is login ", async ({
  page,
  profilePage,
}) => {
  await page.locator('a:has-text("Profile")').click();
  await profilePage.expectInitialElements(
    process.env.USERNAME,
    process.env.FIRST_NAME,
    process.env.LAST_NAME
  );
  await profilePage.addInfo(dataAge, dataAddress, dataPhone);

  await expect(profilePage.successConfirmationMsg).toContainText(
    "The profile has been saved successful"
  );

  await profilePage.expectInitialElements(
    process.env.USERNAME,
    process.env.FIRST_NAME,
    process.env.LAST_NAME
  );
  await expect(profilePage.ageField).toHaveValue(dataAge);
  await expect(profilePage.addressField).toHaveValue(dataAddress);
  await expect(profilePage.phoneField).toHaveValue(dataPhone);
  await expect(profilePage.genderField).not.toBeEmpty();
  await expect(profilePage.hobbyField).not.toBeEmpty();
});

test("Should show the banner when user is Login", async ({ page }) => {
  await expect(page.locator("span.nav-link.disabled")).toHaveText(
    `Hi, ${process.env.FIRST_NAME}`
  );
  await expect(page.locator('a:has-text("Profile")')).toBeVisible();
  await expect(page.getByRole("link", { name: "Logout" })).toBeVisible();
});
