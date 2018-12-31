# InternetView

InternetView is an Internet Interviewing platform. It connects job applicants and employers together quickly. Rather than providing too much information to recruiters. We simply provide the ability to upload a resume/cover letter to communicate a potential hires ability. Applicants are able to view current job postings and subsequently apply to them. Upon receiving applications recruiters may schedule a meeting time to complete a video interview using the Agora API.

Our stack was built with mostly JS. The frontend utilized React to provide the user interface. We tied in the Agora SDK for video call functionality to the react application. Our backend was written in Typescript and used Koa as the http server. Koa provided the authentication API for both types of clients(user, corporate) through JSON web tokens. It as well interfaced to a Postgresql database with TypeORM. This was used to create the API middlware. In turn the react application makes calls to both the auth api and the actual api. The client and corporate pages are protected from the outside and as well from each other by the JWT tokens at the middleware level. Both the react and koa server are protected by NGINX. NGINX performs a proxy_pass to both of the services to provide access outside of the LAN.


https://devpost.com/software/internetview

https://internetview.online

https://www.internetview.online


(P.S The repository name needs to be changed from the old project of what would be . . .)
