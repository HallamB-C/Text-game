//Time variables
var turn = 0;
var paused = false;
var day = 0;
var week = 1;
var month = 1;
var year = 1;
var actions = [];
var eventOn = false;
//People variables
var people = 6;
var oldPeople = 0;
var popChange = 0;
//Role variables
var hunters = 0;
var woodcutters = 0;
var farmers = 0;
var miners = 0;
//Population variable
var population = (people + hunters +  woodcutters + farmers + miners);
//Building variables
var huts = 2;
var barns = 1;
var barnspace = (barns * 600);
var fields = 0;
var fieldspace = (fields * 5);
var mines = 0;
var minespace = (mines * 5);
var buildings = (huts + fields + mines);
var freespace = (huts * 10) - population;
var minFarmRate = 0;
var maxFarmRate = 7;
var food = 150;
var storedFood = 0;
var harvestFood = 0;
var prey = getRandomInt((hunters * 3), (hunters * 5));
//Wood variables
var wood = 25;
var storedWood = 0;
var lumber = (woodcutters * woodCutSkill);
//Stone variables
var stone = 0;
var storedStone = 0;
var rock = (miners * mineSkill);
//Metal variables
var metal = 0;
var storedMetal = 0;
var harvestMetal = 0;
var ore = 0;
//Gold variables
var gold = 0;
var storedGold = 0;
var harvestGold = 0;
var goldOre = 0;
//Resource total doesn't count the first 200
var totalResources = (food + wood + stone + metal + gold);
console.log(totalResources);
// variables
var consumption = ((people * 2) + (hunters * 2) + (farmers * 3) + (woodcutters * 3));
var reproduction = getRandomInt((people / 2), people);
var minRepoRate = 0;
var maxRepoRate = 28;
//Skill variables
var huntSkill = 3;
var woodCutSkill = 3;
var farmSkill = 4;
var mineSkill = 2;
//Seasons and season variables
var seasons = [
  {
    name:"Summer",
    foodMultiplier:1.5,
    bonusText:"food growth is increased"
  },
  {
    name:"Autumn",
    foodMultiplier:1,
    bonusText:"food growth is normal"
  },
  {
    name:"Winter",
    foodMultiplier:0.5,
    bonusText:"food growth is decreased"
  },
  {
    name:"Spring",
    foodMultiplier:1,
    bonusText:"food growth is normal"
  }
  ];
var season = seasons[getRandomInt(0,3)];
//Events and event variables;
// var events = [
//   {
//     name: "Great Hunt",
//     messages: ["This hunt was a good one" ,"We found an extra 20 food"],
//     length: 0,
//     stages: 1,
//     startStage: 0,
//     endStage: 1,
//     currentStage: 0,
//     conditions: hunters > 0,
//     effects: [food += 20]
//   },
//
//   {
//     name: "Bad Winter",
//     startMessage: "Winter is going to be bad this year, we'll struggle to find food.",
//     conditions: season.name == "Winter",
//     length: 84,
//     stages: 1,
//     startStage: 1,
//     endStage: 1,
//     currentStage: 0,
//     effects: [season.foodMultiplier -= 0.35 ]
//   }
// ];
var eventsList = [];
function createEvent(name, messages, length, stages, firstStage, lastStage, currentStage, conditions, effects){
  this.name = name;
  this.messages = messages;
  this.length = length;
  this.stages = stages;
  this.firstStage = firstStage;
  this.lastStage = lastStage;
  this.currentStage = currentStage;
  this.conditions = conditions;
  this.effects = effects;
  console.log(this.name + " has been created");
}
var EventOff = new createEvent(
  "Event off",
  [""],
   0,0,0,0,1,
   function(){
     return false;
   },
   function(){
     return console.log("There is no event going on");
   }
 );

