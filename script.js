var searchInterval = setInterval(getDocumentAndSearch, 15000);
var dataTable = document.getElementsByClassName("table-data__container")[1];
var runningHTML = document.createElement("div");
var parentNode = document.getElementsByClassName("flx-card__body")[0];
var startTime, endTime;
runningHTML.setAttribute("id", "runningSearch");
runningHTML.setAttribute("style", "text-align: center");
runningHTML.innerHTML = "<h1>Search active</h1><hr />";
parentNode.insertBefore(runningHTML, dataTable);

startTime = new Date();

function getDocumentAndSearch() {
  var numFound = 0;
  var waitingResource = 0;
  var numCompleted = 0;
  var numFailed = 0;
  var documentToSearch = document.getElementsByClassName("table-data__cell");

  for (var i = 0; i < documentToSearch.length; i++) {
    if (documentToSearch[i].innerText.indexOf("In progress") > -1) {
      numFound += 1;
    }
    if (
      documentToSearch[i].innerText.indexOf("Waiting for resource") > -1 ||
      documentToSearch[i].innerText.indexOf("Remove from queue") > -1
    ) {
      waitingResource += 1;
    }
    if (documentToSearch[i].innerText.indexOf("Completed") > -1) {
      numCompleted += 1;
    }
    if (documentToSearch[i].innerText.indexOf("Failed") > -1) {
      numFailed += 1;
    }
  }

  if (numFound === 0 && waitingResource === 0) {
    var alertMessage =
      "No more ledgers currently in progress. \nTime elapsed: ";
    endTime = new Date();

    alertMessage = alertMessage + timeDiffCalc(endTime, startTime);

    clearInterval(searchInterval);
    var element = document.getElementById("runningSearch");
    element.parentNode.removeChild(element);
  } else {
    var waitingMessage = "";
    var inProgressMessage = "";
    var completedMessage = "";
    var failedMessage = "";
    if (waitingResource > 0) {
      console.log(
        "Found " +
          waitingResource.toString() +
          " ledgers waiting to begin. Waiting"
      );
      waitingMessage =
        "<h2>Found " +
        waitingResource.toString() +
        " ledger(s) waiting to begin.</h2>";
    }
    if (numFound > 0) {
      inProgressMessage =
        "<h2>Found " + numFound.toString() + " ledger(s) in progress.</h2>";
    }
    if (numCompleted > 0) {
      completedMessage =
        "<h2>Found " + numCompleted.toString() + "ledger(s) completed.</h2>";
    }
    if (numFailed > 0) {
      completedMessage =
        "<h2>Found " + numFailed.toString() + "ledger(s) failed.</h2>";
    }
    console.log(
      "Found " + numFound.toString() + " ledger(s) in progress. Waiting"
    );
    runningHTML.innerHTML =
      "<h1>Search active</h1>" +
      completedMessage +
      failedMessage +
      waitingMessage +
      inProgressMessage +
      "<hr />";
    numFound = 0;
    waitingResource = 0;
  }
}

function timeDiffCalc(endDate, startDate) {
  let diffInMilliseconds = Math.abs(endDate - startDate) / 1000;

  // Calc days
  const days = Math.floor(diffInMilliseconds / 86400);
  diffInMilliseconds -= days * 86400;

  // Calc hours
  const hours = Math.floor(diffInMilliseconds / 3600) % 24;
  diffInMilliseconds -= hours * 3600;

  // Calc minutes
  const minutes = Math.floor(diffInMilliseconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = "";
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;
  difference +=
    minutes === 0 || minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;

  return difference;
}
