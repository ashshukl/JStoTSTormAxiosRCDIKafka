import { instanceToPlain } from "class-transformer";
import {
  Kafka,
  Producer,
  ProducerBatch,
  ProducerRecord,
  TopicMessages,
  Transaction,
} from "kafkajs";
import { Service } from "typedi";

const kafka = new Kafka({
  clientId: "ENBD-APP",
  brokers: ["localhost:9092"],
});

@Service()
export class enbdProducer {
  static messageKey: number = 0;
  private producer: Producer;
  private xactionProducer!: Producer;

  constructor() {
    this.producer = kafka.producer();
    this.xactionProducer = kafka.producer({
      transactionalId: "enbd-transactional-producer",
      maxInFlightRequests: 1,
      idempotent: true,
    });
  }

  public async sendMessage(topicMessage: TopicMessages) {
    // // console.log("MESSAGE: " + JSON.stringify(message));
    // this.producer.connect().then(async () => {
    //   await this.producer.send(topicMessage);
    //   // await this.producer.disconnect();
    // });
  }

  public async sendMessageBatch(topicMessages: TopicMessages[]) {
    // // console.log("MESSAGE BATCH: " + JSON.stringify(topicMessages));
    // this.producer.connect().then(async () => {
    //   await this.producer.sendBatch({ topicMessages });
    //   // console.log(topicMessages);
    //   // await this.producer.disconnect();
    // });
  }

  public async sendXactionMessage(topicMessage: TopicMessages) {
    // // console.log("Transaction message: " + JSON.stringify(topicMessage));
    // this.xactionProducer.connect().then(async () => {
    //   const transaction = await this.xactionProducer.transaction();
    //   try {
    //     await transaction.send(topicMessage);
    //     await transaction.commit();
    //   } catch (e) {
    //     transaction.abort();
    //   } finally {
    //     // await this.xactionProducer.disconnect();
    //   }
    // });
  }

  public async sendXactionMessageBatch(topicMessages: TopicMessages[]) {
    // console.log("Transaction message batch: " + topicMessages);
    // this.xactionProducer.connect().then(async () => {
    //   const transaction = await this.xactionProducer.transaction();
    //   try {
    //     await transaction.sendBatch({ topicMessages });
    //     await transaction.commit();
    //   } catch (e) {
    //     console.log("YYYYYYY", e);
    //     transaction.abort();
    //   } finally {
    //     // await this.xactionProducer.disconnect();
    //   }
    // });
  }

  public async disconnect() {
    // await this.producer.disconnect();
    // await this.xactionProducer.disconnect();
    // console.log("Logging from enbdProducer - Disconnected");
  }
}

export function CreateKafkaMessage(topic: string, messages: string[]): any {
  let kafkaMsg = {
    topic: topic,
    messages: [] as any[],
  };
  for (let msg of messages) {
    kafkaMsg.messages.push({
      key: String(enbdProducer.messageKey++),
      value: String(msg),
    });
  }

  // console.log("XXXX", kafkaMsg);
  return kafkaMsg;
}
