const { expect } = require("@playwright/test");

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerTitle = this.page.getByRole("heading", {
      name: "Register with Buggy Cars",
    });
    this.loginNameField = this.page.getByLabel("Login");
    this.firstNameField = this.page.getByLabel("First Name", { exact: true });
    this.lastNameField = this.page.getByLabel("Last Name");
    this.passwordField = this.page.getByLabel("Password", { exact: true });
    this.confirmPasswordField = this.page.getByLabel("Confirm Password");
    this.registerButton = this.page.getByRole("button", { name: "Register" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.confirmationMessage = this.page.getByText(
      "Registration is successful"
    );
  }

  async load() {
    await this.page.goto("https://buggy.justtestit.org/register");
  }

  async addUser(loginName, firstName, lastName, pwd) {
    await this.loginNameField.fill(loginName);
    await expect(this.loginNameField).toHaveValue(loginName);

    await this.firstNameField.fill(firstName);
    await expect(this.firstNameField).toHaveValue(firstName);

    await this.lastNameField.fill(lastName);
    await expect(this.lastNameField).toHaveValue(lastName);

    await this.passwordField.fill(pwd);
    await expect(this.passwordField).toHaveValue(pwd);

    await this.confirmPasswordField.fill(pwd);
    await expect(this.confirmPasswordField).toHaveValue(pwd);

    await this.registerButton.click();
  }
}

module.exports = { RegisterPage };
