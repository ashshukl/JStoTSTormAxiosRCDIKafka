import { Kafka, Producer, ProducerRecord } from "kafkajs";
import { Service } from "typedi";

const kafka = new Kafka({
  clientId: "ENBD-APP",
  brokers: ["localhost:9092"],
});

@Service()
export class enbdProducer {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  public async sendMessage(topic: string, message: string) {
    this.producer.connect().then(async () => {
      const producerRecord: ProducerRecord = {
        topic,
        messages: [{ value: message }],
      };

      await this.producer.send(producerRecord);
      // this.producer.send({
      //   topic: "log",
      //   messages: [
      //     { value: "Logging from enbdProducer - Message sent to KAFKA" },
      //   ],
      // });
    });
  }

  public async disconnect() {
    await this.producer.disconnect();
    console.log("Logging from enbdProducer - Disconnected");
  }
}
