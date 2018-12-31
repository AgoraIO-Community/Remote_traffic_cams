import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
//import { validate, ValidationError } from 'class-validator';
import { ApplicationModel } from 'models/application-model';
import {CompanyUserModel} from "../models/company-user-model";
import {ApplicantUserModel} from "../models/applicant-user-model";
import {PostingModel} from "../models/posting-model";

const jwt = require('jsonwebtoken');
const moment = require('moment')
const fs = require('fs');
const os = require('os');
const path = require('path');
const high = 10000000;
const low = 0;

export class ApplicationsController {
    public static async getApplications (ctx: BaseContext) {
        // get a user repository to perform operations with user
        const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-corporate');

        const companyUserModelRepository: Repository<CompanyUserModel> = getManager().getRepository(CompanyUserModel);
        const currentCompanyUser = await companyUserModelRepository.find({ relations: ["posts"], where: { id: decoded.id}});

        const postingModelRepository: Repository<PostingModel> = getManager().getRepository(PostingModel);

        let livePosts = currentCompanyUser[0].posts;
        let appList = []

        for(let i = 0; i < livePosts.length;i++){
            const queriedPost = await postingModelRepository.find({ relations: ["applications"], where: { postid:livePosts[i].postid}});
            appList.push(queriedPost[0])

        }

        // return OK status code and loaded users array
        ctx.status = 200;
        ctx.body = appList;
    }

    public static async getUserApplications (ctx: BaseContext) {
        const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-user');

        const applicantUserModelRepository: Repository<ApplicantUserModel> = getManager().getRepository(ApplicantUserModel);
        const applicant = await applicantUserModelRepository.find({ relations: ["apps"], where: { id: decoded.id}});

        const applicationModelRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);


        let applications = applicant[0].apps;
        let appList = [];

        for(let i = 0; i < applications.length;i++){
            //pass in each applications ID to get the single associated with it POST
            const posts = await applicationModelRepository.find({ relations: ["post"], where: { applicationid: applications[i].applicationid}});
            console.log(posts);
            appList.push(posts)
        }


        ctx.status = 200;
        ctx.body = appList;
    }

    public static async submitApplication (ctx: BaseContext) {
        const file = ctx.request.files.file;
        const randomfilename = parseInt((Math.random() * (high - low) + low).toString()) + "-" + file.name;

        const applicationRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);
        const newApplication = new ApplicationModel();


        const postID = ctx.request.body.id;
	    const postingModelRepository : Repository<PostingModel> = getManager().getRepository(PostingModel);
        const queriedPost = await postingModelRepository.find({ relations: ["applications"], where: { postid: postID}});

	    let currentPost = queriedPost[0];

	    const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-user');
        console.log(decoded)
        const applicantUserModelRepository: Repository<ApplicantUserModel> = getManager().getRepository(ApplicantUserModel);
        const queriedApplicantUser = await applicantUserModelRepository.find({ relations: ["apps"], where: { id: decoded.id}});
        let applicantUser = queriedApplicantUser[0];

        newApplication.userid = applicantUser.id; //from JWT
        newApplication.name = applicantUser.name; //get user from applicant entity
        newApplication.filename = randomfilename;
        newApplication.datecreated = moment().format('MMMM Do YYYY, h:mm a'); //format current time from moments
        newApplication.accepted = "pending" //default state
        newApplication.confirmed = "pending" //default state
        newApplication.meetingtime = "" //default state


        file.name = randomfilename;
        const reader = fs.createReadStream(file.path);
	    const stream = fs.createWriteStream(path.join(__dirname,"../../resumes",file.name));
        reader.pipe(stream);

        const completedApplication = await applicationRepository.save(newApplication);

        /*
        * After Application is complete add to PostModel and as well to the UsersModel
        * */

        applicantUser.apps.push(completedApplication);
        const completedApplicant = await applicantUserModelRepository.save(applicantUser);

        currentPost.applications.push(completedApplication);
        const completedPost = await postingModelRepository.save(currentPost);

        ctx.status = 200;
        ctx.body = "submitted application\n";
    }

    public static async serveDownload(ctx : BaseContext){
        const applicationRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);
        const application = await applicationRepository.findOne({ applicationid: ctx.request.body.id} );

        ctx.body = fs.createReadStream(path.join(__dirname,"../../resumes",application.filename));
        ctx.set('Content-disposition', 'attachment; filename=' + application.filename);
        ctx.status = 200;
    }

    public static async resumeName(ctx: BaseContext) {
        const applicationRepository: Repository<ApplicationModel> = getManager().getRepository(ApplicationModel);
        const application = await applicationRepository.findOne({ applicationid: ctx.request.body.id} );

        ctx.body = application.filename;
        ctx.status = 200;
    }
}
