import {Column, PrimaryGeneratedColumn, Entity, PrimaryColumn, Generated} from "typeorm";
import {IsEmail} from "class-validator";

@Entity()
export class UserModel {

    @IsEmail()
    @PrimaryColumn()
    email: string;

    @Column({ nullable: true })
    name: string;

    @Generated('uuid')
    @Column()
    id: string;

    @Column()
    password: string;

    //corporate or user
    @Column()
    accountType: string;
}
