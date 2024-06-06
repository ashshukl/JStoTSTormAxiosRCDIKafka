import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "../models/Product";
import { Customer } from "../models/Customer";

export const MySQLDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  database: "typeormdb",
  username: "sa",
  password: "rootSa@123",
  synchronize: true,
  logging: false,
  entities: [Product, Customer],
  subscribers: [],
  migrations: [],
});
