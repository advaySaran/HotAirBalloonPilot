var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup(){
  //created database from firebase
  database = firebase.database();

  createCanvas(1900,963);
 
  //.ref is used to refer to a particular property in the database
  var balloonPosition = database.ref('player/position');
  //.on is used to listen to any change happening in the referred property
  //if there is a change code after "value", is executed
  balloonPosition.on("value",readPosition,showError)
}

function draw(){
  background(bg);
  if(position!== undefined)
  if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
  }
  drawSprites();
}

//write/update part of the database
function writePosition(x,y){
  database.ref('player/position').set({
      'x': position.x+x,
      'y': position.y+y
  })
}

//read part of the database
function readPosition(data){
  //whatever the changed values are will be stored in position variable
  position = data.val();  
  //the x and y of position in the database and the ball should be equal
  balloon.x = position.x
  balloon.y = position.y
}

function showError(){
console.log("this is how an error look")
}