var currentEvent = EventOff;
eventsList.push(EventOff);
var GreatHunt = new createEvent(
  "Great Hunt",
   ["<br>" + "This hunt was a good one", "", "<br>" + "We found an extra 20 food"],
    2, 0, 0, 0, 0,
     function(){
       return(hunters>4,GreatHunt.stage = 2 ? true : false)
     },
      function(){
        food+=20;
      }
    );
eventsList.push(GreatHunt);
console.log(eventsList);
console.log(eventsList[0].name);

//HUD stuff
var hud = document.getElementById('HUD');
var turncounter = document.getElementById('TurnCounter');
var NextTurnBtn = document.getElementById('NextTurn');
var PauseBtn = document.getElementById('Pause');
//People variables
var PeopleCount = document.getElementById('PeopleCount');
//Food variables
var FarmerCount = document.getElementById('FarmerCount');
var FoodCount = document.getElementById('FoodCount');
var GrowthCountPD = document.getElementById('GrowthCountPD');
var HungerCountPD = document.getElementById('HungerCountPD');
var GrowthCountPM = document.getElementById('GrowthCountPM');
// var HungerCountPM = document.getElementById('HungerCountPM');
//Wood variables
var WoodCount = document.getElementById('WoodCount');
var LumberCount = document.getElementById('LumberCount');
//Stone variables
var StoneCount = document.getElementById('StoneCount');
var RockCount = document.getElementById('RockCount');
//Metal variables
var MetalCount = document.getElementById('MetalCount');
var OreCount = document.getElementById('OreCount');
//Gold variables
var GoldCount = document.getElementById('GoldCount');
var GoldOreCount = document.getElementById('GoldOreCount');
//Population variables
var HutCount = document.getElementById('HutCount');
var PopulationCount = document.getElementById('PopulationCount');
var FreeSpaceCount = document.getElementById('FreeSpaceCount');
var FieldSpaceCount = document.getElementById('FieldSpaceCount');
var BarnSpaceCount = document.getElementById('BarnSpaceCount');
//Control role buttons
var AddFarmer = document.getElementById('AddFarmer');
var RemoveFarmer = document.getElementById('RemoveFarmer');
var AddWoodcutter = document.getElementById('AddWoodcutter');
var RemoveWoodcutter = document.getElementById('RemoveWoodcutter');
var AddHunter = document.getElementById('AddHunter');
var RemoveHunter = document.getElementById('RemoveHunter');
//Building buttons
var BuildHut = document.getElementById('BuildHut');
var BuildBarn = document.getElementById('BuildBarn');
var BuildField = document.getElementById('BuildField');
var BuildingCount = document.getElementById('BuildingCount');
//Event objects

function UpdateInfo(){

  //Recalculate variables
  lumber = (woodcutters * woodCutSkill);
  rock = (miners * mineSkill);
  consumption = ((people * 2) + (hunters * 2) + (farmers * 3) + (woodcutters * 3));
  prey = Math.floor(getRandomInt((hunters * 3), (hunters * 5)) * season.foodMultiplier);
  reproduction = getRandomInt((people / 2), people);
  population = (people + hunters + farmers + woodcutters);
  freespace = (huts * 5) - population;
  barnspace = (barns * 600);
  fieldspace = (fields * 5);
  buildings = (huts + barns + fields + mines);
  //Total resource
  totalResources = (food + wood + stone + metal + gold);
  //Update elements
  PeopleCount.innerHTML = people;
  HunterCount.innerHTML = hunters;
  FarmerCount.innerHTML = farmers;
  WoodcutterCount.innerHTML = woodcutters;
  FoodCount.innerHTML = food;
  WoodCount.innerHTML = wood;
  LumberCount.innerHTML = lumber + " wood";
  StoneCount.innerHTML = stone;
  RockCount.innerHTML = rock + " stone";
  MetalCount.innerHTML = metal;
  OreCount.innerHTML = ore + " metal";
  GoldCount.innerHTML = gold;
  GoldOreCount.innerHTML = goldOre + " gold";
  HungerCountPD.innerHTML = consumption + " food";
  // HungerCountPM.innerHTML = (consumption * 28) + " food per month";
  GrowthCountPD.innerHTML = Math.floor(((hunters * 3) * season.foodMultiplier)) + " food";
  // GrowthCountPM.innerHTML = (harvestFood) + " food per month";
  HutCount.innerHTML = huts;
  PopulationCount.innerHTML = population;
  FreeSpaceCount.innerHTML = freespace + " housing free";
  FieldSpaceCount.innerHTML = (fieldspace - farmers);
  BarnSpaceCount.innerHTML = Math.max((barnspace - totalResources),0);
  BuildingCount.innerHTML = buildings;
  //Print turns
  turncounter.innerHTML = "Turn: "  + turn;
  //Alter HUD
  hud.scrollTop = hud.scrollHeight;
}
//Math functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

