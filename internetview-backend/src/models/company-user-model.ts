import {Column, PrimaryGeneratedColumn, Entity, OneToMany,} from "typeorm";
import {UserModel} from "./user-model";
import {PostingModel} from "./posting-model";

@Entity()
export class CompanyUserModel extends UserModel{

    @Column()
    company : string;

    @OneToMany( type => PostingModel, post => post.owner)
    posts: PostingModel[];
}