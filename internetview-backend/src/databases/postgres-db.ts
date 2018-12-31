import { createConnection } from 'typeorm';
import {UserModel} from "../models/user-model";
import {ApplicationModel} from "../models/application-model";
import {PostingModel} from "../models/posting-model";
import {CompanyUserModel} from "../models/company-user-model";
import {ApplicantUserModel} from "../models/applicant-user-model";

export const postgresDB = async () => {
    return await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "interview",
        entities: [
            UserModel,ApplicationModel, PostingModel, CompanyUserModel, ApplicantUserModel
        ],
        synchronize: true,
        logging: false

    }).then(() => {
        console.log("Connection established to postgres database")
    }).catch(error => console.log(error))}
