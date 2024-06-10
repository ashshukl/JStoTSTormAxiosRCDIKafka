import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  UseBefore,
  UseAfter,
  Body,
  Param,
} from "routing-controllers";
import {
  CustomerAfterMiddleware,
  CustomerBeforeMiddleware,
  CustomerDeleteMiddleware,
} from "../middlewares/CustomersMiddleware";
import { Customer } from "../models/Customer";
import { plainToClass, serialize } from "class-transformer";
import { CustomersService } from "../services/CustomersService";
import { Inject, Service } from "typedi";
import { enbdProducer, CreateKafkaMessage } from "../connectors/kafka";
import { ProducerRecord, TopicMessages } from "kafkajs";

@Controller("/customers")
@UseBefore(CustomerBeforeMiddleware)
@UseAfter(CustomerAfterMiddleware)
@Service()
export class CustomersController {
  logMsg: string = "Logging from CustomersController-";

  //Since controller is decorated with @Service we are getting dependencies injected in the constructor WITH and WITHOUT @Inject. What's the difference?!
  constructor(
    @Inject() public customersSvc: CustomersService,
    public enbdProducer: enbdProducer
  ) {}

  @Get("/:id")
  async get(@Param("id") id: number) {
    await this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.logMsg + "getById"])
    );
    await this.enbdProducer.sendMessage(
      CreateKafkaMessage("notify", [
        "Customer Searched by Id",
      ]) as ProducerRecord
    );
    return this.customersSvc?.get(id);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() customerJSON: any) {
    let batch: TopicMessages[] = [];

    let customer: Customer = plainToClass(Customer, customerJSON);

    batch.push(
      CreateKafkaMessage("log", [
        this.logMsg + "update",
        JSON.stringify(customerJSON),
      ])
    );
    batch.push(CreateKafkaMessage("notify", ["Customer Modified"]));

    await this.enbdProducer.sendMessageBatch(batch);
    return this.customersSvc?.update(id, customer);
  }

  @Delete("/:id")
  @UseBefore(CustomerDeleteMiddleware)
  async deleteCustomer(@Param("id") id: number) {
    let msgBatch: TopicMessages[] = [
      CreateKafkaMessage("log", [this.logMsg + "delete" + id]),
      CreateKafkaMessage("notify", ["Customer Deleted"]),
    ];
    await this.enbdProducer.sendMessageBatch(msgBatch);
    return this.customersSvc?.deleteCustomer(id);
  }

  @Get()
  async getAll() {
    let msgBatch: TopicMessages[] = [
      CreateKafkaMessage("log", [this.logMsg + "getALL"]),
      CreateKafkaMessage("notify", ["Customer GetAll"]),
    ];
    await this.enbdProducer.sendXactionMessageBatch(msgBatch);
    return this.customersSvc?.getAll();
  }

  @Post()
  async create(@Body() customerJSON: any) {
    let customer: Customer = plainToClass(Customer, customerJSON);
    let msgBatch: TopicMessages[] = [
      CreateKafkaMessage("log", [
        this.logMsg + "create",
        JSON.stringify(customer),
      ]),
      CreateKafkaMessage("notify", ["Customer Created"]),
    ];
    await this.enbdProducer.sendMessageBatch(msgBatch);
    return this.customersSvc?.create(customer);
  }
}
