var express = require("express");
var router  = express.Router();
var multer  = require('multer');
var path    = require('path');  
var passport = require('passport');
require("../middleware/passport-local")(passport);

const {Sequelize,sequelize,Admin,Category,Subcategory,Product} = require('../models');
const {isLoggedIn,isLoggedout} = require("../middleware/helpers");

router.get('/',isLoggedout,async(req, res) =>{
    // await Admin.create({
    //     email:"admin@admin.com",
    //     password:await bcrypt.hashSync("123456",10)
    // });
    res.render('login', { title: 'Express' });
});
  
router.post("/",passport.authenticate("local",{failureRedirect:'admin'}),async(req,res) =>{
    // console.log(req.user)
    req.session.save(() =>{
        res.redirect("admin/dashboard");
    })
});

// logout
router.get("/logout",async(req,res) =>{
    req.logout();
    res.redirect("/admin");
});

// dashboard 
router.get("/dashboard",isLoggedIn,async(req,res) =>{
   res.render("dashboard",{req});
});

// category
router.all("/category",isLoggedIn,async(req,res) =>{
     var category = await Category.findAll({where:{is_deleted:0},order:[['id','DESC']]});

    //  status change
     if(req.body.status){
        var category_status = await Category.findByPk(req.body.category_id);
        category_status.status = req.body.status;
        category_status.save();
        req.flash('success','Category status has been changed.');
        res.redirect('back');
     }

     res.render("category",{req,category});
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/category'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() +'-'+file.originalname)
    }
  })
  
var upload = multer({ storage: storage })
// add
router.all('/category-add',isLoggedIn,upload.single('image'),async(req,res) =>{
 const {name} = req.body;
    if(req.body.submit){
    await Category.create({
                name:name,
                image:req.file ? "/category/"+req.file.filename:'/category/default.png'
    });
    req.flash("success","Category added successfully.")
    res.redirect('/admin/category');
   }
 res.render('category/create',{req});
});

// edit
router.all('/category-edit/:id',isLoggedIn,upload.single('image'),async(req,res) =>{
    const {name} = req.body;
    var category = await Category.findByPk(req.params.id);
    if(req.body.submit){
        category.name = name;
        if(req.file){
         category.image= "/category/"+req.file.filename;
        }
        category.save();
        req.flash("success","Category updated successfully.");
        res.redirect("/admin/category");
    }
    res.render("category/create",{req,category});
});

router.get("/category-delete/:id",isLoggedIn,async(req,res) =>{
    const {id} = req.params;
    var category = await Category.findByPk(id);
    category.is_deleted=1;
    category.save();
    res.redirect('back');
})



// subcategory
router.all('/subcategory',isLoggedIn,async(req,res) =>{
    var subcategory = await Subcategory.findAll({
        where:{is_deleted:0},
        include:{model:Category,as:'category'},
        order:[['id','DESC']]
    });

    if(req.body.status){
        var subcategory = await Subcategory.findByPk(req.body.subcategory_id);
        subcategory.status = req.body.status;
        subcategory.save();
        req.flash('success','Subcategory has been updated successfully.');
        res.redirect('/admin/subcategory');
    }
    res.render('subcategory',{req,subcategory});
});





var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/subcategory'))
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() +'-'+file.originalname)
    }
  })
  
var upload = multer({ storage: storage })

router.all('/subcategory-add',isLoggedIn,upload.single('image'),async(req,res) =>{
    const {name,category_id} = req.body;
    var category = await Category.findAll({where:{is_deleted:0}});
    if(req.body.submit){
       await Subcategory.create({
            image:req.file ? "/subcategory/"+req.file.filename:"/subcategory/default.png",
            name:name,
            category_id:category_id
       });
       req.flash('success','Subcategory added successfully.');
       res.redirect('/admin/subcategory')
    }
    res.render('subcategory/create',{req,category});
})

router.all('/subcategory-edit/:id',isLoggedIn,upload.single('image'),async(req,res) =>{
    const {name,category_id} = req.body;
//   console.log("resssssssssssssssssss",req.body)
    var category = await Category.findAll({where:{is_deleted:0}});
    var subcategory = await Subcategory.findByPk(req.params.id);
    if(req.body.submit){
        // return res.json("ok");
        subcategory.name = name;
        if(req.file){
            subcategory.image = '/subcategory/'+req.file.filename;
        }
        subcategory.category_id = category_id;
        subcategory.save();
        req.flash('success','Subcategory has been updated successfully.');
        res.redirect('/admin/subcategory');
    }
    res.render('subcategory/create',{req,category,subcategory});
})


router.get('/subcategory-delete/:id',isLoggedIn,async(req,res) =>{
   var subcategory = await Subcategory.findByPk(req.params.id);
   subcategory.is_deleted =1;
   subcategory.save();
   req.flash('success','Subcategory has been deleted successfully.');
   res.redirect('back');

});




// product
router.get('/product',isLoggedIn,async(req,res) =>{
  var product = await Product.findAll({is_deleted:0});
  res.render('product',{req,product});
});


//add product
router.all('/product-add',isLoggedIn,async(req,res)=>{
    var category    = await Category.findAll({where:{is_deleted:0}});
    var subcategory = await Subcategory.findAll({where:{is_deleted:0}});
    res.render('product/create',{req,category,subcategory});
})

router.post("/get-subcategory",isLoggedIn,async(req,res) =>{
    const {category_id} =req.body;
    var subcategory = await Subcategory.findAll({where:{category_id,is_deleted:0}});
    var html ='<option value="">select</option>';
    for( var i=0; i<subcategory.length; i++){
     html+='<option value="'+subcategory[i].id+'">'+subcategory[i].name+'</option>';
    }
    return res.json(html);
})

module.exports = router;