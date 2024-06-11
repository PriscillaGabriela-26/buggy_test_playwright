import { test as setup, expect } from "@playwright/test";
import { dataUsername, dataFirstName, dataLastName, pwd } from "./utilities";

setup("create new user", async ({ request }) => {
  const newUserResponse = await request.post(
    "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/users",
    {
      data: {
        username: dataUsername,
        firstName: dataFirstName,
        lastName: dataLastName,
        password: pwd,
        confirmPassword: pwd,
      },
    }
  );
  //console.log(dataUsername, dataFirstName, dataLastName, pwd);
  expect(newUserResponse.status()).toEqual(201);
  process.env["USERNAME"] = dataUsername;
  process.env["PWD"] = pwd;
  process.env["FIRST_NAME"] = dataFirstName;
  process.env["LAST_NAME"] = dataLastName;
});
