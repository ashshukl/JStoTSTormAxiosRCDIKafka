import "reflect-metadata";
import { Container } from "typedi";
import { MySQLDataSource } from "./connectors/mysql";
import { App } from "./App";
import "./middlewares/AppMiddleware";
import { useExpressServer } from "routing-controllers";
import { useContainer } from "routing-controllers";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception", err);
  closeAllConnections();
  process.exit(1);
});

//This is important to set container in routing-controllers before even importing controllers as written in routing-controllers documentation.
useContainer(Container);

import { HomeController } from "./controllers/HomeController";
import { ProductsController } from "./controllers/ProductsController";
import { CustomersController } from "./controllers/CustomersController";
import "./interceptors/AppInterceptor";
import { enbdProducer } from "./connectors/kafka";

MySQLDataSource.initialize()
  .then(() => {
    //Start the app server ONLY if the DB connection is successfull
    useExpressServer(App.app, {
      controllers: [HomeController, ProductsController, CustomersController],
    });
    App.startServer();
  })
  .catch((error) => console.log(error));

process.on("SIGNT", () => {
  closeAllConnections();
  process.exit(0);
});

async function closeAllConnections() {
  console.log("Disconnecting log-Consumer and sql connector...");
  let enbdPrdcr = Container.get(enbdProducer);
  await enbdPrdcr.disconnect();
  await MySQLDataSource.destroy();
}
