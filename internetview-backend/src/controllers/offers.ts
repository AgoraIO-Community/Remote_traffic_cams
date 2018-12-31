import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import {ApplicationModel} from "../models/application-model";

const jwt = require('jsonwebtoken');
const moment = require('moment');

export class OfferController {
    public static async makeOffer(ctx: BaseContext){
        //get application ID and change the state to what was passed.

        const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-corporate');

        const applicationRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);
        const application = await applicationRepository.findOne({ applicationid: ctx.request.body.id} );
        console.log("APPLICATION: " + application);
        let status = ctx.request.body.status;

        if(status === "accepted") {
            application.meetingtime = ctx.request.body.datetime;
            application.accepted = status; //set accepted

            const savedapplication = await applicationRepository.save(application);

            ctx.status = 200;
            ctx.body = "application accepted\n"

        } else if(status === "denied") {

            application.accepted = status; //set denied

            const savedapplication = await applicationRepository.save(application);

            ctx.status = 200;
            ctx.body = "application denied\n"
        }

    }

    public static async acceptOffer(ctx: BaseContext){

        const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-user');

        const applicationRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);
        const application = await applicationRepository.findOne({ applicationid: ctx.request.body.id} );

        let status = ctx.request.body.status;

        if(status === "accepted") {
            application.confirmed = status; //set accepted

            const savedapplication = await applicationRepository.save(application);

            ctx.status = 200;
            ctx.body = "application accepted\n"

        } else if(status === "denied") {

            application.confirmed = status; //set denied

            const savedapplication = await applicationRepository.save(application);

            ctx.status = 200;
            ctx.body = "application denined\n"
        }


    }

}