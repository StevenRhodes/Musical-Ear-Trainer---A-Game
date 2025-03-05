var mongojs = require('mongojs');
var db = mongojs('earTrainGame', ['users']);
var bcrypt = require('bcryptjs');

//Users for Input
var newUser = {
    username: "dave",
    password: "pass",
    scaleScore: "3",
    intervalScore: "6",
    avatar: "/css/avatarPics/penguin.png"
}

var newUser2 = {
    username: "john",
    password: "pass",
    scaleScore: "0",
    intervalScore: "10",
    avatar: "/css/avatarPics/cyberGuy.jpg"
}

var newUser3 = {
    username: "josh",
    password: "pass",
    scaleScore: "3",
    intervalScore: "8",
    avatar: "/css/avatarPics/penguin.png"
}

var newUser4 = {
    username: "steve",
    password: "pass",
    scaleScore: "7",
    intervalScore: "6",
    avatar: "/css/avatarPics/cyberGuy.jpg"
}

var newUser5 = {
    username: "jane",
    password: "pass",
    scaleScore: "9",
    intervalScore: "5",
    avatar: "/css/avatarPics/penguin.png"
}

var newUser6 = {
    username: "eric",
    password: "pass",
    scaleScore: "4",
    intervalScore: "1",
    avatar: "/css/avatarPics/cyberGuy.jpg"
}

var newUser7 = {
    username: "jim",
    password: "pass",
    scaleScore: "8",
    intervalScore: "10",
    avatar: "/css/avatarPics/penguin.png"
}

var newUser8 = {
    username: "jory",
    password: "pass",
    scaleScore: "1",
    intervalScore: "1",
    avatar: "/css/avatarPics/cyberGuy.jpg"
}

var newUser9 = {
    username: "logan",
    password: "pass",
    scaleScore: "3",
    intervalScore: "5",
    avatar: "/css/avatarPics/penguin.png"
}

var newUser10 = {
    username: "lorry",
    password: "pass",
    scaleScore: "6",
    intervalScore: "0",
    avatar: "/css/avatarPics/cyberGuy.jpg"
}

function inputUser(newUser){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err,hash){
            newUser.password = hash;
            db.users.insert(newUser, function(err, doc){
            });
        });
    });
}

//Input Users
inputUser(newUser);
inputUser(newUser2);
inputUser(newUser3);
inputUser(newUser4);
inputUser(newUser5);
inputUser(newUser6);
inputUser(newUser7);
inputUser(newUser8);
inputUser(newUser9);
inputUser(newUser10);
