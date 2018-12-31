import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
//import { validate, ValidationError } from 'class-validator';
import { PostingModel } from 'models/posting-model';
import {CompanyUserModel} from "../models/company-user-model";

const jwt = require('jsonwebtoken');
const moment = require('moment');

export class PostingsController {
    public static async getPostings (ctx: BaseContext) {
        // get a user repository to perform operations with user
        const postingModelRepository: Repository<PostingModel> = getManager().getRepository(PostingModel);
        // load all users
        const postings: PostingModel[] = await postingModelRepository.find();
        // return OK status code and loaded users array
        console.log(postings)
        ctx.status = 200;
        ctx.body = postings;
    }

    public static async createPosting (ctx: BaseContext) {
        const postingModelRepository: Repository<PostingModel> = getManager().getRepository(PostingModel);
        const newPosting = new PostingModel();


        const auth_header = ctx.get("Authorization");
        const token = auth_header.split(" ")[1];
        //get JWT token
        const decoded = jwt.verify(token, 'secret-corporate');

        const companyUserModelRespository: Repository<CompanyUserModel> = getManager().getRepository(CompanyUserModel);
        const corporateUser = await companyUserModelRespository.find({ relations: ["posts"], where: { id: decoded.id}});

        let currentCorporateUser = corporateUser[0];
        console.log(currentCorporateUser);

        newPosting.datecreated = moment().format('MMMM Do YYYY, h:mm a');
        newPosting.companyname = currentCorporateUser.company; //get from DB
        newPosting.salary = ctx.request.body.salary;
        newPosting.jobtitle = ctx.request.body.jobtitle;
        newPosting.jobtype = ctx.request.body.jobtype;
        newPosting.location = ctx.request.body.location;
        newPosting.description = ctx.request.body.description;
        newPosting.logo = ctx.request.body.logo;
        newPosting.owner = currentCorporateUser;

        const completedPost = await postingModelRepository.save(newPosting)
        currentCorporateUser.posts.push(completedPost);

        console.log(newPosting.postid);
        const completedUser = await companyUserModelRespository.save(currentCorporateUser);

        ctx.status = 200;
        ctx.body = "submitted application\n" + completedPost;
    }
}