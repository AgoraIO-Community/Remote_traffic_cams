import {Column, PrimaryGeneratedColumn, Entity, ManyToOne} from "typeorm";
import {IsDateString, Length} from "class-validator";
import {PostingModel} from "./posting-model";
import {ApplicantUserModel} from "./applicant-user-model";

@Entity()
export class ApplicationModel {

    @PrimaryGeneratedColumn('uuid')
    applicationid: string;

    //userID from the applicants user account
    @Column()
    userid:string;

    //the applicants first and last name
    @Length(3, 45)
    @Column()
    name: string;

    //md5 filename of the uploaded PDF
    @Column()
    filename: string;

    //date the application was submitted
    @IsDateString()
    @Column()
    datecreated: string;

    //values denied, accepted, pending (recruiter side)
    @Column()
    accepted: string;

    //pending, accept or denied the application (client side)
    @Column()
    confirmed: string;

    //the scheduled meeting time set by the recruiter

    @IsDateString()
    @Column()
    meetingtime: string;

    @ManyToOne( type => PostingModel, post => post.applications)
    post: PostingModel;

    @ManyToOne( type => ApplicantUserModel, applicant => applicant.apps)
    myApplication: ApplicationModel;

}
