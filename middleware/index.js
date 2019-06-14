var Campground = require('../models/campground');
var Comment = require('../models/comments');
var User = require('../models/user');
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership= function(req,res,next){
	//is user logged in
	if(req.isAuthenticated()){
		
		Campground.findById(req.params.id,(err,foundCampground)=>{
			if(err){
				req.flash('err','Campground not found');
				res.redirect('back');
			} else{
				//does user own campground
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				} else{
					req.flash('error',"You don't have permission to do that.");
					res.redirect('back');
				}
				
			}
	});	
	} else { 
		req.flash('error','You need to be logged in to do that.');
		res.redirect('back');
	}
	
};

middlewareObj.checkCommentOwnership = function(req,res,next){
	//is user logged in
	if(req.isAuthenticated()){
		
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
			if(err){
				res.redirect('back');
			} else{
				//does user own comment
				if(foundComment.author.id.equals(req.user._id)){
					next();
				} else{
					req.flash('error',"You don't have permission to do that.");
					res.redirect('back');
				}
				
			}
	});	
	} else { 
		req.flash('error',"You need to be logged in to do that.");
		res.redirect('back');
	}
	
};

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','You need to be logged in to do that.');
	res.redirect('/login');
};


module.exports = middlewareObj;