import { ExpressMiddlewareInterface } from "routing-controllers";
import Container, { Service } from "typedi";
import { enbdProducer } from "../connectors/kafka";

//Since middleware is also a @Service dependencies can be Constructor Injected with or without @Inject
@Service()
export class CustomerBeforeMiddleware implements ExpressMiddlewareInterface {
  msgString = "Logging from Customers-";
  constructor(public enbdProducer: enbdProducer) {}

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer.sendMessage("log", this.msgString + "Before-Middleware");
    next();
  }
}

@Service()
export class CustomerAfterMiddleware implements ExpressMiddlewareInterface {
  msgString = "Logging from Customers-";
  constructor(public enbdProducer: enbdProducer) {}

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer.sendMessage("log", this.msgString + "After-Middleware");
    next();
  }
}

@Service()
export class CustomerDeleteMiddleware implements ExpressMiddlewareInterface {
  msgString = "Logging from Customers-";
  constructor(public enbdProducer: enbdProducer) {}

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer.sendMessage("log", this.msgString + "Delete-Middleware");
    next();
  }
}
