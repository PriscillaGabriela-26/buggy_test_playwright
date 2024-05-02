import { expect } from "@playwright/test";

class HomePage {
  constructor(page) {
    this.page = page;
    this.loginInput = this.page.getByPlaceholder("Login");
    this.passwordInput = this.page
      .getByRole("navigation")
      .locator('input[name="password"]');
    this.loginButton = this.page.getByRole("button", { name: "Login" });
    this.registerLink = this.page.getByRole("link", { name: "Register" });
    this.logo = this.page.getByRole("link", { name: "Buggy Rating" });
    this.Tittle = this.page.getByRole("heading", { name: "Buggy Cars Rating" });
    this.bannerImage = this.page.getByRole("banner").getByRole("img");
    this.bodyText = this.page.locator("my-app");
    this.fcbLogo = this.page.getByRole("link", { name: "Facebook" });
    this.twtLogo = this.page.getByRole("link", { name: "Twitter" });
  }

  async load() {
    await this.page.goto("/");
  }

  async setDynamicBannerLocators() {
    await this.page.waitForSelector('a:has-text("Profile")');
    this.profileOption = this.page.locator('a:has-text("Profile")');
    this.logoutOption = this.page.getByRole("link", { name: "Logout" });
    this.greetingLocator = this.page.locator("span.nav-link.disabled");
  }

  async expectInitialElements() {
    await expect(this.logo).toHaveText("Buggy Rating");
    await expect(this.loginInput).toBeEnabled();
    await expect(this.passwordInput).toBeEnabled();
    await expect(this.loginButton).toBeEnabled();
    await expect(this.registerLink).toBeEnabled();
    await expect(this.Tittle).toContainText("BuggyCarsRating");
    await expect(this.bannerImage).toBeVisible();
    await expect(this.bodyText).toBeVisible();
    await expect(this.fcbLogo).toBeEnabled();
    await expect(this.twtLogo).toBeEnabled();
  }

  async loginUser(loginName, pwd) {
    await this.loginInput.fill(loginName);
    await expect(this.loginInput).toHaveValue(loginName);
    await this.passwordInput.fill(pwd);
    await expect(this.passwordInput).toHaveValue(pwd);
    await this.loginButton.click();

    await this.setDynamicBannerLocators();
  }

  async goToProfilePage() {
    await this.profileOption.click();
  }

  async goToRegisterPage() {
    await this.registerLink.click();
  }

  async logoutSession() {
    this.logoutOption.click();
  }
}

module.exports = { HomePage };
