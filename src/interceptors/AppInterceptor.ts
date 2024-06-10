import { Interceptor, InterceptorInterface, Action } from "routing-controllers";
import { Inject, Service } from "typedi";
import { CreateKafkaMessage, enbdProducer } from "../connectors/kafka";

@Service()
@Interceptor()
export class AppInterceptor implements InterceptorInterface {
  msgStr: string = "Logging from AppInterceptor";

  @Inject()
  enbdProducer!: enbdProducer;

  intercept(action: Action, result: any) {
    this.enbdProducer.sendMessage(CreateKafkaMessage("log", [this.msgStr]));
    return result;
  }
}
