var express=require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');

//INDEX route - show all campgrounds
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//CREATE ROUTE - create new campgrounds
router.post('/',middleware.isLoggedIn,(req, res)=>{
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name, price: price,image: image, description: desc, author: author};
	Campground.create(newCampground, (err, newlyCreated)=>{
		if(err){
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

//NEW route - show form to create campground
router.get('/new',middleware.isLoggedIn, (req,res)=>{
	res.render('campgrounds/new');
});


//SHOW
router.get('/:id', (req,res)=>{
	Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground)=>{
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
			res.render('campgrounds/show',{campground:foundCampground});
		}
	});
});

//edit campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership,(req,res)=>{	
	Campground.findById(req.params.id,(err,foundCampground)=>{
		res.render('campgrounds/edit', {campground: foundCampground});
	});	
});

//update campground route
router.put('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,updatedCampground)=>{
		if(err){
			res.redirect('/campgrounds');
		} else{
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//Destroy campground route
router.delete('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findByIdAndRemove(req.params.id,(err)=>{
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	});
});



module.exports = router;