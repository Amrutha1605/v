//Create variables here
var dog,Food,foodstock,database;
var dimage,dhimage;

function preload()
{
	//load images here
  dimage=loadImage('images/dogImg.png');
  dhimage=loadImage('images/dogImg1.png');
  
}

function setup() {
	createCanvas(500, 500);
  database=firebase.database();
  foodstock=database.ref("Food");
  foodstock.on("value",readStock);

  dog=createSprite(200,250,50,50);
  dog.addImage(dimage);
  dog.scale=0.5;

}


function draw() {  
  background(46,139,87);
  
  if(Food!== undefined){
  stroke("blue");
  fill("yellow");
  textSize(20);
  text("Press UP_ARROW to feed the Doleres Milk",100,30);
  text("Food remaining:"+Food,200,450)
 
  if(keyWentDown(UP_ARROW)){
    writeStock(Food);
    dog.addImage(dhimage);
  }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dimage);
    }

    if(Food===0){
      Food=20;
    } 

    drawSprites();
  }
 
 }



function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  });
}


function readStock(data){
  Food= data.val();
  
  }

