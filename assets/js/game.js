/*
  This is some really bad code.
  but I wrote half of it for fun in my ASP.Net class since I the class progression was taking to long.
*/
var down = {};
var $html = $("html");
var $spaceship = $("#Spaceship");
var bulletCount = 0x00;
var badGuyCount = 0x00;
var paused = false;
var gameOver = true;
var score = 0;

// X.
var X = ($("html").innerWidth() / 2) - ($spaceship.innerWidth() / 2);
$("#Spaceship").css("left", X + "px");

// Y.
var Y = ($("html").innerHeight() / 2) - ($spaceship.innerHeight() / 2);
$("#Spaceship").css("top", Y  + "px");

// Randomize background.
if(getRandomInt(2))
{
  $("#particles-js").css("background-image", 'url("assets/images/space.png")');
}

else
{
  $("#particles-js").css("background-image", 'url("assets/images/space2.jpg")');
}

function startGame()
{
  if(gameOver)
  {
    gameOver = false;
    gameLoop();
  }

  else
  {
    paused = false;
  }
}

// Shoot on click.
$("#particles-js")
.click
(
  function()
  {
    if(!paused)
    {
      shoot();
    }
  }
);

// Every game tick
function gameLoop()
{
  // Calculate dynamicly.
  const spaceshipwidth = $spaceship.innerWidth();
  const spaceshipheight = $spaceship.innerHeight();
  const widthpx = $("html").innerWidth();
  const heightpx = $("html").innerHeight();

  if(!isDead())
  {
    if(!paused)
    {
      // Arrow up.
      if ((down[38] || down[87]) && Y >= 10)
      {
        Y -= 10;
        $("#Spaceship").css("top", Y + "px");
      }

      // Arrow down.
      if ((down[40] || down[83]) && Y <= heightpx - (10 + spaceshipheight))
      {
        Y += 10;
        $("#Spaceship").css("top", Y + "px");
      }

      // Arrow left.
      if ((down[37] || down[65]) && X >= 10)
      {
        X -= 10;
        $("#Spaceship").css("left", X + "px");
      }

      // Arrow right.
      if ((down[39] || down[68]) && X <= widthpx - (10 + spaceshipwidth))
      {
        X += 10;
        $("#Spaceship").css("left", X + "px");
      }

      // Space bar / shoot.
      if(down[32] || down[69])
      {
        down[32] = false;
        down[69] = false;
        shoot();
      }

      if(getRandomInt(100) == 50)
      {
        spawnBadGuy();
      }

      $("#Score").text("Score: " + score);
    }

    setTimeout(gameLoop, 10);
  }

  else
  {
    gameOver = true;
    alert("Game Over!" + "\nYour score was: " + score);
  }
}

