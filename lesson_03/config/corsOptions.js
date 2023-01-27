const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
   origin: (origin, callback) => {
      // console.log("==============================\n", allowedOrigins, "\n==============================");
      // Condition given so that items other than the doesn't access our restAPI. But then "|| !origin given because we also want our Postman to use it" 
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
         // 1st param is for error and the condition matche for those who doesn't have error
         // 2nd param is for allowed boolean whether it's a sucess so yes it is true due to condtiion match.
         callback(null, true)
      } else {
         callback(new Error('Not allowed by CORS'))
      }
   },
   credentials: true,
   optionsSuccessStatus: 200
}

module.exports = corsOptions