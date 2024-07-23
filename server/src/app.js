let express = require ('express');
let bodyparser = require('body-parser');
const {sequelize} = require('./models') 


const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

require("./routes")(app);



let port = process.env.PORT || config.port 
 
sequelize.sync({force: false}).then(() => { 
  app.listen(port, function () { 
    console.log('Server running on ' + port) 
  }) 
}) 
