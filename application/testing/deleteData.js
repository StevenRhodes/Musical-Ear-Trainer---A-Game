var mongojs = require('mongojs');
var db = mongojs('earTrainGame', ['users']);

db.dropDatabase();
