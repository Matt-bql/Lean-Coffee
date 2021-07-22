export default function Timer() {
  function startTimer() {
    (function () {
      // set our end time
      const endTime = new Date().getTime() + 301 * 1000;

      // store clock div to avoid repeatedly querying the DOM
      // const clock = document.getElementById("clock");

      // calculate remaining time from now until deadline
      function getRemainingTime(deadline) {
        const currentTime = new Date().getTime();
        return deadline - currentTime;
      }

      // pad value with zero
      function pad(value) {
        return ("0" + Math.floor(value)).slice(-2);
      }

      // show time repeatedly
      function showTime() {
        const remainingTime = getRemainingTime(endTime);
        const seconds = pad((remainingTime / 1000) % 60);
        const minutes = pad((remainingTime / (60 * 1000)) % 60);

        document.getElementById("clock").innerHTML = `${minutes}:${seconds}`;

        // ensure clock only updates if a second or more is remaining
        if (remainingTime >= 1000) {
          requestAnimationFrame(showTime);
        }
      }

      // kick it all off
      requestAnimationFrame(showTime);
    })();
  }

  return (
    <div>
      <h1>Countdown Clock</h1>
      <button onClick={startTimer}>Start</button>
      <div id='clockdiv'>
        <span id='clock'></span>
      </div>
    </div>
  );
}
