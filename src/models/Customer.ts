import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  DateOfBirth?: Date;

  @Column()
  Email?: string;

  getName() {
    return this.firstName + " " + this.lastName;
  }
}
