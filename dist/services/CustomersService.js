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
exports.CustomersService = void 0;
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let CustomersService = class CustomersService {
    constructor(enbdProducer) {
        this.enbdProducer = enbdProducer;
        this.logMsg = "Logging from CustomersService-";
    }
    get(id) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "getById"]));
        return { msg: "No Data" };
    }
    update(id, customer) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [
            this.logMsg + "update",
            JSON.stringify(customer),
        ]));
        return { msg: "No Data" };
    }
    deleteCustomer(id) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "deleteCustomer " + id]));
        return { msg: "No Data" };
    }
    getAll() {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "getAll"]));
        return { msg: "No Data" };
    }
    create(customer) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [
            this.logMsg + "create",
            JSON.stringify(customer),
        ]));
        return { msg: "No Data" };
    }
};
CustomersService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kafka_1.enbdProducer])
], CustomersService);
exports.CustomersService = CustomersService;
//# sourceMappingURL=CustomersService.js.map