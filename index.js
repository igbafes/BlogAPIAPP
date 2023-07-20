
  const express = require('express');
   const routers = require("./Routes/routes");
  const DBconnection = require('./models/connectDB');
  const port = process.env.PORT || 3000 ;
   const cookieParser = require('cookie-parser');
   
  
  const app = express();

  //middlewares
  app.use(express.json())// to pars json data in request body/it is needed to populate req.body with the form fields
  app.use(express.urlencoded({ extended: false }));// this is needed to populate req.body with the form fields
//   app.use(express.static(path.join(__dirname, "public")));//it makes Express serve all the static files in the / public directory in the project root
   app.use(cookieParser());
   app.use(routers);

  app.listen(port, async() => {
     await DBconnection();
    console.log(`Server started on port: ${port}`)
 })