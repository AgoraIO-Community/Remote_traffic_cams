import * as Router from 'koa-router';


const jwt = require('koa-jwt');
const applicationsController = require('controllers/applications');
const jobPostingsController = require('controllers/postings');
const offerController = require('controllers/offers');

export const userRouter = new Router({
    prefix: '/api/user'
});

userRouter.use(jwt({ secret: 'secret-user' }))

userRouter.post('/submitapp', applicationsController.ApplicationsController.submitApplication);

//return all postings
userRouter.get('/postings', jobPostingsController.PostingsController.getPostings);

userRouter.get('/applications', applicationsController.ApplicationsController.getUserApplications);

userRouter.post('/acceptoffer',offerController.OfferController.acceptOffer);







