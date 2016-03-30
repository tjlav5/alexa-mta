var schedule = require('./schedule.json');
var moment = require('moment');

function pad(num, size){ return ('000000000' + num).substr(-size); }

var getNextTrain = function (line, station) {

  var now = new Date();

  console.log('test');
  console.log(now);

  console.log('now', now, now.toISOString());

  var fastTime = parseInt((now.getDay() + 1) + pad(now.getHours() - 4, 2) + pad(now.getMinutes(), 2) + pad(now.getSeconds(), 2));

  console.log('now', fastTime);
  for (var i in schedule['F23N']['arrivals']) {
    console.log(schedule['F23N']['arrivals'][i]);
    if (schedule['F23N']['arrivals'][i] > fastTime) {
      // return schedule[i];
      var foo = schedule['F23N']['arrivals'][i].toString();
      return moment({
        h: parseInt(foo.substring(1, 3)) + 4,
        m: foo.substring(3, 5),
        s: foo.substring(5, 7)
      });
    }
  }

  // var now = new Date();
  // var nextTrain = null;
  // var _schedule_ = schedule[line][station]['inbound']['WKD'];

  // console.log(_schedule_);

  // var hour = now.getHours(),
  //     minute = now.getMinutes();

  // console.log(hour, minute);

  // var trainsThisHour;

  // while (!nextTrain) {

  //   trainsThisHour = _schedule_[hour];
  //   if (!trainsThisHour) {
  //     hour += 1;
  //     minute = 0;
  //     continue;
  //   }
  //   trainsThisHour = trainsThisHour.sort(function (a,b) {
  //     return a > b;
  //   }).filter(function (m) {
  //     return m >= minute;
  //   });

  //   if (trainsThisHour.length >= 1) {
  //     nextTrain = hour + ':' + trainsThisHour[0]
  //   }

  // }

  // return nextTrain;

};

module.exports = getNextTrain;

if (!module.parent) {
  console.log(getNextTrain(process.argv[2], process.argv[3]));
}
