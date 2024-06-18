"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Product_1 = require("../models/Product");
const Customer_1 = require("../models/Customer");
exports.MySQLDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "typeormdb",
    username: "sa",
    password: "rootSa@123",
    synchronize: true,
    logging: false,
    entities: [Product_1.Product, Customer_1.Customer],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=mysql.js.map