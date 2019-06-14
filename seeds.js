var mongoose=require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comments');

var data = [
	{
		name: 'clouds rest',
	 	image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
		description: 'blah blah blah'
	},
	{
		name: 'devils bluff',
	 	image: 'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
		description: 'blah blah blah2'
	},
	{
		name: 'sun valley',
	 	image: 'https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=60',
		description: 'blah blah blah3'
	}
];

function seedDB(){
	//remove cg
	Campground.remove({},(err)=>{
		if(err){
			console.log(err);
		}	
		console.log('removed campgrounds');
		Comment.remove({},(err)=>{
			if(err){
				console.log(err);
			}	console.log('removed comments');
			data.forEach((seed)=>{
				Campground.create(seed,(err,campground)=>{
					if(err){
						console.log(err);
					} else {
						console.log('added a campground');
							Comment.create(
								{
									text:'this place is great',
									author: 'Homer'
								},(err,comment) =>{
									if(err){
										console.log(err);
									} else {
									campground.comments.push(comment);
										campground.save();
										console.log('created new comment');
									}
								}
							);
					}
				});
			});
		});
		
	});
}


	
	


module.exports = seedDB;