var MenuOpen = false;
var tabPOS = "300px";

$("#ContentContainer").animate
(
  {
    display: [ "toggle" ],
    width: [ "toggle" ]
  },

  0
);

$("#OpenTab").click
(
  function()
  {
    toggleMenu();
  }
);

$(".option").click
(
  function (event)
  {
    let option_value = $(event.currentTarget).attr('data-value');

    $.ajax
    ({
      url: "../assets/html/" + option_value + ".html",
      context: document.body
    })
    .done(function(result) 
    {
      $("#ContentDiv").css('display', 'block');
      $("#ContentDiv").html(result);
      closeEvent();
    });
  }
);

$(".option").hover
(
  function ()
  {
    $(this).find(">:first-child").css("color", "black");
  },

  function ()
  {
    $(this).find(">:first-child").css("color", "white");
  },
);

function toggleMenu()
{
  $("#ContentContainer").animate
  (
    {
      width: [ "toggle", "swing" ],
    },

    {
      duration: 3000, queue: false
    }
  );

  $("#OpenTab").animate
  (
    {
      left: tabPOS,
    },

    {
      duration: 3000, queue: false
    }
  );

  if(!MenuOpen)
  {
    MenuOpen = !MenuOpen;
    tabPOS = "0px";
    paused = true;
  }

  else
  {
    MenuOpen = !MenuOpen;
    tabPOS = "300px";
    paused = false;
  }
}

$("#PlayGame").click(function(event)
{
  event.preventDefault();
  toggleMenu();
  startGame();
});

function closeEvent()
{
  $('#CloseContentDiv').click
  (
    function(event)
    {
      event.preventDefault();
      $('#ContentDiv').css('display', 'none');
    }
  );
}

toggleMenu();