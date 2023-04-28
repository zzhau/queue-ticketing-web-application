// Get the generate number button 
const generateNumberBtn = document.getElementById("generate-number");

//Get the check queue button
const checkQueueBtn = document.getElementById("check-queue");

// Get the "Now Serving: " <label> element from customer.html
const nowServingLabel = document.getElementById("now-serving-label");

// Get the "Last Number: " <label> element from customer.html
const lastNumberLabel = document.getElementById("last-number-label");

// Get the Element to display the current counter serving number
const c1Number = document.getElementById("c1-num");
const c2Number = document.getElementById("c2-num");
const c3Number = document.getElementById("c3-num");
const c4Number = document.getElementById("c4-num");

// Get the Element to display the current counter status
const c1Status = document.getElementById("c1dot");
const c2Status = document.getElementById("c2dot");
const c3Status = document.getElementById("c3dot");
const c4Status = document.getElementById("c4dot");

// Get the Div that stores each counter
const c1Div = c1Number.parentNode;
const c2Div = c2Number.parentNode;
const c3Div = c3Number.parentNode;
const c4Div = c4Number.parentNode;

// Broadcast Channel API to communicate between two website
const channel = new BroadcastChannel('app-data');
const channel2 = new BroadcastChannel('channel2');


// Send an HTTP Post request to the backend and display the ticket number before disappearing
generateNumberBtn.addEventListener("click", function() {
    // Send an HTTP POST request backend
    fetch("/generate-number", { method: "POST" })
        .then(function(response) {
            return response.json();
        })
        .then(function(number) {
            // Display the generated number to the user
            const numberDiv = document.createElement("div");
            numberDiv.textContent = "Your number is: " + number;

            const firstDiv = document.querySelector(".container");
            firstDiv.appendChild(numberDiv);

            // Hide the number after 3 seconds
            setTimeout(function() {
                numberDiv.style.display = "none";
            }, 3000);
        })
        .catch(function(error) {
            console.error(error);
        });
    updateLastNumberLabel();
});

// Send an HTTP Post request to the backend and then display the current queue
checkQueueBtn.addEventListener("click", function() {
    fetch("/check-queue", { method: "POST" })
        .then(function(response) {
            return response.json();
        })
        .then(function(queue) {
            // Display the generated number to the user
            const numberDiv = document.createElement("div");
            numberDiv.textContent = "Queue is " + queue;

            const firstDiv = document.querySelector(".container");
            firstDiv.appendChild(numberDiv);

            // Hide the number after 5 seconds
            setTimeout(function() {
                numberDiv.style.display = "none";
            }, 3000);
        })
        .catch(function(error) {
            console.error(error);
        });
});

// Function to update the Now Serving label with the first element of the queue
function updateNowServingLabel() {
    // Send an HTTP GET request to the backend to get the current number
    fetch("/now-serving", { method: "GET" })
        .then(function(response) {
            return response.json();
        })
        .then(function(number) {
            // Update the label with the current number if the queue is not empty
            if (number != -999) {
                nowServingLabel.textContent = "Now Serving: " + number;
            }
            else {
                nowServingLabel.textContent = "Now Serving: ";
            }
        })
        .catch(function(error) {
            console.error(error);
    });
};

// Function to update the Last Number label with the last element of the queue
function updateLastNumberLabel() {
    fetch("/last-number", { method: "GET" })
        .then(function(response) {
            return response.json();
        }) 
        .then(function(number) {
            // Update the label with the last number if the queue is not empty
            if (number != -999) {
                lastNumberLabel.textContent = "Last Number: " + number;
                c1Status.style.color = "red";
            }
        })
        .catch(function(error) {
            console.error(error);
        })

};

// Update the current number if the counter is online
channel.addEventListener("message", (event) => {
    fetch("/remove-serving", { method: "GET" })
        .then(response => response.json())
        .then(data => {
            switch(event.data) {
                case "counter1":
                    console.log("Hi");
                    c1Number.textContent = data;
                    break;
                case "counter2":
                    c2Number.textContent = data;
                    break;
                case "counter3":
                    c3Number.textContent = data;
                    break;
                case "counter4":
                    c4Number.textContent = data;
                    break;
                default: 
                    break;
            };
            updateNowServingLabel();
        });
});

