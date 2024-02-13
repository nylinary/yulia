
var heart_svg = document.getElementById('heart_svg');
var plans_svg = document.getElementById('plans_svg');
var camera_svg = document.getElementById('camera_svg');


$(function() {
  $('#section_1').hover(function() {
    heart_svg.style.backgroundImage = 'url("static/main/images/heart_white.svg")';
  }, function() {
    // on mouseout, reset the background colour
    heart_svg.style.backgroundImage = 'url("static/main/images/heart.svg")';
  });
  $('#section_2').hover(function() {
    plans_svg.style.backgroundImage = 'url("static/main/images/plans_white.svg")';
  }, function() {
    // on mouseout, reset the background colour
    plans_svg.style.backgroundImage = 'url("static/main/images/plans.svg")';
  });
  $('#section_3').hover(function() {
    camera_svg.style.backgroundImage = 'url("static/main/images/camera_white.svg")';
  }, function() {
    // on mouseout, reset the background colour
    camera_svg.style.backgroundImage = 'url("static/main/images/camera.svg")';
  });
});