//Event Machine
function getEvent(timePeriod, eventPos){
  if(timePeriod == "days"){
    currentEvent = eventsList[eventPos];
    console.log("Got an event, " + currentEvent.name);
  }
}

//Main update loop
function Update(){
  if(!paused){
    if(population > 0){
      //See if its the end of the week
      if(day < 7 ){
        day += 1;
        hud.innerHTML += "<br> " + "Day " + day + " has started";
      }else{

        if(week < 4){
          week += 1;
          hud.innerHTML += "<br> " + "Week " + week + " has started";
        }else{

          if(month < 12){
            month += 1;
            hud.innerHTML += "<br> " + "Month " + month + " has started";
            //Alter the seaons every 3 months
            if(month % 3 == 0){
              season = seasons[seasons.indexOf(season.name)+1];
              hud.innerHTML += "<br> " + " It is the season of "+ season.name + "; " + season.bonusText;
            }

            //Monthly productions
            //Field harvest
            food += harvestFood;
            console.log("harvestFood = " + harvestFood);
            if(fields > 0 ){
              hud.innerHTML += "<br> " + "The fields produced " + harvestFood + " food last month";
            }
            harvestFood = 0;
            //Mine harvests
            metal += harvestMetal;
            console.log("harvestMetal = " + harvestMetal);
            gold += harvestGold;
            console.log("harvestGold = " + harvestGold);
            if(mines > 0 ){
              hud.innerHTML += "<br> " + "The mines produced " + harvestMetal + " metal last month";
              hud.innerHTML += "<br> " + "The mines produced " + harvestGold + " gold last month";
            }
            //Reset harvests for beginning of month
            harvestMetal = 0;
            harvestGold = 0;
          }else{
            year += 1;
            hud.innerHTML += "<br> " + "Year " + year + " has started on turn " + turn;
            hud.innerHTML += "<br> " + "You survived a year, well done";
            //Reset month for start of year
            month = 1;
            hud.innerHTML += "<br> " + "Month " + month + " has started";
          }
          //Reset week for start of month
          week = 1;
          hud.innerHTML += "<br> " + "Week " + week + " has started";
        }
        //Reset day for start of week
        day = 1;
        hud.innerHTML += "<br> " + "Day " + day + " has started";
      }

      //Increment turn counter
      turn += 1;
      //Event check
      if(eventOn == false){
        if((getRandomInt(1,28)+day)  == 28){
          getEvent("days", 1);
          eventOn = true;
        }
      }else{
        if(currentEvent.currentStage == currentEvent.firstStage){
          hud.innerHTML += currentEvent.messages[currentEvent.firstStage];
        }
        if(currentEvent.currentStage < currentEvent.length){
          currentEvent.currentStage++;
        }else{
          currentEvent.effects();
          hud.innerHTML += currentEvent.messages[currentEvent.lastStage];
          currentEvent.currentStage = 0;
          currentEvent = eventsList[0];
          eventOn = false;
        }
      }

      //Consume resources
      if(food > 0){
        console.log("consumption is " + consumption + " before taking from food");
        food -= consumption;
      }else{
        food = 0;
        if(people > 0){
          people -= 1;
          hud.innerHTML += "<br> " + "A person has died. " + people + " people remaining. ";
        }else if (people == 0 && woodcutters > 0) {
          woodcutters -= 1;
          hud.innerHTML += "<br> " + "A Wood cutter has died. " + woodcutters + " Woodcutters remaining";
        }else if (people == 0 && woodcutters == 0 && farmers > 0) {
          farmers -= 1;
          hud.innerHTML += "<br> " + "A Farmer has died. " + farmers + " Farmers remaining. ";
        }else if (people == 0 && woodcutters == 0 && farmers == 0 && hunters > 0) {
          hunters -= 1;
          hud.innerHTML += "<br> " + "A Hunter has died. " + hunters + " Hunters remaining. ";
        }
      }

      //Buildings that require daily work, but produce monthly
      harvestFood += Math.floor((((farmers) * farmSkill) * season.foodMultiplier));
      console.log("Harvest food: " + harvestFood);

      for(var i = 0; i < miners; i++){
        if(getRandomInt((0), 5) == 5){
          harvestMetal += getRandomInt(1, mineSkill);
          console.log("Harvest metal: " + harvestMetal);
        }
        if(getRandomInt((0), 10) == 10){
          harvestGold += getRandomInt(1, mineSkill);
          console.log("Harvest gold: " + harvestGold);
        }
      }

      //Daily resource gethers
      if(totalResources+15 <= barnspace){
        food += Math.min(prey, barnspace);
      }else {
        hud.innerHTML += "<br>" + "You dont have enough room to hold more resources";
      }
      console.log("Prey is " + prey + ". After fm Prey is " + Math.floor(prey * season.foodMultiplier));
      if(totalResources+15 <= barnspace){
        wood += Math.min(lumber, barnspace);
      }else {
        hud.innerHTML += "<br>" + "You dont have enough room to hold more resources";
      }
      if(totalResources+15 <= barnspace){
        stone += Math.min(rock, barnspace);
      }else {
        hud.innerHTML += "<br>" + "You dont have enough room to hold more resources";
      }

      //People reproduce when repo rates are equal
      if(minRepoRate < maxRepoRate){
        minRepoRate += 1;
      }else{
        if(food >= (4 * freespace) && freespace >= 1){
          oldPeople = people;
          people += Math.min(reproduction, freespace);
          popChange = people - oldPeople;
          hud.innerHTML += "<br> " + "Population increased by " + popChange + " this month";
        }
        minRepoRate = 1;
      }
      UpdateInfo();
      setTimeout(function(){
        Update();
      }, 1000);
    }else{
      hud.innerHTML = "All your people died ";
    }
  }
}
//Startup function
function StartUp(){
  hud.innerHTML = "Game started will start in 20 seconds." + "<br>" + "It is the first day of the first month of the first year" + "<br> " + "Your tribe has enough food for a week and a single hut." + "<br> " + " It is the season of "+ season.name + "; " + season.bonusText + "<br> " +  "How long can you survive?";
  UpdateInfo();
  console.log("StartUp ran");
  setTimeout(function(){
    Update();
  }, 10000);
}

