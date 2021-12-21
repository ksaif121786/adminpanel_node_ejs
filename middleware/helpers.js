
exports.isLoggedIn =(req,res,next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect("/admin");
       }
    
exports.isLoggedout =(req,res,next)=>{
          
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect("/admin/dashboard");
       }
    
