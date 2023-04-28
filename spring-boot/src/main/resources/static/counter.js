const channel = new BroadcastChannel('app-data');
const channel2 = new BroadcastChannel('channel2');

// Get references to the status buttons
const statusButton1 = document.getElementById("status1");
const statusButton2 = document.getElementById("status2");
const statusButton3 = document.getElementById("status3");
const statusButton4 = document.getElementById("status4");

// Each Call Next button will call the statusChange function while indicating which counter they are from
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

// Each Call Next button will call the callNextNumber function while indicating which counter they are from
callNextButton1.addEventListener("click", function() {callNextNumber("counter1")});
callNextButton2.addEventListener("click", function() {callNextNumber("counter2")});
callNextButton3.addEventListener("click", function() {callNextNumber("counter3")});
callNextButton4.addEventListener("click", function() {callNextNumber("counter4")});

// Get references to the complete current number buttons
const completeButton1 = document.getElementById("complete1");
const completeButton2 = document.getElementById("complete2");
const completeButton3 = document.getElementById("complete3");
const completeButton4 = document.getElementById("complete4");

// Give each of those button to call the completeCurrent function on click 
completeButton1.addEventListener("click", function() {completeCurrent("counter1")});
completeButton2.addEventListener("click", function() {completeCurrent("counter2")});
completeButton3.addEventListener("click", function() {completeCurrent("counter3")});
completeButton4.addEventListener("click", function() {completeCurrent("counter4")});


// Change the status button from Go Offline to Go Online and vice versa 
function statusChange(counter) {
    switch(counter) {
        case "counter1":
            fetch(`/change-status?counterName=counter1`, { method: "POST" })
            if ((statusButton1.textContent) === "Go Offline") {
                statusButton1.textContent = "Go Online";
            }
            else {
                statusButton1.textContent = "Go Offline";
            }
            break;
        case "counter2":
            fetch(`/change-status?counterName=counter2`, { method: "POST" })
            if ((statusButton2.textContent) === "Go Offline") {
                statusButton2.textContent = "Go Online";
            }
            else {
                statusButton2.textContent = "Go Offline";
            }
            break;
        case "counter3":
            fetch(`/change-status?counterName=counter3`, { method: "POST" })
            if ((statusButton3.textContent) === "Go Offline") {
                statusButton3.textContent = "Go Online";
            }
            else {
                statusButton3.textContent = "Go Offline";
            }
            break;
        case "counter4":
            fetch(`/change-status?counterName=counter4`, { method: "POST" })
            if ((statusButton4.textContent) === "Go Offline") {
                statusButton4.textContent = "Go Online";
            }
            else {
                statusButton4.textContent = "Go Offline";
            }
            break;
    }
};

// Check the status of the specific counter and call the function to update the counter current number 
// on the custommer page. If the current queue is empty, it will display a message instead specifying there 
// are no tickest in the queue.
function callNextNumber(counter) {
    fetch("/check-empty", { method: "GET" })
        .then(function(response) {
            return response.json();
        })
        .then(function(empty) {
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
                fetch(`/counter-status?counterName=${counter}`, { method: "GET" })
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(status) {
                        if (status) {
                            channel.postMessage(counter);
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

// 
function completeCurrent(counter) {
    fetch(`/counter-status?counterName=${counter}`, { method: "GET" })
        .then(function(response) {
            return response.json();
        })
        .then(function(status) {
            if (status) {
                console.log("hi");
                channel2.postMessage(counter);
            }
        })
        .catch(function(error) {
            console.error(error);
        });
};