channel2.addEventListener("message", (event) => {
    switch(event.data) {
        case "counter1":
            if (c1Number.textContent != "") {
                fetch(`/complete-ticket?ticketNumber=${c1Number.textContent}`, { method: "POST"});
                c1Number.textContent = "";
            }
            break;
        case "counter2":
            if (c2Number.textContent != "") {
                fetch(`/complete-ticket?ticketNumber=${c2Number.textContent}`, { method: "POST"});
                c2Number.textContent = "";
            }
            break;
        case "counter3":
            if (c3Number.textContent != "") {
                fetch(`/complete-ticket?ticketNumber=${c3Number.textContent}`, { method: "POST"});
                c3Number.textContent = "";
            }
            break;
        case "counter4":
            if (c4Number.textContent != "") {
                fetch(`/complete-ticket?ticketNumber=${c4Number.textContent}`, { method: "POST"});
                c4Number.textContent = "";
            }
            break;
        default: 
            break;
    };
});


// Update the counter based on the current status
function updateCounterStatus(counterName) {
    fetch (`/counter-status?counterName=${counterName}`, { method: "GET"})
        .then(function(response) {
            return response.json();
        })
        .then(function(online) {
            if (online) {
                switch(counterName) {
                    // Counter is online and we want to check if they are serving any customer
                    case "counter1":
                        c1Div.style.backgroundColor = "";
                        if (c1Number.textContent ==="Offline") {
                            c1Number.textContent = "";
                        }
                        if (c1Number.textContent === "") {
                            c1Status.style.backgroundColor = "green";
                        }
                        else {
                            c1Status.style.backgroundColor = "red";
                        }
                        break;
        
                    case "counter2":
                        c2Div.style.backgroundColor = "";
                        if (c2Number.textContent ==="Offline") {
                            c2Number.textContent = "";
                        }
                        if (c2Number.textContent === "") {
                            c2Status.style.backgroundColor = "green";
                        }
                        else {
                            c2Status.style.backgroundColor = "red";
                        }
                        break;
        
                    case "counter3":
                        c3Div.style.backgroundColor = "";
                        if (c3Number.textContent ==="Offline") {
                            c3Number.textContent = "";
                        }
                        if (c3Number.textContent === "") {
                            c3Status.style.backgroundColor = "green";
                        }
                        else {
                            c3Status.style.backgroundColor = "red";
                        }
                        break;
                    
                    case "counter4":
                        c4Div.style.backgroundColor = "";
                        if (c4Number.textContent ==="Offline") {
                            c4Number.textContent = "";
                        }
                        if (c4Number.textContent === "") {
                            c4Status.style.backgroundColor = "green";
                        }
                        else {
                            c4Status.style.backgroundColor = "red";
                        }
                        break;         
                }
            }
            // Counter is offline
            else {
                switch(counterName) {
                    case "counter1":
                        c1Status.style.backgroundColor = "gray";
                        c1Number.textContent = "Offline";
                        c1Div.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
                        break;
        
                    case "counter2":
                        c2Status.style.backgroundColor = "gray";
                        c2Number.textContent = "Offline";
                        c2Div.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
                        break;
        
                    case "counter3":
                        c3Status.style.backgroundColor = "gray";
                        c3Number.textContent = "Offline";
                        c3Div.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
                        break;
                    
                    case "counter4":
                        c4Status.style.backgroundColor = "gray";
                        c4Number.textContent = "Offline";
                        c4Div.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
                        break;         
                }
            }
        })
        .catch(function(error) {
            console.error(error);
        })
};


// Set an interval to call the function every 3 seconds
setInterval(updateNowServingLabel, 3000);
setInterval(updateLastNumberLabel, 3000);
setInterval(function() {
    updateCounterStatus("counter1");
    updateCounterStatus("counter2");
    updateCounterStatus("counter3");
    updateCounterStatus("counter4");
}, 2000);