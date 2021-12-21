const localStategy = require("passport-local").Strategy;
const {Sequelize,sequelize,Admin}  = require("../models");
const bcrypt = require("bcrypt");
module.exports = (passport) =>{

    
passport.serializeUser((user,done)=>{
    console.log("first working")
   done(null,user.id)
  })
  
  passport.deserializeUser((id,done)=>{
    console.log("second working")
    Admin.findByPk(id).then((user) =>{
      done(null,user)
    });
  });
  
  passport.use(new localStategy({
    usernameField: 'email',
    passwordField: 'password'
  },async(email,password,done)=>{
    console.log("st")
       var user = await Admin.findOne({where:{email}});
       if(!user) return done(null,false,{message:"email not found."});
       var hash = await bcrypt.compare(password,user.password);
       if(!hash){
        return done(null,false,{message:"password didnt match."});
       }else{
        return done(null,user);
       }
   })
  )
  
}