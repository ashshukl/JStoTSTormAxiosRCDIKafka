import { Service } from "typedi";
import { Customer } from "../models/Customer";
import { serialize } from "class-transformer";
import { CreateKafkaMessage, enbdProducer } from "../connectors/kafka";

@Service()
export class CustomersService {
  logMsg: string = "Logging from CustomersService-";

  constructor(public enbdProducer: enbdProducer) {}

  get(id: number) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.logMsg + "getById"])
    );
    return { msg: "No Data" };
  }

  update(id: number, customer: Customer) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [
        this.logMsg + "update",
        JSON.stringify(customer),
      ])
    );
    return { msg: "No Data" };
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

  create(customer: Customer) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [
        this.logMsg + "create",
        JSON.stringify(customer),
      ])
    );
    return { msg: "No Data" };
  }
}
