import * as Router from 'koa-router';

const registrationController = require('controllers/registration')
const loginController = require('controllers/login')

export const authRouter = new Router({
    prefix:'/auth'
});

//login
authRouter.post('/login/user',loginController.LoginController.loginUser);

authRouter.post('/login/corporate',loginController.LoginController.loginPoster);

//register
authRouter.post('/register',registrationController.RegistrationController.registrationStart);

