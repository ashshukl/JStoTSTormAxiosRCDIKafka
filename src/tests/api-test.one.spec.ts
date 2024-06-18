import { test, expect, request } from "@playwright/test";

test("Product API GETALL Request", async ({ request }) => {
  const response = await request.get("http://localhost:3000/products");

  expect(response.status()).toBe(200);

  const xyz = await response.json();
  expect(xyz).toHaveLength(10);

});

test("Customer API CREATE Request", async ({ request }) => {
  const response = await request.post("http://localhost:3000/customers", {
    data: {
      firstName: "Ashish",

      lastName: "Shukla",

      DateOfBirth: new Date(),

      Email: "Ashish@Shukla.com",
    },
  });
  const xyz = await response.json();

  console.log(await response.json());
});
