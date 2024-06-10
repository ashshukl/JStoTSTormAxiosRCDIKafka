import Container, { Service } from "typedi";
import {
  Middleware,
  ExpressMiddlewareInterface,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import { enbdProducer, CreateKafkaMessage } from "../connectors/kafka";

//In this one
@Middleware({ type: "before" })
@Service()
export class AppBeforeMiddleware implements ExpressMiddlewareInterface {
  enbdProducer!: enbdProducer;
  msgString = "Logging from App-";
  constructor() {
    this.enbdProducer = Container.get(enbdProducer);
  }

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgString + "Before-Middleware"])
    );
    next();
  }
}

@Middleware({ type: "after" })
@Service()
export class AppAfterMiddleware implements ExpressMiddlewareInterface {
  enbdProducer!: enbdProducer;
  msgString = "Logging from App-";
  constructor() {
    this.enbdProducer = Container.get(enbdProducer);
  }

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgString + "After-Middleware"])
    );
    next();
  }
}

@Middleware({ type: "after" })
@Service()
export class AppErrorMiddleware implements ExpressErrorMiddlewareInterface {
  enbdProducer!: enbdProducer;
  msgString = "Logging from App-";
  constructor() {
    this.enbdProducer = Container.get(enbdProducer);
  }

  error(
    error: any,
    request: any,
    response: any,
    next: (err?: any) => any
  ): void {
    this.enbdProducer.sendMessage(
      CreateKafkaMessage("log", [this.msgString + "Error-Middleware"])
    );

    console.log("ZZZZZZZZ", error);
  }
}
