import { randomInt } from "crypto";
import { Product } from "../models/Product";

export class ProductHelper {
  public static getProducts() {
    let products: Array<Product> = [];

    for (let i = 0; i < 10; i++) {
      const product = new Product();
      product.id = randomInt(1000);
      product.foto = `foto_${i}`;
      product.name = `Name_${i}`;
      product.price = Math.random() * 1000;
      products.push(product);
    }

    return products;
  }
}
