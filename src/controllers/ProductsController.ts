import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseAfter,
  UseBefore,
} from "routing-controllers";
import {
  ProductsAfterMiddleware,
  ProductsBeforeCreateMiddleware,
  ProductsBeforeMiddleware,
} from "../middlewares/ProductsMiddleware";
import { Product } from "../models/Product";
import { plainToClass } from "class-transformer";
import { ProductsService } from "../services/ProductsService";
import Container, { Inject, Service } from "typedi";
import { enbdProducer } from "../connectors/kafka";

@Controller("/products")
@UseBefore(ProductsBeforeMiddleware)
@UseAfter(ProductsAfterMiddleware)
@Service()
export class ProductsController {
  //Marked the @Controller class with @Service for automatic dependency injection. What if I put @Service BEFORE @Controller?! Try it!!!

  msgStr: string = "Logging from ProductsController-";
  //Property Injection with @Inject and WITHOUT @Inject?! Try it!!!
  @Inject()
  enbdProducer!: enbdProducer;

  @Inject()
  productSvc?: ProductsService;

  @Get("/:id")
  getById(@Param("id") id: number) {
    this.enbdProducer.sendMessage("log", this.msgStr + "getById");
    return this.productSvc?.getById(id);
  }

  @Delete("/:id")
  deleteProduct(@Param("id") id: number) {
    this.enbdProducer.sendMessage("log", this.msgStr + "deleteProduct");
    return this.productSvc?.deleteProduct(id);
  }

  @Get()
  getAll() {
    this.enbdProducer.sendMessage("log", this.msgStr + "getAll");
    return this.productSvc?.getAll();
  }

  @Post()
  @UseBefore(ProductsBeforeCreateMiddleware)
  create(@Body() productJSON: any) {
    let product: Product = plainToClass(Product, productJSON);
    this.enbdProducer.sendMessage("log", this.msgStr + "create");
    return this.productSvc?.create(product);
  }
}