//Turn functions
NextTurnBtn.onclick = function(){
  if(!paused){
    //See if its the end of the week
    if(day < 7 ){
      day += 1;
      hud.innerHTML += "<br> " + "Day " + day + " has started";
    }else{

      if(week < 4){
        week += 1;
        hud.innerHTML += "<br> " + "Week " + week + " has started";
      }else{

        if(month < 12){
          month += 1;
          hud.innerHTML += "<br> " + "Month " + month + " has started";
          //Alter the seaons every 3 months
          if(month % 3 == 0){
            season = seasons[seasons.indexOf(season.name)+1];
            hud.innerHTML += "<br> " + " It is the season of "+ season.name + "; " + season.bonusText;
          }

          //Monthly productions
          //Field harvest
          food += harvestFood;
          console.log("harvestFood = " + harvestFood);
          if(fields > 0 ){
            hud.innerHTML += "<br> " + "The fields produced " + harvestFood + " food last month";
          }
          harvestFood = 0;
          //Mine harvests
          metal += harvestMetal;
          console.log("harvestMetal = " + harvestMetal);
          gold += harvestGold;
          console.log("harvestGold = " + harvestGold);
          if(mines > 0 ){
            hud.innerHTML += "<br> " + "The mines produced " + harvestMetal + " metal last month";
            hud.innerHTML += "<br> " + "The mines produced " + harvestGold + " gold last month";
          }
          //Reset harvests for beginning of month
          harvestMetal = 0;
          harvestGold = 0;
        }else{
          year += 1;
          hud.innerHTML += "<br> " + "Year " + year + " has started on turn " + turn;
          hud.innerHTML += "<br> " + "You survived a year, well done";
          //Reset month for start of year
          month = 1;
          hud.innerHTML += "<br> " + "Month " + month + " has started";
        }
        //Reset week for start of month
        week = 1;
        hud.innerHTML += "<br> " + "Week " + week + " has started";
      }
      //Reset day for start of week
      day = 1;
      hud.innerHTML += "<br> " + "Day " + day + " has started";
    }

    //Increment turn counter
    turn += 1;
    //Buildings that require daily work, but produce monthly
    harvestFood += Math.floor(((farmers * farmSkill) * season.foodMultiplier));
    console.log("Harvest food: " + harvestFood);

    for(var i = 0; i < miners; i++){
      if(getRandomInt((0), 5) == 5){
        harvestMetal += getRandomInt(1, mineSkill);
        console.log("Harvest metal: " + harvestMetal);
      }
    }
    for(var i = 0; i < miners; i++){
      if(getRandomInt((0), 10) == 10){
        harvestGold += getRandomInt(1, mineSkill);
        console.log("Harvest gold: " + harvestGold);
      }
    }

    if(eventOn = false){
      if((getRandomInt(1,10)+days) >=10){
        getEvent("day", 1);
      }
    }
    //Daily resource gethers
    food += Math.floor(prey * season.foodMultiplier);
    console.log("Prey is " + prey + ". After fm Prey is " + Math.floor(prey * season.foodMultiplier));
    wood += lumber;
    stone += rock;
    //Consume resources
    if(food > 0){
      food -= consumption;
    }else{
      food = 0;
      if(people > 0){
        people -= 1;
        hud.innerHTML += "<br> " + "A person has died. " + people + " people remaining. ";
      }else if (people == 0 && woodcutters > 0) {
        woodcutters -= 1;
        hud.innerHTML += "<br> " + "A Wood cutter has died. " + woodcutters + " Woodcutters remaining";
      }else if (people == 0 && woodcutters == 0 && farmers > 0) {
        farmers -= 1;
        hud.innerHTML += "<br> " + "A Farmer has died. " + farmers + " Farmers remaining. ";
      }else if (people == 0 && woodcutters == 0 && farmers == 0 && hunters > 0) {
        hunters -= 1;
        hud.innerHTML += "<br> " + "A Hunter has died. " + hunters + " Hunters remaining. ";
      }
    }
    //People reproduce when repo rates are equal
    if(minRepoRate < maxRepoRate){
      minRepoRate += 1;
    }else{
      if(food >= (4 * freespace) && freespace >= 1){
        oldPeople = people;
        people += Math.min(reproduction, freespace);
        popChange = people - oldPeople;
        hud.innerHTML += "<br> " + "Population increased by " + popChange + " this month";
      }
      minRepoRate = 1;
    }
    UpdateInfo();
    setTimeout(function(){
      Update();
    }, 1000);
  }else{
    hud.innerHTML = "All your people died ";
  }
}
//Pause function
function TogglePause(){
  if(paused){
    paused = false;
    Update();
    hud.innerHTML += "<br> " + "Game unpaused";
    hud.scrollTop = hud.scrollHeight;
  }else if(!paused){
    paused = true;
    hud.innerHTML += "<br> " + "Game paused";
    hud.scrollTop = hud.scrollHeight;
  }
}
//Pause button
PauseBtn.onclick = function(){
  TogglePause();
}
//Hunter functions
AddHunter.onclick = function(){
  if(people >= 1 && food >= 6 && wood >= 5){
    people -= 1;
    food -= 6;
    wood -= 5;
    hunters += 1;
    UpdateInfo();
    hud.innerHTML += "<br> " + "Day: " + turn + " | Hunter created. You have " + hunters + " Hunters";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Hunter created");
    console.log(actions);
  }else{
    hud.innerHTML += "<br> " + "Not enough resources. Hunters require 1 person, 6 food, and 5 wood You have " + people + " people, " + food + " food, and " + wood + " wood";
    hud.scrollTop = hud.scrollHeight;
  }
}
RemoveHunter.onclick = function(){
  if(hunters >= 1){
    people += 1;
    hunters -= 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Hunter removed. You have " + hunters + " Hunters";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Huner removed");
  }
}

