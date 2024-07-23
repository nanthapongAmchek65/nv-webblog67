
module.exports = { 
    // get all user 
    index (req, res) { 
    res.send('ดูข้อมูล user ทุกคน') 
    }, 

    // create user 
    create (req, res) { 
    res.send('ทําการสร้างผู ้ใช้งาน: ' + JSON.stringify(req.body.username));
    }, 

    // put user
    put(req, res){
        res.send('แก้ไข user คนที่ ' + req.params.userId + 'ข้อมูลที่แก้ไข ' + JSON.stringify(req.body));
    },

    //remove user
    remove(req, res){
        res.send('ลบ user คนที่ ' +req.params.userId);
    },
      // get user by id 
      show (req, res) { 
        res.send('ดูข้อมูลผู ้ใช้งานทั้งหมด')
      }
    }