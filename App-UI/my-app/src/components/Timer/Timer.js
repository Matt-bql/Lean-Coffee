export default function Timer() {
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Finished";
    } else {
      document.getElementById("countdown").innerHTML =
        timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);

  return (
    <div>
      <div id='countdown'></div>
    </div>
  );
}
