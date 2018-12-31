import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import {ApplicantUserModel} from "../models/applicant-user-model";
import {CompanyUserModel} from "../models/company-user-model";
import {getHashes} from "crypto";

const bcrypt = require('bcrypt');
const saltRounds = 10;

export class RegistrationController {

   public static async registrationStart (ctx: BaseContext) {

        // get the accountType field from JSON to run proper account registration
       if(ctx.request.body.accountType === "corporate") {
           const companyUserModelRepository: Repository<CompanyUserModel> = getManager().getRepository(CompanyUserModel);

           //does email exist?
           if(await companyUserModelRepository.findOne({ email: ctx.request.body.email})){
               ctx.status = 400;
               ctx.body = 'The specified e-mail address already exists\n';
           } else {
               const companyUserModel= new CompanyUserModel()
               companyUserModel.email = ctx.request.body.email;
	       //companyUserModel.name = ctx.request.body.name;
               companyUserModel.company = ctx.request.body.company;
               const hash = await bcrypt.hash(ctx.request.body.password, saltRounds);
               companyUserModel.password = hash;
               companyUserModel.accountType = ctx.request.body.accountType;
               companyUserModel.posts = [];

               const completedCompany  = await companyUserModelRepository.save(companyUserModel);

               ctx.body = "corporate user created\n";
               ctx.status = 200;
           }
        }

        if(ctx.request.body.accountType === "user"){
            const applicantUserModelRepository: Repository<ApplicantUserModel> = getManager().getRepository(ApplicantUserModel);

            //does email exist?
            if(await applicantUserModelRepository.findOne({ email: ctx.request.body.email})){
                ctx.status = 400;
                ctx.body = 'The specified e-mail address already exists\n';
            } else {
                const applicantUserModel = new ApplicantUserModel()
                applicantUserModel.email = ctx.request.body.email;
                applicantUserModel.name = ctx.request.body.name;
                const hash = await bcrypt.hash(ctx.request.body.password, saltRounds);
		        applicantUserModel.password = hash;
                applicantUserModel.accountType = ctx.request.body.accountType;

                const completedApplicant  = await applicantUserModelRepository.save(applicantUserModel);

		
                ctx.body = "user created\n";
                ctx.status = 200;
            }
        };

    }
}
