var app = require('./server');
var dataSource = app.dataSources.sermonDB;
var Sermon = app.models.sermon;
var sermons = [ 
    { 
      title: "Sermon",
      subject: "Part 1",
      speaker: "God",
      private: false,
      series: "The God Series",
      date: new Date(),
      files: [
        {
          type:"Vimeo",
          url:"http://fakeurl.com"
        },
        {
          type:"Audio",
          url:"http://fakeaudiourl.com"
        }
      ],
      id: "0"
    }, {
      title: "Another Sermon",
      subject: "Part 2",
      speaker: "God again",
      private: false,
      series: "The God Series",
      date: new Date(),
      files: [
        {
          type:"Vimeo",
          url:"http://fakusurls.com"
        },
        {
          type:"Audio",
          url:"http://audiosfakusurls.com"
        }
      ],
      id: "0"
    } ];

var count = sermons.length;
dataSource.automigrate('sermon', function (err) {
  sermons.forEach(function(serm) {
    Sermon.create(serm, function(err, result) {
      if(!err) {
        console.log('Record created:', result);
        count--;
        if(count === 0) {
          console.log('done');
          dataSource.disconnect();
        }
      }
    });
  });
});