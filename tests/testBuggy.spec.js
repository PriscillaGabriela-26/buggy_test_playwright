const { test, expect } = require("@playwright/test");
const { HomePage } = require("./pages/home.js");
const { ProfilePage } = require("./pages/profile.js");
const { RegisterPage } = require("./pages/register.js");

let homePage;
let registerPage;
let profilePage;
let mockUser = {};
let defaultUser = {};

test.beforeEach(async ({ page }) => {
  const randomNumber = Date.now();
  mockUser = {
    loginName: `Snoopy${randomNumber}`,
    firstName: "Snoopy",
    lastName: "RedHouse",
    pwd: "Buggy_2024",
    age: Math.floor(Math.random() * 96).toString(),
    address: `${randomNumber} albany`,
    phone: "1234567890",
  };

  // This use has been created before, and it's used for easy access when needed.
  defaultUser = {
    loginName: "yolas",
    pwd: mockUser.pwd,
  };

  homePage = new HomePage(page);
  registerPage = new RegisterPage(page);
  profilePage = new ProfilePage(page);
  await homePage.load();
});

test.describe("Buggy Page", () => {
  test("Register a user", async () => {
    const { loginName, firstName, lastName, pwd } = mockUser;
    await homePage.goToRegisterPage();
    await expect(registerPage.registerTitle).toContainText(
      "Register with Buggy Cars"
    );
    await registerPage.addUser(loginName, firstName, lastName, pwd);
    await expect(registerPage.confirmationMessage).toBeVisible();
    await expect(registerPage.loginNameField).toBeEmpty();
    await expect(registerPage.firstNameField).toBeEmpty();
    await expect(registerPage.lastNameField).toBeEmpty();
    await expect(registerPage.passwordField).toBeEmpty();
    await expect(registerPage.confirmPasswordField).toBeEmpty();
    await expect(registerPage.registerButton).toBeEnabled();
    await expect(registerPage.cancelButton).toBeEnabled();
  });

  test("Add additional info", async () => {
    const { loginName, firstName, lastName, pwd, age, address, phone } =
      mockUser;

    await homePage.goToRegisterPage();
    await registerPage.addUser(loginName, firstName, lastName, pwd);

    await expect(registerPage.confirmationMessage).toBeVisible();
    await homePage.loginUser(loginName, pwd);
    await homePage.goToProfilePage();
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

  test("Logout", async () => {
    await homePage.loginUser(defaultUser.loginName, defaultUser.pwd);
    await expect(homePage.logoutOption).toBeVisible();
    await homePage.logoutSession();
    await homePage.expectInitialElements();
  });

  test("Login with registered user", async () => {
    const { loginName, firstName, lastName, pwd } = mockUser;

    await homePage.goToRegisterPage();
    await registerPage.addUser(loginName, firstName, lastName, pwd);
    await homePage.loginUser(loginName, pwd);
    await expect(homePage.greetingLocator).toHaveText(`Hi, ${firstName}`);
    await expect(homePage.profileOption).toBeVisible();
    await expect(homePage.logoutOption).toBeVisible();
  });
});