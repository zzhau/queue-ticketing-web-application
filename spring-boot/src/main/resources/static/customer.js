// Get the generate number button 
const generateNumberBtn = document.getElementById("generate-number");

//Get the check queue button
const checkQueueBtn = document.getElementById("check-queue");

// Get the "Now Serving: " <label> element from customer.html
const nowServingLabel = document.getElementById("now-serving-label");

// Get the "Last Number: " <label> element from customer.html
const lastNumberLabel = document.getElementById("last-number-label");

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

            // Hide the number after 5 seconds
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
})

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
        })
        .catch(function(error) {
            console.error(error);
    });
}

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
            }
        })
        .catch(function(error) {
            console.error(error);
        })

}


// Set an interval to call the function every 3 seconds
setInterval(updateNowServingLabel, 3000);
setInterval(updateLastNumberLabel, 3000);