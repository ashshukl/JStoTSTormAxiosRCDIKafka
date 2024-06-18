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
exports.ProductsService = void 0;
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let ProductsService = class ProductsService {
    constructor() {
        this.msgStr = "Logging from ProductsService-";
    }
    getAll() {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "getAll"]));
        return { output: "Test Data - getAll" };
    }
    getById(id) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "getById"]));
        return { output: "Test Data - getById" };
    }
    create(body) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "create"]));
        return { output: "Test Data - create" };
    }
    deleteProduct(id) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "deleteProduct"]));
        return { output: "Test Data - deleteProduct" };
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], ProductsService.prototype, "enbdProducer", void 0);
ProductsService = __decorate([
    (0, typedi_1.Service)()
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=ProductsService.js.map