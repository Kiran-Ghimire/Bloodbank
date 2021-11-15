var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
const { check, validationResult } = require('express-validator');

module.exports = router;



router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
    db.getAllemployee(function(err,result){
        res.render('donor/donors.ejs',{employee : result});

    });
   
});

router.get('/adddonor',function(req,res){
    res.render('donor/addDonor.ejs');
});

router.post('/adddonor',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var contact = req.body.contact;
    var join_date = req.body.date;
    var role = req.body.role;
    var salary = req.body.salary;

    db.add_employee(name,email,contact,join_date,role,salary,function(err,result){
        console.log('Donor inserted!!');
        res.redirect('/donors');
    });

});






router.get('/editdonor/:id',function(req,res){
    var id = req.params.id;
    db.getEmpbyId(id,function(err,result){

        res.render('donor/editDonor.ejs' ,{list : result});
    });
});



router.post('/editdonor/:id',function(req,res){
    var id = req.params.id;
    db.editEmp(id,req.body.name,req.body.email,req.body.contact,req.body.date,req.body.role,function(err,result){
        res.redirect('/donors');
    });

});

router.get('/deletedonor/:id',function(req,res){
    var id = req.params.id;
    db.getEmpbyId(id,function(err,result){

        res.render('donor/deleteDonor.ejs' ,{list : result});
    });
});

router.post('/deletedonor/:id',function(req,res){
    var id = req.params.id;
    
    db.deleteEmp(id,function(err,result){
        res.redirect('/donors');
    });

});

router.post('/search',function(req,res){
    var key = req.body.search;
    db.searchEmp(key,function(err,result){
        console.log(result);
        
        res.render('donor/donors.ejs',{employee : result});
    });
});


// router.post('/add_leave',[
//     check('name').notEmpty(),
//     check('id').notEmpty(),
//     check('leave_type').notEmpty(),
//     check('from').notEmpty().withMessage('select a date'),
//     check('to').notEmpty().withMessage('select a date'),
//     check('reason').notEmpty().withMessage('Specify Reason')
// ],function(req,res){

    
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(422).json({ errors: errors.array() });
//       }

//     db.add_leave(req.body.name,req.body.id,req.body.leave_type,req.body.from,req.body.to,req.body.reason,function(err,result){
//         res.redirect('/employee/leave');
//     });
// }); 