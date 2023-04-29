// Create BroadcastChannels to communicate with the server
const callNextChannel = new BroadcastChannel('next-num');
const completeCurChannel = new BroadcastChannel('complete-cur');
const statusChannel = new BroadcastChannel('status');

// Get references to the status buttons
const statusButton1 = document.getElementById("status1");
const statusButton2 = document.getElementById("status2");
const statusButton3 = document.getElementById("status3");
const statusButton4 = document.getElementById("status4");

// Add event listeners to each status button to call statusChange function and pass the counter name as a parameter
statusButton1.addEventListener("click", function() {statusChange("counter1")});
statusButton2.addEventListener("click", function() {statusChange("counter2")});
statusButton3.addEventListener("click", function() {statusChange("counter3")});
statusButton4.addEventListener("click", function() {statusChange("counter4")});

// Get references to the callNext buttons
const callNextButton1 = document.getElementById("callNext1");
const callNextButton2 = document.getElementById("callNext2");
const callNextButton3 = document.getElementById("callNext3");
const callNextButton4 = document.getElementById("callNext4");

// Get references to the div container for each counter on the counter page
const c1 = callNextButton1.parentNode;
const c2 = callNextButton2.parentNode;
const c3 = callNextButton3.parentNode;
const c4 = callNextButton4.parentNode;

// Add event listeners to each callNext button to call callNextNumber function and pass the counter name as a parameter
callNextButton1.addEventListener("click", function() {callNextNumber("counter1")});
callNextButton2.addEventListener("click", function() {callNextNumber("counter2")});
callNextButton3.addEventListener("click", function() {callNextNumber("counter3")});
callNextButton4.addEventListener("click", function() {callNextNumber("counter4")});

// Get references to the complete current number buttons
const completeButton1 = document.getElementById("complete1");
const completeButton2 = document.getElementById("complete2");
const completeButton3 = document.getElementById("complete3");
const completeButton4 = document.getElementById("complete4");

// Add event listeners to each complete button to call completeCurrent function and pass the counter name as a parameter
completeButton1.addEventListener("click", function() {completeCurrent("counter1")});
completeButton2.addEventListener("click", function() {completeCurrent("counter2")});
completeButton3.addEventListener("click", function() {completeCurrent("counter3")});
completeButton4.addEventListener("click", function() {completeCurrent("counter4")});


// This function changes the status of the specified counter and updates the status button text accordingly
function statusChange(counter) {
    fetch(`/change-status?counterName=${counter}`, { method: "POST"})
        .then(function() {
            // Send the counter name through the status channel to update the status on the customer page
            statusChannel.postMessage(counter);
            // Switch the button text according to the new status
            switch(counter) {
                case "counter1":
                    if ((statusButton1.textContent) === "Go Offline") {
                        statusButton1.textContent = "Go Online";
                    }
                    else {
                        statusButton1.textContent = "Go Offline";
                    }
                    break;
                case "counter2":
                    if ((statusButton2.textContent) === "Go Offline") {
                        statusButton2.textContent = "Go Online";
                    }
                    else {
                        statusButton2.textContent = "Go Offline";
                    }
                    break;
                case "counter3":
                    if ((statusButton3.textContent) === "Go Offline") {
                        statusButton3.textContent = "Go Online";
                    }
                    else {
                        statusButton3.textContent = "Go Offline";
                    }
                    break;
                case "counter4":
                    if ((statusButton4.textContent) === "Go Offline") {
                        statusButton4.textContent = "Go Online";
                    }
                    else {
                        statusButton4.textContent = "Go Offline";
                    }
                    break;
            };
        })
        .catch(function(error) {
            console.error(error);
        });
};

// This function checks if the queue is empty and displays a message if it is, otherwise it checks the status of the specified counter. 
// If the counter is online, it sends a message to the customer.js file to update the current ticket number on the customer page.
function callNextNumber(counter) {
    fetch("/check-empty", { method: "GET" })
        .then(function(response) {
            return response.json();
        })
        .then(function(empty) {
            // If the queue is empty, display the message
            if (empty) {
                const emptyMessageDiv = document.createElement("div");
                emptyMessageDiv.textContent = "No tickets in the waiting queue";
                switch(counter) {
                    case "counter1":
                        c1.appendChild(emptyMessageDiv);
                        setTimeout(function() {
                            emptyMessageDiv.style.display = "none";
                        }, 3000);
                        break;
                    case "counter2":
                        c2.appendChild(emptyMessageDiv);
                        setTimeout(function() {
                            emptyMessageDiv.style.display = "none";
                        }, 3000);
                        break;
                    case "counter3":
                        c3.appendChild(emptyMessageDiv);
                        setTimeout(function() {
                            emptyMessageDiv.style.display = "none";
                        }, 3000);
                        break;
                    case "counter4":
                        c4.appendChild(emptyMessageDiv);
                        setTimeout(function() {
                            emptyMessageDiv.style.display = "none";
                        }, 3000);
                        break;
                }
            }
            else {
                // If the counter is online, send a message to customer.js to update the current ticket number
                fetch(`/counter-status?counterName=${counter}`, { method: "GET" })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(status) {
                        if (status) {
                            callNextChannel.postMessage(counter);
                        }
                    })
                    .catch(function(error) {
                        console.error(error);
                    });
            }
        })
        .catch(function(error) {
            console.error(error);
        });
};

// This function checks the status of the specified counter and 
// only sends a message to customer.js to complete the current number if the counter is online
function completeCurrent(counter) {
    fetch(`/counter-status?counterName=${counter}`, { method: "GET" })
        .then(function(response) {
            return response.json();
        })
        .then(function(status) {
            if (status) {
                completeCurChannel.postMessage(counter);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
};