// Animate a shot.
function shoot()
{
  var i = 0;
  $('#Game').append('<img id="' + 'bullet' + bulletCount + '" style="position: absolute; width: 50px; height: 50px;" src="assets/images/bullet.gif"/>');
  var $bullet1 = $('#bullet' + bulletCount);
  bulletCount++;

  // Bullet Y
  $bullet1.css("top", $spaceship.css("top"));
  // Bullet X
  $bullet1.css("left", "calc(" + $spaceship.css("left") + " + 33px)");

  $('#Game').append('<img id="' + 'bullet' + bulletCount + '" style="position: absolute; width: 50px; height: 50px;" src="assets/images/bullet.gif"/>');
  var $bullet2 = $('#bullet' + bulletCount);
  bulletCount++;
  // Bullet Y
  $bullet2.css("top", $spaceship.css("top"));
  // Bullet X
  $bullet2.css("left", "calc(" + $spaceship.css("left") + " + 108px)");

  function moveShot()
  {
      if(i < 100)
      {
        var moveBullet1 = true;
        var moveBullet2 = true;

        for(var j = 0; j < badGuyCount; j++)
        {
          var $badGuyLeft = parseInt($("#badGuy" + j).css("left"));
          var $badGuyRight = parseInt($("#badGuy" + j).css("left")) + 170;
          var $badGuyTop = parseInt($("#badGuy" + j).css("top")) + 170;

          if((parseInt($bullet1.css("left")) + 30 >= $badGuyLeft && parseInt($bullet1.css("left")) <= $badGuyRight && parseInt($bullet1.css("top")) <= $badGuyTop) && (parseInt($bullet2.css("left")) + 30 >= $badGuyLeft && parseInt($bullet2.css("left")) <= $badGuyRight && parseInt($bullet2.css("top")) <= $badGuyTop))
          {
            // Destroy shot.
            $bullet1.remove();
            $bullet2.remove();
            $("#badGuy" + j).remove();
            moveBullet1 = false;
            moveBullet2 = false;
            score += 300;
            break;
          }

          else if(parseInt($bullet1.css("left")) + 30 >= $badGuyLeft && parseInt($bullet1.css("left")) <= $badGuyRight && parseInt($bullet1.css("top")) <= $badGuyTop)
          {
            // Destroy shot.
            $bullet1.remove();
            $("#badGuy" + j).remove();
            moveBullet1 = false;
            score += 100;
            break;
          }

          else if (parseInt($bullet2.css("left")) + 30 >= $badGuyLeft && parseInt($bullet2.css("left")) <= $badGuyRight && parseInt($bullet2.css("top")) <= $badGuyTop)
          {
            // Destroy shot.
            $bullet2.remove();
            $("#badGuy" + j).remove();
            moveBullet2 = false;
            score += 100;
            break;
          }
        }

        if(moveBullet1)
        {
          $bullet1.css("top", "calc(" + ($bullet1.css("top") + " - 15px)"));
        }

        if(moveBullet2)
        {
          $bullet2.css("top", "calc(" + ($bullet2.css("top") + " - 15px)"));
        }

        i++;
        setTimeout(moveShot, 30);
      }

      else
      {
        // Destroy shot.
        $bullet1.remove();
        $bullet2.remove();
      }
  }

  moveShot();
}

// spawn and animate a bad guy.
function spawnBadGuy()
{
  const widthpx = $("html").innerWidth();
  var i = 0;
  $('#Game').append('<img id="' + 'badGuy' + badGuyCount + '" style="position: absolute; width: 200px; height: 200px;" src="assets/images/astroid.gif"/>');
  var $badGuy = $('#badGuy' + badGuyCount);
  badGuyCount++;

  // badGuy Y
  $badGuy.css("top", "-200px");

  // badGuy X
  $badGuy.css("left", getRandomInt(widthpx - 200) + "px" );

  function moveBadGuy()
  {
    if(!paused)
    {
      if(i < 100)
      {
        i++;
        $badGuy.css("top", "calc(" + ($badGuy.css("top") + " + 10px)"));
        setTimeout(moveBadGuy, 60);
      }
  
      else
      {
        $badGuy.remove();
      }
    }
    
    else
    {
      setTimeout(moveBadGuy, 100);
    }
  }

  setTimeout(moveBadGuy, 100);
}

function isDead()
{
  for(var j = 0; j < badGuyCount; j++)
  {
    var $badGuyLeft = parseInt($("#badGuy" + j).css("left"));
    var $badGuyRight = parseInt($("#badGuy" + j).css("left")) + 120;
    var $badGuyTop = parseInt($("#badGuy" + j).css("top"));
    var $badGuyBottom = parseInt($("#badGuy" + j).css("top")) + 120;

    if(parseInt($spaceship.css("left")) + ($spaceship.innerWidth() - 80) >= $badGuyLeft && parseInt($spaceship.css("left")) <= $badGuyRight
    && parseInt($spaceship.css("top")) <= $badGuyBottom && parseInt($spaceship.css("top")) + $spaceship.innerHeight() - 80 >= $badGuyTop)
    {
      $("#badGuy" + j).remove();
      return true;
    }
  }

  return false;
}

// Random int.
function getRandomInt(max)
{
  return Math.floor(Math.random() * Math.floor(max));
}

// Key inputs.
document.body.addEventListener('keydown', function (e)
{
  down[e.keyCode] = true;

});

document.body.addEventListener('keyup', function (e)
{
  down[e.keyCode] = false;
});
