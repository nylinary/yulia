const hint = document.getElementById("hint");
const hideHintBtn = document.getElementById("hide-hint");


hideHintBtn.onclick = function () {
  if (hint.style.display !== "none") {
    hint.style.display = "none";
  } else {
    hint.style.display = "block";
  }
};