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
exports.ProductsBeforeCreateMiddleware = exports.ProductsAfterMiddleware = exports.ProductsBeforeMiddleware = void 0;
const typedi_1 = require("typedi");
const kafka_1 = require("../connectors/kafka");
//Since Middleware is also a service then in that case dependencies can be property injected in middleware using @Inject
let ProductsBeforeMiddleware = class ProductsBeforeMiddleware {
    use(request, response, next) {
        var _a;
        (_a = this.enbdProducer) === null || _a === void 0 ? void 0 : _a.sendMessage((0, kafka_1.CreateKafkaMessage)("log", ["Logging from Products-Before-Middleware"]));
        next();
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], ProductsBeforeMiddleware.prototype, "enbdProducer", void 0);
ProductsBeforeMiddleware = __decorate([
    (0, typedi_1.Service)()
], ProductsBeforeMiddleware);
exports.ProductsBeforeMiddleware = ProductsBeforeMiddleware;
let ProductsAfterMiddleware = class ProductsAfterMiddleware {
    use(request, response, next) {
        var _a;
        (_a = this.enbdProducer) === null || _a === void 0 ? void 0 : _a.sendMessage((0, kafka_1.CreateKafkaMessage)("log", ["Logging from Products-After-Middleware"]));
        next();
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], ProductsAfterMiddleware.prototype, "enbdProducer", void 0);
ProductsAfterMiddleware = __decorate([
    (0, typedi_1.Service)()
], ProductsAfterMiddleware);
exports.ProductsAfterMiddleware = ProductsAfterMiddleware;
let ProductsBeforeCreateMiddleware = class ProductsBeforeCreateMiddleware {
    use(request, response, next) {
        var _a;
        (_a = this.enbdProducer) === null || _a === void 0 ? void 0 : _a.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [
            "Logging from Products-BeforeCreate-Middleware",
        ]));
        next();
    }
};
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", kafka_1.enbdProducer)
], ProductsBeforeCreateMiddleware.prototype, "enbdProducer", void 0);
ProductsBeforeCreateMiddleware = __decorate([
    (0, typedi_1.Service)()
], ProductsBeforeCreateMiddleware);
exports.ProductsBeforeCreateMiddleware = ProductsBeforeCreateMiddleware;
//# sourceMappingURL=ProductsMiddleware.js.map