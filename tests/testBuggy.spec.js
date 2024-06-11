import { test } from "./fixtures/fixture";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

let mockUser = {};
let defaultUser = {};

test.beforeEach(async ({ homePage }) => {
  mockUser = {
    loginName: `Snoopy${faker.number.int({ min: 0, max: 100000 })}`,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    pwd: "Buggy_2024",
    age: faker.number.int({ min: 0, max: 95 }).toString(),
    address: faker.location.streetAddress(),
    phone: faker.string.numeric({ length: { min: 6, max: 10 } }),
  };

  // This user has been created before, and it's used for easy access when needed.
  defaultUser = {
    loginName: "yolas",
    pwd: mockUser.pwd,
  };

  await homePage.load();
});

test.describe("Buggy Page", () => {
  //test.describe.configure({ retries: 2 });
  test("Should register a new user @smoke", async ({
    homePage,
    registerPage,
    page,
  }) => {
    const { loginName, firstName, lastName, pwd } = mockUser;

    await homePage.registerLink.click();
    await expect(registerPage.registerTitle).toContainText(
      "Register with Buggy Cars"
    );
    await registerPage.addUser(loginName, firstName, lastName, pwd);
    await page.screenshot({ path: "screenshots/registerNewUser.png" });
    await expect(registerPage.confirmationMessage).toBeVisible();
    await expect(registerPage.loginNameField).toBeEmpty();
    await expect(registerPage.firstNameField).toBeEmpty();
    await expect(registerPage.lastNameField).toBeEmpty();
    await expect(registerPage.passwordField).toBeEmpty();
    await expect(registerPage.confirmPasswordField).toBeEmpty();
    await expect(registerPage.registerButton).toBeEnabled();
    await expect(registerPage.cancelButton).toBeEnabled();
  });

  test("Should add additional information @regression", async ({
    homePage,
    registerPage,
    profilePage,
  }) => {
    const { loginName, firstName, lastName, pwd, age, address, phone } =
      mockUser;

    await homePage.registerLink.click();
    await registerPage.addUser(loginName, firstName, lastName, pwd);

    await expect(registerPage.confirmationMessage).toBeVisible();
    await homePage.loginUser(loginName, pwd);
    await homePage.profileOption.click();
    await profilePage.expectInitialElements(loginName, firstName, lastName);
    await profilePage.addInfo(age, address, phone);

    await expect(profilePage.successConfirmationMsg).toContainText(
      "The profile has been saved successful"
    );

    await profilePage.expectInitialElements(loginName, firstName, lastName);
    await expect(profilePage.ageField).toHaveValue(age);
    await expect(profilePage.addressField).toHaveValue(address);
    await expect(profilePage.phoneField).toHaveValue(phone);
    await expect(profilePage.genderField).not.toBeEmpty();
    await expect(profilePage.hobbyField).not.toBeEmpty();
  });

  test("Should logout from the page @regression", async ({
    homePage,
    page,
  }) => {
    await homePage.loginUser(defaultUser.loginName, defaultUser.pwd);
    await expect(homePage.logoutOption).toBeVisible();
    await homePage.logoutOption.click();
    await page
      .locator(".navbar.navbar-full.navbar-dark.bg-inverse")
      .screenshot({ path: "screenshots/logoutNavigationBar.png" });
    await homePage.expectInitialElements();
  });

  test("Should login with registered user", async ({
    homePage,
    registerPage,
  }) => {
    const { loginName, firstName, lastName, pwd } = mockUser;
    await homePage.registerLink.click();
    await registerPage.addUser(loginName, firstName, lastName, pwd);
    await homePage.loginUser(loginName, pwd);
    await expect(homePage.greetingLocator).toHaveText(`Hi, ${firstName}`);
    await expect(homePage.profileOption).toBeVisible();
    await expect(homePage.logoutOption).toBeVisible();
  });
});
