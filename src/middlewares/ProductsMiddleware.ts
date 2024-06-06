import { ExpressMiddlewareInterface } from "routing-controllers";
import Container, { Inject, Service } from "typedi";
import { enbdProducer } from "../connectors/kafka";

//Since Middleware is also a service then in that case dependencies can be property injected in middleware using @Inject
@Service()
export class ProductsBeforeMiddleware implements ExpressMiddlewareInterface {
  @Inject()
  enbdProducer?: enbdProducer;

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer?.sendMessage(
      "log",
      "Logging from Products-Before-Middleware"
    );
    next();
  }
}

@Service()
export class ProductsAfterMiddleware implements ExpressMiddlewareInterface {
  @Inject()
  enbdProducer?: enbdProducer;

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer?.sendMessage(
      "log",
      "Logging from Products-After-Middleware"
    );
    next();
  }
}

@Service()
export class ProductsBeforeCreateMiddleware
  implements ExpressMiddlewareInterface
{
  @Inject()
  enbdProducer?: enbdProducer;

  use(request: any, response: any, next: (err?: any) => any) {
    this.enbdProducer?.sendMessage(
      "log",
      "Logging from Products-BeforeCreate-Middleware"
    );
    next();
  }
}
