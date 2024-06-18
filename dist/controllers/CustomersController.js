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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const routing_controllers_1 = require("routing-controllers");
const CustomersMiddleware_1 = require("../middlewares/CustomersMiddleware");
const Customer_1 = require("../models/Customer");
const class_transformer_1 = require("class-transformer");
const CustomersService_1 = require("../services/CustomersService");
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let CustomersController = class CustomersController {
    //Since controller is decorated with @Service we are getting dependencies injected in the constructor WITH and WITHOUT @Inject. What's the difference?!
    constructor(customersSvc, enbdProducer) {
        this.customersSvc = customersSvc;
        this.enbdProducer = enbdProducer;
        this.logMsg = "Logging from CustomersController-";
    }
    get(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "getById"]));
            yield this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("notify", [
                "Customer Searched by Id",
            ]));
            return (_a = this.customersSvc) === null || _a === void 0 ? void 0 : _a.get(id);
        });
    }
    update(id, customerJSON) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let batch = [];
            let customer = (0, class_transformer_1.plainToClass)(Customer_1.Customer, customerJSON);
            batch.push((0, kafka_1.CreateKafkaMessage)("log", [
                this.logMsg + "update",
                JSON.stringify(customerJSON),
            ]));
            batch.push((0, kafka_1.CreateKafkaMessage)("notify", ["Customer Modified"]));
            yield this.enbdProducer.sendMessageBatch(batch);
            return (_a = this.customersSvc) === null || _a === void 0 ? void 0 : _a.update(id, customer);
        });
    }
    deleteCustomer(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let msgBatch = [
                (0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "delete" + id]),
                (0, kafka_1.CreateKafkaMessage)("notify", ["Customer Deleeted"]),
            ];
            yield this.enbdProducer.sendMessageBatch(msgBatch);
            return (_a = this.customersSvc) === null || _a === void 0 ? void 0 : _a.deleteCustomer(id);
        });
    }
    getAll() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let msgBatch = [
                (0, kafka_1.CreateKafkaMessage)("log", [this.logMsg + "getALL"]),
                (0, kafka_1.CreateKafkaMessage)("notify", ["Customer GetAll"]),
            ];
            yield this.enbdProducer.sendMessageBatch(msgBatch);
            return (_a = this.customersSvc) === null || _a === void 0 ? void 0 : _a.getAll();
        });
    }
    create(customerJSON) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let customer = (0, class_transformer_1.plainToClass)(Customer_1.Customer, customerJSON);
            let msgBatch = [
                (0, kafka_1.CreateKafkaMessage)("log", [
                    this.logMsg + "create",
                    JSON.stringify(customer),
                ]),
                (0, kafka_1.CreateKafkaMessage)("notify", ["Customer Created"]),
            ];
            yield this.enbdProducer.sendMessageBatch(msgBatch);
            return (_a = this.customersSvc) === null || _a === void 0 ? void 0 : _a.create(customer);
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    (0, routing_controllers_1.UseBefore)(CustomersMiddleware_1.CustomerDeleteMiddleware),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteCustomer", null);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
CustomersController = __decorate([
    (0, routing_controllers_1.Controller)("/customers"),
    (0, routing_controllers_1.UseBefore)(CustomersMiddleware_1.CustomerBeforeMiddleware),
    (0, routing_controllers_1.UseAfter)(CustomersMiddleware_1.CustomerAfterMiddleware),
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [CustomersService_1.CustomersService,
        kafka_1.enbdProducer])
], CustomersController);
exports.CustomersController = CustomersController;
//# sourceMappingURL=CustomersController.js.map