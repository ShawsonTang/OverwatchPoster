// ./mongod to run db
// mongo to run mongo shell
// show dbs
// use
// show collections
// db.pictures.drop() delete all the data.
// db.dropDatabase() to delete the current db.
// npm install method-override --save
// npm install connect-flash --save
// npm install -g nodemon, nodemon will run app.js and if we make any change to our
// file, we don't have to restart the server every time.
// heroku create
// heroku run ls
// heroku log to debug

//export DATABASEURL=mongodb://localhost/ow_pics in command line to create
//an environment variable 

// set the db url in heroku website or use heroku config:set DATABASEURL= in command line

let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
	flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
	methodOverride = require("method-override"),
    picture  = require("./models/picture"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
	expressSession = require("express-session");
    seedDB      = require("./seeds");

// requiring routes
let pictureRoutes = require("./routes/pictures");
let commentRoutes = require("./routes/comments");
let indexRoutes = require("./routes/index");

console.log(process.env.DATABASEURL);
mongoose.set("useUnifiedTopology" , true);
let url = process.env.DATABASEURL || "mongodb://localhost/ow_pics";
mongoose.connect(url, { 
	useNewUrlParser: true,
	userCreateIndex: true
}).then(() => {
	console.log("connected to db");
}).catch(err => {
	console.log("ERROR", err.message);
});		

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seed the database
// seedDB();


// PASSPORT CONFIGURATION
app.use(expressSession({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This middleware is used for add currentUser letiable to all the routes
// so that we do not have to add currentUser letiable to all the routes on by on manually
// as we did on the index route.

app.use((req, res, next) => {	

/**  Why does this line work ?
req.user is an object that gets created when a user is logged in. It holds information about the logged in user for use on the server, things like username and id.
res.locals.currentUser = req.user;  is our way of saying, make a letiable named currentUser available in all of our views (as a local letiable, hence res.locals) that way we can access it on the client side (in our view) and do things like hide/show sign up & login/logout links. 
*/
	res.locals.currentUser = req.user;
	// two lines below will give error and success from locals the value
	// retrived from the key we defined in flash
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// to get the routes we defined in routes directory.

// notice here we pass "/pictures" to get rid of the redundancy
// so the routes in pictures are no longer "/pictures" anymore, but just "/"
// we append "/pictures" to those routes.
app.use("/pictures", pictureRoutes);

// So does this commentRoutes.
app.use("/pictures/:id/comments", commentRoutes);

app.use("/", indexRoutes);

// in order to deploy in heroku, we have to write this way
// run with PORT=3000 node app.js in local
app.listen(3000, "127.0.0.1", () => {
	console.log("Overwatch Poster App has started!");
});







