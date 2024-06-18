"use strict";
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
require("reflect-metadata");
const typedi_1 = require("typedi");
const mysql_1 = require("./connectors/mysql");
const App_1 = require("./App");
require("./middlewares/AppMiddleware");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_2 = require("routing-controllers");
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception", err);
    closeAllConnections();
    process.exit(1);
});
//This is important to set container in routing-controllers before even importing controllers as written in routing-controllers documentation.
(0, routing_controllers_2.useContainer)(typedi_1.Container);
const HomeController_1 = require("./controllers/HomeController");
const ProductsController_1 = require("./controllers/ProductsController");
const CustomersController_1 = require("./controllers/CustomersController");
require("./interceptors/AppInterceptor");
const kafka_1 = require("./connectors/kafka");
mysql_1.MySQLDataSource.initialize()
    .then(() => {
    //Start the app server ONLY if the DB connection is successfull
    (0, routing_controllers_1.useExpressServer)(App_1.App.app, {
        controllers: [HomeController_1.HomeController, ProductsController_1.ProductsController, CustomersController_1.CustomersController],
    });
    App_1.App.startServer();
})
    .catch((error) => console.log(error));
process.on("SIGNT", () => {
    closeAllConnections();
    process.exit(0);
});
function closeAllConnections() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Disconnecting log-Consumer and sql connector...");
        let enbdPrdcr = typedi_1.Container.get(kafka_1.enbdProducer);
        yield enbdPrdcr.disconnect();
        yield mysql_1.MySQLDataSource.destroy();
    });
}
//# sourceMappingURL=index.js.map