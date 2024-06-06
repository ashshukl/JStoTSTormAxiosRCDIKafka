import { Controller, Req, Res, Get } from "routing-controllers";
import { Inject, Service } from "typedi";
import { enbdProducer } from "../connectors/kafka";

@Controller("/")
@Service()
export class HomeController {
  msgStr: string = "Logging from HomeController";
  //Property Injection with @Inject and WITHOUT @Inject?! Try it!!!
  @Inject()
  enbdProducer!: enbdProducer;

  @Get()
  getHome() {
    this.enbdProducer.sendMessage("log", this.msgStr);
    return "{Hurray, You have Reached HOME!!!}";
  }
}
