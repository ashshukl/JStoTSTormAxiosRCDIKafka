import { Service } from "typedi";
import { Customer } from "../models/Customer";
import { serialize } from "class-transformer";
import { enbdProducer } from "../connectors/kafka";

@Service()
export class CustomersService {
  logMsg: string = "Logging from CustomersService-";

  constructor(public enbdProducer: enbdProducer) {}

  get(id: number) {
    this.enbdProducer.sendMessage("log", this.logMsg + "getAll");
    return { msg: "No Data" };
  }

  update(id: number, customer: Customer) {
    this.enbdProducer.sendMessage("log", this.logMsg + "update");
    this.enbdProducer.sendMessage("log", JSON.stringify(customer));
    return { msg: "No Data" };
  }

  deleteCustomer(id: number) {
    this.enbdProducer.sendMessage("log", this.logMsg + "deleteCustomer " + id);
    return { msg: "No Data" };
  }

  getAll() {
    this.enbdProducer.sendMessage("log", this.logMsg + "getAll");
    return { msg: "No Data" };
  }

  create(customer: Customer) {
    this.enbdProducer.sendMessage("log", this.logMsg + "create");
    this.enbdProducer.sendMessage("log", JSON.stringify(customer));
    return { msg: "No Data" };
  }
}
