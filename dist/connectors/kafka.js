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
exports.CreateKafkaMessage = exports.enbdProducer = void 0;
const kafkajs_1 = require("kafkajs");
const typedi_1 = require("typedi");
const kafka = new kafkajs_1.Kafka({
    clientId: "ENBD-APP",
    brokers: ["localhost:9092"],
});
let enbdProducer = class enbdProducer {
    constructor() {
        this.producer = kafka.producer();
        // this.xactionProducer = kafka.producer({
        //   transactionalId: "enbd-transactional-producer",
        //   maxInFlightRequests: 1,
        //   idempotent: true,
        // });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.producer.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.producer.send(message);
                // await this.producer.disconnect();
            }));
        });
    }
    sendMessageBatch(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            this.producer.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                yield this.producer.sendBatch(batch);
                // await this.producer.disconnect();
            }));
        });
    }
    sendXactionMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Transaction message: " + JSON.stringify(message));
            this.xactionProducer.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                const transaction = yield this.xactionProducer.transaction();
                try {
                    yield transaction.send(message);
                    yield transaction.commit();
                }
                catch (e) {
                    transaction.abort();
                }
                finally {
                    // await this.xactionProducer.disconnect();
                }
            }));
        });
    }
    sendXactionMessageBatch(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Transaction message batch: " + JSON.stringify(batch));
            this.xactionProducer.connect().then(() => __awaiter(this, void 0, void 0, function* () {
                const transaction = yield this.xactionProducer.transaction();
                try {
                    yield transaction.sendBatch(batch);
                    yield transaction.commit();
                }
                catch (e) {
                    transaction.abort();
                }
                finally {
                    // await this.xactionProducer.disconnect();
                }
            }));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.disconnect();
            yield this.xactionProducer.disconnect();
            console.log("Logging from enbdProducer - Disconnected");
        });
    }
};
enbdProducer.messageKey = 0;
enbdProducer = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], enbdProducer);
exports.enbdProducer = enbdProducer;
function CreateKafkaMessage(topic, messages) {
    let kafkaMsg = {
        topic: topic,
        messages: new Array(),
    };
    for (let msg of messages) {
        kafkaMsg.messages.push({
            key: String(enbdProducer.messageKey++),
            value: msg,
        });
    }
    return kafkaMsg;
}
exports.CreateKafkaMessage = CreateKafkaMessage;
//# sourceMappingURL=kafka.js.map