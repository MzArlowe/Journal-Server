require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

// app.use(require("./middleware/validate-jwt")); // We imported the  middleware, which will check to see if the incoming request has a token. Anything beneath the  will require a token to access, thus becoming protected. Anything above it will not require a token, remaining unprotected. Therefore, the  routes is not protected, while the  route is protected. -- With this set-up, the userController route is exposed while the journalController route is protected. -- This option is best when you have a controller or multiple controllers where all of the routes need to be restricted. -- Code is commented out because there are a few routes in the journalcontroller we will want exposed to all users. 
app.use("/journal", controllers.journalController);

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});