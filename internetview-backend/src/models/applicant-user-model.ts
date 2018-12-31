import {Column, PrimaryGeneratedColumn, Entity, OneToMany,} from "typeorm";
import {UserModel} from "./user-model";
import {ApplicationModel} from "./application-model";

@Entity()
export class ApplicantUserModel extends UserModel{

    @OneToMany( type => ApplicationModel, application => application.myApplication)
    apps: ApplicationModel[];
}