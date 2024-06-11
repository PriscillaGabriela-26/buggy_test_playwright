import { faker } from "@faker-js/faker";

const dataUsername = `owlGris${faker.number.int({ min: 0, max: 100000 })}`;
const dataFirstName = faker.person.firstName();
const dataLastName = faker.person.lastName();
const pwd = "Buggy_2024";
const dataAge = faker.number.int({ min: 0, max: 95 }).toString();
const dataAddress = faker.location.streetAddress();
const dataPhone = faker.string.numeric({ length: { min: 6, max: 10 } });
//console.log(dataUsername);

export {
  dataUsername,
  dataFirstName,
  dataLastName,
  pwd,
  dataAge,
  dataAddress,
  dataPhone,
};
