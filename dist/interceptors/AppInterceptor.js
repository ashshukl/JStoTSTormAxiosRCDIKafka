"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInterceptor = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let AppInterceptor = class AppInterceptor {
    constructor() {
        this.msgStr = "Logging from AppInterceptor";
    }
    intercept(action, result) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr]));
        return result;
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], AppInterceptor.prototype, "enbdProducer", void 0);
AppInterceptor = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Interceptor)()
], AppInterceptor);
exports.AppInterceptor = AppInterceptor;
//# sourceMappingURL=AppInterceptor.js.map