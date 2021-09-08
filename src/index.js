const express = require ('express'),
  cors = require("cors"),
  dotenv = require ('dotenv'),
  swaggerUI = require ('swagger-ui-express'),
  YAML = require ('yamljs'),
  app = express(),
  swaggerDoc = YAML.load(`${process.cwd()}/swagger.yaml`), // import swagger doc
  { PORT } = process.env; // import port from env

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc, { explorer: true }))

// import routes
const routes = require("./routes");

// enable env
dotenv.config();

// import db connection
require("./db")();

// Enable All CORS Requests
app.use(cors());

// Body-Parser Middleware
app.use(express.json({ limit: "50mb" })); // handle raw json
app.use(express.urlencoded({ limit: "50mb", extended: false })); // handle form submission

// enable routes
app.use("/api/v1", routes);

// simple route
app.get("/", (req, res) => successRes(res, 200, { message: 'Welcome to Protranslating application with nodejs, express, and mongodb.'}));

app.all('*', (req, res, next) => errorRes(next, 404, 'The Route you are requesting for does not exist'));

const port = process.env.PORT || PORT;

// error handling middleware
app.use((err,req,res,next) => {
  //console.log(err);
  // res.status(404).send({error: err.message});
  res.status(err.status >= 100 && err.status < 600 ? err.status : 500);
  res.send({
    status: err.status ? err.status : 500,
    error: err.message,
  });
});

// listen for requests
try {
  app.listen(port, () => {
    console.log(`App now running on port: ${port}`);
  });
} catch (e) {
  console.error(e);
}

module.exports = app;