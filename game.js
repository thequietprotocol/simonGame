// Declarations
var game_colors = ["green", "red", "yellow", "blue"];
var level = 0;
var current = 0;
var gameSequence = [];
var green_audio = new Audio("sounds/green.mp3");
var red_audio = new Audio("sounds/red.mp3");
var yellow_audio = new Audio("sounds/yellow.mp3");
var blue_audio = new Audio("sounds/blue.mp3");
var wrong = new Audio("sounds/wrong.mp3");
var audios = {"green":green_audio, "red":red_audio, "yellow":yellow_audio, "blue":blue_audio};

//Starting and Restarting the game
$(document).on("click", function(){
  setTimeout(function(){
    if(level === 0)
      nextOne();
  }, 300);

});

// Event Listening
$(".btn").click(function(){
  // console.log(gameSequence);
  // console.log(userSequence);
  clicked = event.target.id;
  animate(clicked);
  check_answer(clicked);
  levelUp();
});

// Funtions
function levelUp(){         //To check if the current level is done or not
                            //And move onto the next one if done
  if(current === gameSequence.length - 1)
  {
    setTimeout(function() {
      current = 0;
      nextOne();
    }, 500);
  }
  else
    current++;
}

function nextOne(){       //To generate the next random color on on successful completion
  level++;
  current = 0;
  $("h1").text("Level "+level);
  var rand = Math.floor(Math.random() * 4);
  animate(game_colors[rand]);
  gameSequence.push(game_colors[rand]);
}

function animate(color){      //To animate the tiles on clicking
  $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);
  audios[color].play();
}

function check_answer(clicked){       //Check if the answer is right and if not, alert
  if(clicked !== gameSequence[current]){
    wrong.play();
    $("h1").text("Game Over. Press any Key to Restart!");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    level = 0;
    gameSequence = [];
  }
}
