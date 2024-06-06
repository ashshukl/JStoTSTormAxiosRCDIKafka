import { Interceptor, InterceptorInterface, Action } from "routing-controllers";
import { Inject, Service } from "typedi";
import { enbdProducer } from "../connectors/kafka";

@Service()
@Interceptor()
export class AppInterceptor implements InterceptorInterface {
  msgStr: string = "Logging from AppInterceptor";

  @Inject()
  enbdProducer!: enbdProducer;

  intercept(action: Action, result: any) {
    this.enbdProducer.sendMessage("log", this.msgStr);
    return result;
  }
}
