import { randomInt } from "crypto";
import { Customer } from "../models/Customer";

export class CustomerHelper {
  public static getCustomer(id: number) {
    const customer = new Customer();

    customer.firstName = "Hero";
    customer.lastName = "Hiralal";
    customer.Email = "Hero@Hiralal.com";
    customer.DateOfBirth = new Date();
    customer.id = id;

    return customer;
  }

  public static updateCustomer(customer: Customer) {
    return customer;
  }

  public static createCustomer(customer: Customer) {
    customer.id = randomInt(1000);
    return customer;
  }
}
