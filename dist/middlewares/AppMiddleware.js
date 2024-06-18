"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorMiddleware = exports.AppAfterMiddleware = exports.AppBeforeMiddleware = void 0;
const typedi_1 = __importStar(require("typedi"));
const routing_controllers_1 = require("routing-controllers");
const kafka_1 = require("../connectors/kafka");
//In this one
let AppBeforeMiddleware = class AppBeforeMiddleware {
    constructor() {
        this.msgString = "Logging from App-";
        this.enbdProducer = typedi_1.default.get(kafka_1.enbdProducer);
    }
    use(request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "Before-Middleware"]));
        next();
    }
};
AppBeforeMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "before" }),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AppBeforeMiddleware);
exports.AppBeforeMiddleware = AppBeforeMiddleware;
let AppAfterMiddleware = class AppAfterMiddleware {
    constructor() {
        this.msgString = "Logging from App-";
        this.enbdProducer = typedi_1.default.get(kafka_1.enbdProducer);
    }
    use(request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "After-Middleware"]));
        next();
    }
};
AppAfterMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "after" }),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AppAfterMiddleware);
exports.AppAfterMiddleware = AppAfterMiddleware;
let AppErrorMiddleware = class AppErrorMiddleware {
    constructor() {
        this.msgString = "Logging from App-";
        this.enbdProducer = typedi_1.default.get(kafka_1.enbdProducer);
    }
    error(error, request, response, next) {
        this.enbdProducer.sendMessage((0, kafka_1.CreateKafkaMessage)("log", [this.msgString + "Error-Middleware"]));
    }
};
AppErrorMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "after" }),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AppErrorMiddleware);
exports.AppErrorMiddleware = AppErrorMiddleware;
//# sourceMappingURL=AppMiddleware.js.map