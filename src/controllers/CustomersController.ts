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
import { enbdProducer } from "../connectors/kafka";

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
    await this.enbdProducer.sendMessage("log", this.logMsg + "getById");
    await this.enbdProducer.sendMessage(
      "notify",
      '{message: "Customer Searched by Id"}'
    );
    return this.customersSvc?.get(id);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() customerJSON: any) {
    let customer: Customer = plainToClass(Customer, customerJSON);
    await this.enbdProducer.sendMessage("log", this.logMsg + "update");
    await this.enbdProducer.sendMessage("log", JSON.stringify(customer));
    await this.enbdProducer.sendMessage(
      "notify",
      '{message: "Customer Modified"}'
    );
    return this.customersSvc?.update(id, customer);
  }

  @Delete("/:id")
  @UseBefore(CustomerDeleteMiddleware)
  async deleteCustomer(@Param("id") id: number) {
    await this.enbdProducer.sendMessage("log", this.logMsg + "delete" + id);
    await this.enbdProducer.sendMessage(
      "notify",
      '{message: "Customer Deleeted"}'
    );
    return this.customersSvc?.deleteCustomer(id);
  }

  @Get()
  async getAll() {
    await this.enbdProducer.sendMessage("log", this.logMsg + "getALL");
    await this.enbdProducer.sendMessage(
      "notify",
      '{message: "Customer GetAll"}'
    );
    return this.customersSvc?.getAll();
  }

  @Post()
  async create(@Body() customerJSON: any) {
    let customer: Customer = plainToClass(Customer, customerJSON);
    await this.enbdProducer.sendMessage("log", this.logMsg + "create");
    await this.enbdProducer.sendMessage("log", JSON.stringify(customer));
    await this.enbdProducer.sendMessage(
      "notify",
      '{message: "Customer Created"}'
    );
    return this.customersSvc?.create(customer);
  }
}
