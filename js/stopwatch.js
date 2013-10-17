function Stopwatch() {
  var clock = document.getElementById("clock");
  var startStop = document.getElementById("start-stop");
  var reset = document.getElementById("reset");

  var startTime = 0;
  var stopTime = 0;
  var intervalID = 0;

  startStop.addEventListener("click", function() {
    if (intervalID) {
      // Keep track of the stop time in case we restart the clock
      stopTime = Date.now();

      // Clear the interval that updates the clock
      clearInterval(intervalID);
      intervalID = 0;

      // Update the button text
      startStop.textContent = "Start";
      return;
    }

    // If we're restarting the clock, account for the paused time
    if (startTime > 0) {
      var pauseTime = Date.now() - stopTime;
      startTime = startTime + pauseTime;
    } else {
      startTime = Date.now();
    }

    // Set an interval to update the clock
    intervalID = setInterval(function() {
      var elapsedTime = Date.now() - startTime;
      clock.textContent = formatTime(elapsedTime);
    }, 100);

    // Update the button text
    startStop.textContent = "Stop";    
  });

  reset.addEventListener("click", function() {
    // If the timer is currently running, just reset the start time to now
    startTime = intervalID ? Date.now() : 0;
    stopTime = 0;
    clock.textContent = "00:00";
  });
}

// Takes a UTC timestamp and returns a formatted time string
function formatTime(timestamp) {
  var d = new Date(timestamp);

  var minutes = d.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}

document.addEventListener("DOMContentLoaded", Stopwatch);
