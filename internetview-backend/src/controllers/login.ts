import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import {CompanyUserModel} from "../models/company-user-model";
import {ApplicantUserModel} from "../models/applicant-user-model";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class LoginController {
    public static async loginUser (ctx: BaseContext) {
        const userModelRepository: Repository<ApplicantUserModel> = getManager().getRepository(ApplicantUserModel);

        //does user exist?
        const user = await userModelRepository.findOne({ email: ctx.request.body.email})
        if(user){
            //if they do check that their password matches
            const match = await bcrypt.compare(ctx.request.body.password, user.password);
            if(match){
                //provide JWT for the user so that they can access their supported middleware
                const profile = {
                    "id": user.id,
                    "accountType": user.accountType
                }
                const TOKEN = jwt.sign(profile, 'secret-user', { expiresIn: '24h'});
                ctx.status = 200;
                ctx.set("Authorization","Bearer " + TOKEN);
                ctx.body = TOKEN;
            } else {

            }

        } else {
            ctx.status = 400;
            ctx.body = 'No corporate account with the specified e-mail address\n';
        }
    }


    public static async loginPoster (ctx: BaseContext) {
        const companyUserModelRepository: Repository<CompanyUserModel> = getManager().getRepository(CompanyUserModel);

        //does user exist?
        const user = await companyUserModelRepository.findOne({ email: ctx.request.body.email})
        if(user){
            //if they do check that their password matches
            const match = await bcrypt.compare(ctx.request.body.password, user.password);
            if(match){
                //provide JWT for the user so that they can access their supported middleware
                const profile = {
                    "id": user.id,
                    "accountType": user.accountType
                }
                const TOKEN = jwt.sign(profile, 'secret-corporate', { expiresIn: '24h' });
                ctx.status = 200;
                ctx.set("Authorization","Bearer " + TOKEN);
                ctx.body = TOKEN;
            } else {

            }

        } else {
            ctx.status = 400;
            ctx.body = 'No corporate account with the specified e-mail address\n';
        }
    }

}
