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
exports.HomeController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let HomeController = class HomeController {
    constructor() {
        this.msgStr = "Logging from HomeController";
    }
    getHome() {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr]));
        return "{Hurray, You have Reached HOME!!!}";
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], HomeController.prototype, "enbdProducer", void 0);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HomeController.prototype, "getHome", null);
HomeController = __decorate([
    (0, routing_controllers_1.Controller)("/"),
    (0, typedi_1.Service)()
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map