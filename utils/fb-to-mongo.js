// from the sermon-api directory, call: node utils/fb-to-mongo.js pathToJSON firebaseUserId mongoUserId

var mongoose = require('mongoose');
var sermons = require(process.argv[2]).sermons;

var db = mongoose.connection;

var oldUserId = process.argv[3],
	newUserId = process.argv[4];

db.on('error', console.error);
db.once('open', function() {
	var sermonSchema = new mongoose.Schema ({
		title: String,
	    subject: String,
	    speaker: String,
	    private: Boolean,
	    series: String,
	    date: Date,
		files: [],
		clientId: mongoose.Schema.Types.ObjectId
	}, {collection: 'sermon'});

	var Sermon = mongoose.model('Sermon', sermonSchema);

	for (var sermon in sermons) {
		var thisSermon = sermons[sermon];

		var files = [];
		for (var file in thisSermon.files) {
			files.push(thisSermon.files[file]);
		}

		thisSermon.files = files;
		if (thisSermon.userId && thisSermon.userId == oldUserId) {
			thisSermon.clientId = newUserId;
			delete thisSermon.userId;

			var mySermon = new Sermon(thisSermon);
			mySermon.save(function(err, mySermon) {
				if (err) return console.error(err);
				console.dir(mySermon);
				console.dir('===============================');
			});
		} 
	}

});

mongoose.connect('mongodb://localhost/sermonAPI');
