import { Inject, Service } from "typedi";
import { CreateKafkaMessage, enbdProducer } from "../connectors/kafka";

@Service()
export class ProductsService {
  msgStr: string = "Logging from ProductsService-";

  @Inject()
  enbdProducer!: enbdProducer;

  getAll() {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgStr + "getAll"])
    );
    return { output: "Test Data - getAll" };
  }

  getById(id: number) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgStr + "getById"])
    );
    return { output: "Test Data - getById" };
  }

  create(body: any) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgStr + "create"])
    );
    return { output: "Test Data - create" };
  }

  deleteProduct(id: number) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgStr + "deleteProduct"])
    );
    return { output: "Test Data - deleteProduct" };
  }
}
