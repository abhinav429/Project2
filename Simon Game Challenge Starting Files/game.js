var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function startOver(){
  started=false
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence(), 1000)
      userClickedPattern = []
    }
  } else {
    $("h1").text("Game Over,Press any key to restart")
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    playSound("wrong")
    startOver()
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

function nextSequence(randomNumber) {
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id")
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
})
$(document).on("keydown", function() {
  if (started === false) {
    $("#level-title").text("Level " + level)
    nextSequence();
    started = true;
  }
})
