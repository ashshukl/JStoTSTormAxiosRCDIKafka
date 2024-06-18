import { test, expect, request } from "@playwright/test";

test("API PRODUCTS GETALL @smoke", async ({ request }) => {
  const response = await request.get("http://localhost:3000/products");
  const resJson = await response.json();

  expect(response.status()).toBe(200);
  //   console.log(resJson);
  expect(resJson.length).toBe(10);
});

test("API CUSTOMERS CREATE @reg @smoke", async ({ request }) => {
  const dataToSend = {
    firstName: "ashish",

    lastName: "shukla",

    DateOfBirth: new Date(),

    Email: "ashish@shukla.com",
  };

  const response = await request.post("http://localhost:3000/customers", {
    data: dataToSend,
  });

  const customer = await response.json();

  expect(response.status()).toBe(200);
  expect(dataToSend.firstName).toBe(customer.firstName);
});
