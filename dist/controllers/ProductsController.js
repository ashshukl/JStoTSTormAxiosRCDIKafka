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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const routing_controllers_1 = require("routing-controllers");
const ProductsMiddleware_1 = require("../middlewares/ProductsMiddleware");
const Product_1 = require("../models/Product");
const class_transformer_1 = require("class-transformer");
const ProductsService_1 = require("../services/ProductsService");
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
let ProductsController = class ProductsController {
    constructor() {
        //Marked the @Controller class with @Service for automatic dependency injection. What if I put @Service BEFORE @Controller?! Try it!!!
        this.msgStr = "Logging from ProductsController-";
    }
    getById(id) {
        var _a;
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "getById"]));
        return (_a = this.productSvc) === null || _a === void 0 ? void 0 : _a.getById(id);
    }
    deleteProduct(id) {
        var _a;
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "deleteProduct"]));
        return (_a = this.productSvc) === null || _a === void 0 ? void 0 : _a.deleteProduct(id);
    }
    getAll() {
        var _a;
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "getAll"]));
        return (_a = this.productSvc) === null || _a === void 0 ? void 0 : _a.getAll();
    }
    create(productJSON) {
        var _a;
        let product = (0, class_transformer_1.plainToClass)(Product_1.Product, productJSON);
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgStr + "create"]));
        return (_a = this.productSvc) === null || _a === void 0 ? void 0 : _a.create(product);
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], ProductsController.prototype, "enbdProducer", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", ProductsService_1.ProductsService)
], ProductsController.prototype, "productSvc", void 0);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getById", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Post)(),
    (0, routing_controllers_1.UseBefore)(ProductsMiddleware_1.ProductsBeforeCreateMiddleware),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
ProductsController = __decorate([
    (0, routing_controllers_1.Controller)("/products"),
    (0, routing_controllers_1.UseBefore)(ProductsMiddleware_1.ProductsBeforeMiddleware),
    (0, routing_controllers_1.UseAfter)(ProductsMiddleware_1.ProductsAfterMiddleware),
    (0, typedi_1.Service)()
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=ProductsController.js.map