$(document).ready(function() {
  let category = getQueryVariable('category')
  let event = getQueryVariable('event');
  $("#discription").text(event.replace(/%20/g, " "));
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:3000/get-bet?category=" + category + "&event=" + event,
    success: function(result) {
        console.log(result);
        let count = 1;
        result.forEach(function(question) {
          let buttonHTML = '<div class="q' + count + '"><button class="button yes">YAY</button><button class="button no">NAY</button><p class="text title" id="choice"></p></div>'
          $('#bet').append('<div class="question"><p class="text">' + question.question + '</p>' + buttonHTML + '</div>');
          count++;
      });
      $('.button').click( function() {
        $(this).parent().children().css("opacity", "0.1");
        $(this).css("opacity", "1.0");

        if ($(this).hasClass("yes")) {
          let changeClass= $(this).parent().attr('class');
          let index = parseInt(changeClass.substring(1))-1;
          $('.right').children().remove('.' + changeClass);
          if (!$('.left').children().hasClass(changeClass)) {
            var innerData = '<p>' + result[index].question + '</p><p id="countdown"></p>';
            $('.left').append('<div class="' + changeClass + '">' + innerData + '</div>');

          }
        }
        if ($(this).hasClass("no")) {
          let changeClass= $(this).parent().attr('class');
          let index = parseInt(changeClass.substring(1))-1;
          $('.left').children().remove('.' + changeClass);
          if (!$('.right').children().hasClass(changeClass)) {
            var innerData = '<p>' + result[index].question + '</p><p id="countdown"></p>';
            $('.right').append('<div class="' + changeClass + '">' + innerData + '</div>');

          }
        }
      });
    }
  });

});

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function countDown(time) {
// Set the date we're counting down to
var countDownDate = new Date(time).getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="countdown"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);
}

function getMoney(totalAmount, yesPeople, noPeople) {
  let amount = 0;
  if (yesPeople == 0 || noPeople == 0) {
    amount = 1;
  } else if (yesPeople > noPeople) {
    amount = Math.floor(totalAmount/(noPeople+1) * 100) / 100;

  } else {
    amount = Math.floor(totalAmount/(yesPeople+1) * 100) / 100;
  }
  let fixAmount = String(amount).split(".");
  if (fixAmount.length == 1) {
    amount += ".00";
  } else if (fixAmount[1].length == 1) {
    amount += "0";
  }
  $('#money').text('$' + amount);
}