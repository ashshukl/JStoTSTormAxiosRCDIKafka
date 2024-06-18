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
exports.CustomerDeleteMiddleware = exports.CustomerAfterMiddleware = exports.CustomerBeforeMiddleware = void 0;
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
//Since middleware is also a @Service dependencies can be Constructor Injected with or without @Inject
let CustomerBeforeMiddleware = class CustomerBeforeMiddleware {
    constructor(enbdProducer) {
        this.enbdProducer = enbdProducer;
        this.msgString = "Logging from Customers-";
    }
    use(request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "Before-Middleware"]));
        next();
    }
};
CustomerBeforeMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kafka_1.enbdProducer])
], CustomerBeforeMiddleware);
exports.CustomerBeforeMiddleware = CustomerBeforeMiddleware;
let CustomerAfterMiddleware = class CustomerAfterMiddleware {
    constructor(enbdProducer) {
        this.enbdProducer = enbdProducer;
        this.msgString = "Logging from Customers-";
    }
    use(request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "After-Middleware"]));
        next();
    }
};
CustomerAfterMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kafka_1.enbdProducer])
], CustomerAfterMiddleware);
exports.CustomerAfterMiddleware = CustomerAfterMiddleware;
let CustomerDeleteMiddleware = class CustomerDeleteMiddleware {
    constructor(enbdProducer) {
        this.enbdProducer = enbdProducer;
        this.msgString = "Logging from Customers-";
    }
    use(request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "Delete-Middleware"]));
        next();
    }
};
CustomerDeleteMiddleware = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kafka_1.enbdProducer])
], CustomerDeleteMiddleware);
exports.CustomerDeleteMiddleware = CustomerDeleteMiddleware;
//# sourceMappingURL=CustomersMiddleware.js.map