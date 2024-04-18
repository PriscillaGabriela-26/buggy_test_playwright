const { expect } = require("@playwright/test");

class ProfilePage {
  constructor(page) {
    this.page = page;
    this.userNameField = this.page.locator("input[id='username']");
    this.firstNameField = this.page.locator("input[id='firstName']");
    this.lastNameField = this.page.locator("input[id='lastName']");
    this.genderField = this.page.locator("input[id='gender']");
    this.ageField = this.page.locator("input[id='age']");
    this.addressField = this.page.locator('//textarea[@id="address"]');
    this.phoneField = this.page.locator("input[id='phone']");
    this.hobbyField = this.page.locator('select[name="hobby"]');
    this.currentPasswordField = this.page.locator(
      "input[id='currentPassword']"
    );
    this.newPasswordField = this.page.locator("input[id='newPassword']");
    this.confirmPasswordField = this.page.locator(
      "input[id='newPasswordConfirmation']"
    );
    this.languageField = this.page.locator("[id='language']");
    this.saveButton = this.page.getByRole("button", { name: "Save" });
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
  }

  async successConfirmationMsg() {
    await this.page.waitForSelector("div.result.alert.alert-success");
    this.successConfirmationMsg = this.page.locator(
      "div.result.alert.alert-success.hidden-md-down"
    );
  }

  async selectHobby() {
    const hobbyList = this.hobbyField.locator("option");
    const hobbiesCount = await hobbyList.count();
    const randomIndex = Math.floor(Math.random() * hobbiesCount);

    this.hobbyField.selectOption({ index: randomIndex });
  }

  async selectGender() {
    const genderDataListLocator = this.page.locator("datalist#genders");
    const genderList = genderDataListLocator.locator("option");

    const optionsCount = await genderList.count();
    const randomIndex = Math.floor(Math.random() * optionsCount);
    const selectedOption = await genderList
      .nth(randomIndex)
      .getAttribute("value");

    await this.genderField.fill(selectedOption);
  }

  async expectInitialElements(loginName, firstName, lastName) {
    await this.page.waitForSelector('input[id="username"]');
    await expect(this.userNameField).toHaveValue(loginName);
    await expect(this.firstNameField).toHaveValue(firstName);
    await expect(this.lastNameField).toHaveValue(lastName);
    await expect(this.languageField).toContainText("English");
    await expect(this.saveButton).toBeEnabled();
    await expect(this.cancelButton).toBeEnabled();
  }

  async addInfo(age, address, phone) {
    await this.selectGender();
    await this.ageField.fill(age);
    await this.addressField.fill(address);
    await this.phoneField.fill(phone);
    await this.selectHobby();
    await this.saveButton.click();

    await this.successConfirmationMsg();
  }
}

module.exports = { ProfilePage };