//Farmer functions
AddFarmer.onclick = function(){
  if(people >= 1 && food >= 6 && fieldspace >= 1){
    people -= 1;
    food -= 6;
    farmers += 1;
    UpdateInfo();
    hud.innerHTML += "<br> " + "Day: " + turn + " | Farmer created. You have " + farmers + " Farmers and " + (fieldspace-1) + " spaces left for farmers";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Farmer created");
  }else{
    hud.innerHTML += "<br> " + "Not enough resources. Farmers require 1 person, 6 food, and 1 field space. You have " + people + " people, " + food + " food, and " + fieldspace + " field space";
    hud.scrollTop = hud.scrollHeight;
  }
}
RemoveFarmer.onclick = function(){
    if(farmers >= 1){
    people += 1;
    farmers -= 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Farmer removed. You have " + farmers + " Farmers";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Farmer removed");
  }
}

//Woodcutter functions
AddWoodcutter.onclick = function(){
  if(people >= 1 && food >= 6 && wood >= 2){
    people -= 1;
    food -= 6;
    wood -= 2;
    woodcutters += 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Woodcutter created. You have " + woodcutters + " Woodcutters";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Woodcutter created");
  }else{
  hud.innerHTML += "<br> " + "Not enough resources. Woodcutters require 1 person, 6 food, and 3 wood. You have " + people + " people, " + food + " food, and " + wood + " wood";
  }
}
RemoveWoodcutter.onclick = function(){
  if(woodcutters >= 1){
    people += 1;
    woodcutters -= 1;
    UpdateInfo();
    hud.innerHTML += "<br> " + "Not enough resources. Woodcutters require 1 person, 6 food, and 5 wood You have " + people + " people, " + food + " food, and " + wood + " wood";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Woodcutter removed");
  }
}

//Build functions
BuildHut.onclick = function(){
  if(people >= 2 && wood >= 20){
    wood -= 20;
    huts += 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Hut built. You have " + huts + " Huts";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Hut built");
  }
}
BuildBarn.onclick = function(){
  if(people >= 2 && wood >= 60){
    wood -= 60;
    barns += 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Barn built. You have " + barns + " Barns and " + barnspace + " barnspace";
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Barn built");
  }
}
BuildField.onclick = function(){
  if(people >= 2 && wood >= 40){
    wood -= 40;
    fields += 1;
    UpdateInfo();
    hud.innerHTML += "<br>" + "Day: " + turn + " | Field built. You have " + fields + " Fields, and " + fieldspace + " spaces for farmers";
    hud.scrollTop = hud.scrollHeight;
    hud.scrollTop = hud.scrollHeight;
    actions.unshift("Field built");
  }
}
//Start game
StartUp();
