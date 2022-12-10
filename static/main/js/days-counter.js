var countDownDate = new Date("May 7, 2022 22:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = now - countDownDate;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML =
    "<div class=\"days\"> \
  <div class=\"time\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"time\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"time\">" + minutes + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"time\">" + seconds + "</div>seconds</div> \
</div>";
}, 1000);