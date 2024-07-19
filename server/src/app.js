let express = require ('express');
let bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))

app.get('/showmyname', function (req, res){
    console.log('---------------------------------------')
    console.log('req');
    console.log('---------------------------------------')
    res.send('Nanthapong Amchek');
})



let port = 8081

app.listen(port, function(){
    console.log('server running on http://localhost:' + port)
});