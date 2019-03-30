$(document).ready(function() {
    countDown("Jan 5, 2021 15:37:25");
    getMoney(20, 8, 9);
});

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
  if (yesPeople > noPeople) {
    amount = Math.floor(totalAmount/noPeople * 100) / 100;
  } else {
    amount = Math.floor(totalAmount/yesPeople * 100) / 100;
  }
  $('#money').text('$' + amount);
}