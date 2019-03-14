console.log("Script connected to html!");
// document.getElementById("addPoint").addEventListener("click", hackClick);

var correctPassword = "pass";
var correctUser = "admin";

var coins = 0;
var coinsPerSecond = 0;
var coinsPerClick = 1;
var sound = new Audio("file.wav");
var i = 2;
var exercises;
var database = firebase.database();
var score;
var req = new XMLHttpRequest();
var url = "https://incremental-project.firebaseio.com/.json";

function masterLoad(){ // kör alla tre load-funktioner (coins per second, per click och coinload i firebase)
  loadCoinLoad();
  loadPSLoad();
  loadPCLoad();
}

function loadCoinLoad(){

  var datapath = firebase.database().ref("users/anvandare/admin");
  datapath.once('value', function(dataSnapshot){
      coinsLoad = dataSnapshot.val().coinsLoad;
      coins = coinsLoad;
});
}
function loadPSLoad(){

  var datapath = firebase.database().ref("users/anvandare/admin");
  datapath.once('value', function(dataSnapshot){
      coinsPS = dataSnapshot.val().coinsPS;
      coinsPerSecond = coinsPS;
});
}
function loadPCLoad(){

  var datapath = firebase.database().ref("users/anvandare/admin");
  datapath.once('value', function(dataSnapshot){
      coinsPC = dataSnapshot.val().coinsPC;
      coinsPerClick = coinsPC;
});
}




//hämtar databas
function objects(url) {
    req.open('GET', url, true);
    req.addEventListener("load", reqListener);
    req.send();
}


//Databas info
function reqListener() {
    exercises = JSON.parse(req.response);
    document.addEventListener("keypress", compare);
    document.addEventListener("keypress", lock);

}



var userList = {

  anvandare: [{
    anvandarnamn: "admin",
    firstname: "Christoffer",
    lastname: "Larsson",
    password: "pass",
    role: "admin"
  }]
};


function closeWin(){
  lackCoins.style.display = "none";
}



function updateAnswers(path, object) {
    database.ref(path).set(object);
}


function loginFunc() {

    var user = document.getElementById("username").value;
    var losenord = document.getElementById("password").value;

if(losenord == correctPassword && user == correctUser ){
  console.log("Login sucess!");
}
else{
  console.log("Login failed!");
}
}

function adminCoin(){
  coins += 1000;
}

function saveAnswer() {
    updateAnswers("/users/" + "/anvandare/" + "/admin/" + "/coinsLoad", coins);
    updateAnswers("/users/" + "/anvandare/" + "/admin/" + "/coinsPS", coinsPerSecond);
    updateAnswers("/users/" + "/anvandare/" + "/admin/" + "/coinsPC", coinsPerClick);
}




function addPoint(){
   coins += coinsPerClick; //
  //  sound.play();
}





function increaseAddPointWithTwo(){
  if(coins >= 10){
  coinsPerClick += 1; // ökar click-kraften med 1
  coins -= 10;
}
else{
  lackCoins.style.display = "block";
}
}

function increaseAddPointWithTen(){
  if(coins >= 600){
  coinsPerClick += 9; // ökar click-kraften med 1
  coins -= 600;
}
else{
  alert("Not enough coins!");
}
}

function increaseAddPointWithFifty(){
  if(coins >= 2000){
  coinsPerClick += 49; // ökar click-kraften med 1
  coins -= 2000;
}
else{
  alert("Not enough coins!");
}
}


function gainTencoinsPerSecond(){
  if(coins >= 10){ // hur mycket man måste ha för att köpa uppgraderingen
    coinsPerSecond += 1; // hur mycket man ska få per sekund när man köper uppgraderingen
    coins -= 10; // hur mycket uppgraderingen kostar
  }
  else{
    alert("Not enough coins!");
  }
}

function gainTwentycoinsPerSecond(){
  if(coins >= 50){ // hur mycket man måste ha för att köpa uppgraderingen
    coinsPerSecond += 5; // hur mycket man ska få per sekund när man köper uppgraderingen
    coins -= 50; // hur mycket uppgraderingen kostar
  }
  else{
    alert("Not enough coins!");
  }
}

function gainFiftycoinsPerSecond(){
  if(coins >= 500){ // hur mycket man måste ha för att köpa uppgraderingen
    coinsPerSecond += 50; // hur mycket man ska få per sekund när man köper uppgraderingen
    coins -= 500; // hur mycket uppgraderingen kostar
  }
  else{
    alert("Not enough coins!");
  }
}




setInterval(function renderPoints(){
document.getElementById("showCoins").innerHTML = "Coins:" + " " + coins;
});     // här kan du sätta intervallen hur ofta den ska uppdatera


setInterval(function rendercoinsPerSecond(){
  document.getElementById("showPS").innerHTML = "Coins Per Second: " + " " + coinsPerSecond;
});

setInterval(function rendercoinsPerSecond(){
  document.getElementById("showPC").innerHTML = "Coins Per Click: " + " " + coinsPerClick;
});

setInterval(function coinPS(){
  coins += coinsPerSecond;
},1000);


// setInterval(function changeBackground(){
//   if(coinsPerSecond >= 10){
//     master = document.getElementById("master");
//     master.style.background = "url('backgroundimage.jpg') repeat left top";
//   }
// },1000);
