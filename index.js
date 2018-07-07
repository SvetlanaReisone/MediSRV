/*
/* medisrv application lancer 
*/
"use strinct";
const app = require("./app");

//connect to MogoDB database

app.locals.connect().then(()=>{
     console.log(app.locals.name + 'connected to MongoDB');
     const port = app.locals.config.server.port;
     app.listen(port, () => {
     console.log(app.locals.name + ' Listening on port ' + port);
    })
}).catch(err=>{console.log('promise error: ', err.message);

})

