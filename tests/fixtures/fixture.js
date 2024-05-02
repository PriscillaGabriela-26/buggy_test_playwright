import { test as base } from "@playwright/test";
import { HomePage } from "../pages/home.js";
import { ProfilePage } from "../pages/profile.js";
import { RegisterPage } from "../pages/register.js";

const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { test };
