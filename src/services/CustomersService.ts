import { Service } from "typedi";
import { Customer } from "../models/Customer";
import { serialize } from "class-transformer";
import { CreateKafkaMessage, enbdProducer } from "../connectors/kafka";
import { CustomerHelper } from "../helpers/customer.helper";

@Service()
export class CustomersService {
  logMsg: string = "Logging from CustomersService-";

  constructor(public enbdProducer: enbdProducer) {}

  create(customer: Customer) {
    // this.enbdProducer.sendMessage(
    //   CreateKafkaMessage("log", [
    //     this.logMsg + "create",
    //     JSON.stringify(customer),
    //   ])
    // );
    return CustomerHelper.createCustomer(customer);
  }

  get(id: number) {
    // this.enbdProducer.sendMessage(
    //   CreateKafkaMessage("log", [this.logMsg + "getById"])
    // );
    return CustomerHelper.getCustomer(id);
  }

  update(id: number, customer: Customer) {
    // this.enbdProducer.sendMessage(
    //   CreateKafkaMessage("log", [
    //     this.logMsg + "update",
    //     JSON.stringify(customer),
    //   ])
    // );
    return CustomerHelper.updateCustomer(customer);
  }

  deleteCustomer(id: number) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.logMsg + "deleteCustomer " + id])
    );
    return { msg: "No Data" };
  }

  getAll() {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.logMsg + "getAll"])
    );
    return { msg: "No Data" };
  }
}
