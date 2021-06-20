# Purpose of the project

The purpose of this project is just to provide basic code to highlight structural problem with microservice event based in scalable architecture

# What the project is composed to ?

**Gateway** -> is the API Gateway ion charge of request routing

**User Service** -> is dedicated to users, in this example there is only one action (create user)

**Mail Service** -> simulate a service that send email asynchronously

**Push notif Service** -> simulate a service that send push notification asynchronously

# What is the problem ?

Mail Service and Push notif service are listening _user.created_ event.
Everything going well until there is only one instance of every service running
But imagine Mail Service or Push Notif service scale for any reason, then we got 2 instance of the same service running (which is something could happening in real world)
So the message is handled many time by the same service, which result multiple email or push notification sending

# How to reproduce it

Services are using Redis as transporter, so you should have a redis instance running

Example with Docker `docker run --name some-redis -d redis`

Copy `.env.sample` and rename it `.env` and put right redis address

After that run `npm run start:dev` command on all folder.
Launch 2 intances of mail service or push notif services
Post request on `http://localhost:3000/posts`with any body.
As you can see, a message is logged on 3 instances ...

# An idea ?

If you have any idea to solde it, please feel free to create PR or discussion on issues
