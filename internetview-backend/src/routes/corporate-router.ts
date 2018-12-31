import * as Router from 'koa-router';


const jwt = require('koa-jwt');
const applicationsController = require('controllers/applications');
const jobPostingsController = require('controllers/postings');
const offerController = require('controllers/offers');

export const corporateRouter = new Router({
    prefix: '/api/corporate'
});

corporateRouter.use(jwt({ secret: 'secret-corporate' }))

corporateRouter.get('/applications', applicationsController.ApplicationsController.getApplications);

//create post on the corporate account
corporateRouter.post('/createposting', jobPostingsController.PostingsController.createPosting);

corporateRouter.post('/makeoffer',offerController.OfferController.makeOffer);

corporateRouter.post('/resume',applicationsController.ApplicationsController.resumeName)
corporateRouter.post('/resume/download',applicationsController.ApplicationsController.serveDownload);







