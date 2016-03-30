var alexa = require('alexa-app');
var getNextTrain = require('./getNextTrain');
var moment = require('moment');

var app = new alexa.app();
app.launch(function(request,response) {
	response.say('OK').send();
	// Because this is an async handler
	return false;
});

app.intent('MTAIntent', {
    slots: {
      TRAIN: 'LITERAL'
    },
    utterances: [
      'when is the next {train|TRAIN} train'
      ,'when is the next {train|TRAIN}'
    ]
  }, function(request, response) {

    response.say('Very soon!');
    var train = request.slot('TRAIN');

    var nextTrain = getNextTrain();
    console.log(nextTrain);
    // response.say(getNextTrain());


    // var nextTrainAt = getNextTrain(train, '4 Av');
    // console.log(getNextTrain(train, '4 Av'));

    // var foo = moment([2016, 3, 29]).toNow();

    response.say('The next ' + train + ' train is ' + moment(nextTrain).fromNow() + '!');

  }
);

// Connect to lambda
exports.handler = app.lambda();