import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  name?: string;

  @Column()
  foto: string = "";

  @Column()
  price: number;

  //First thing to be called when new Product is created
  constructor() {
    this.price = 0;
  }
}
