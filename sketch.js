var dog, sadDog, happyDog, database;
var foodS, foodStock;
var addFood;
var foodObj;
var foodStock;
var food;
var fedTime;
var  locallastfedtime;

//create feed and lastFed variable here
var feed
var lastFed

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  //create feed the dog button here
  var feedButton = createButton('Feed Dog');
  feedButton.position(700, 95)
  feedButton.mousePressed(feedDog)

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  
}

function draw() {
  background(46, 139, 87);
  foodObj.display();

  //write code to read fedtime value from the database 



  //write code to display text lastFed time here
    fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    locallastfedtime=data.val();
  });
  fill('white')
  textSize(25)
  if(locallastfedtime <12){
    text('FeedTime: '+  (locallastfedtime -12)+'am',30,30);
  }else if (locallastfedtime >= 12){
    text('FeedTime: '+  (locallastfedtime -12)+'pm',30,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDog);
  var foodStockRef = foodObj.getFoodStock();
 // var eatFood = foodObj.deductFood();
  database.ref('/').update({
    Food: foodStockRef-1
  })

  database.ref('/').update({
    FeedTime: hour() 
  })

  console.log(eatFood)
}



//function to add food in stock
function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

