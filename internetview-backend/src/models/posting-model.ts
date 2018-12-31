import {Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne} from "typeorm";
import {IsDateString} from "class-validator";
import {ApplicationModel} from "./application-model";
import {CompanyUserModel} from "./company-user-model";

@Entity()
export class PostingModel {

    //unique post id
    @PrimaryGeneratedColumn('uuid')
    postid: number;

    //date the application was submitted
    @IsDateString()
    @Column()
    datecreated: string;

    @Column()
    companyname: string;

    @Column()
    salary: string;

    @Column()
    location: string;

    // URL to logo
    @Column()
    logo: string;

    @Column()
    jobtitle: string;

    @Column()
    jobtype: string;

    @Column()
    description: string;

    @ManyToOne( type => CompanyUserModel, user => user.posts)
    owner: CompanyUserModel;

    @OneToMany( type => ApplicationModel, application => application.post)
    applications: ApplicationModel[];

}