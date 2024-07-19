const UserController = require('./controllers/UserController') 
 
module.exports = (app) => { 
  /* RESFUL Api for users management */ 
  // create user 
  app.get('/hello/:person', function (req, res) {
    console.log('hello -' + req.params.person)
    res.send('sey hello with ' + req.params.person);
})

// get user by id 
app.get('/user/:userId', function (req, res) { 
    res.send('ดูข้อมูลผู ้ใช้งาน: ' + req.params.userId) 
  }) 
   
  // get all user 
  app.get('/users', function (req, res) { 
    res.send('เรียกข้อมูลผู้ใช้งานทั้งหมด') 
  }) 
   
  // create user 
  app.post('/user/', function (req, res) { 
    res.send('ทําการสร้างผู ้ใช้งาน: ' + JSON.stringify(req.body)) 
  }) 
   
  // edit user 
  app.put('/user/:userId', function (req, res) {
    res.send('แก้ไข user คนที่ : ' + req.params.userId + ' ข้อมูลที่แก้ไข : ' + JSON.stringify(req.body));
});
   
  // delete user 
  app.delete('/user/:userId', function (req, res) { 
    res.send('ทําการลบผุ ้ใช้งาน: ' + req.params.userId + ' : ' +  
    JSON.stringify(req.body)) })
  // get all user 
  app.get('/users', 
  UserController.index   
  ) 
  }