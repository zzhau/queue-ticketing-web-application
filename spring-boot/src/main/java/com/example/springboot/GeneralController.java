package com.example.springboot;

import java.util.Queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GeneralController {
	@Autowired
    private TicketService ticketService = new TicketService();
	private CounterService c1 = new CounterService();
	private CounterService c2 = new CounterService();
	private CounterService c3 = new CounterService();
	private CounterService c4 = new CounterService();

	/**
	 * This method maps to a GET request and used to display the counter page.
	 * 
	 * @return string "counter"
	*/
	@GetMapping("/counter")
	public String counter() {
		return "counter";   
	}

	/**
	 * This method maps to a GET request and used to display the customer page.
	 * 
	 * @return string "customer"
	 */
    @GetMapping("/customer")
	public String customer() {
		return "customer";   
	}

	/**
	 * This method maps to a POST request and generate a new ticket number.
	 * 
	 * @return integer that represents the newly generated ticket number
	 */
	@PostMapping("/generate-number")
	@ResponseBody
	public int generateNumber() {
		return ticketService.generateNumber();	
	}

	/**
	 * This method maps to a POST request and get the current queue.
	 * 
	 * @return Queue of integers that represents the current queue of ticket numbers.
	 */
	// @PostMapping("/check-queue")
	// @ResponseBody
	// public Queue<Integer> checkQueue() {
	// 	return ticketService.checkQueue();
	// }

	/**
	 * This method maps to a GET request and get the "Now Serving" number.
	 * 
	 * @return integer that represent the ticket number currently being served
	 */
	@GetMapping("/now-serving")
	@ResponseBody
	public int checkQueueHead() {
		return ticketService.checkQueueHead();
	}

	/**
	 * This method maps to a GET request and get the last number in the queue.
	 * 
	 * @return integer that represents the last ticket number in the queue.
	 */
	@GetMapping("/last-number")
	@ResponseBody
	public int checkQueueLast() {
		return ticketService.checkQueueLast();
	}

	/**
	 * This method maps to a GET request and returns an integer that represents the ticket number.
	 * 
	 * @return integer that represents the ticket number from the head of the queue
	 */
	@GetMapping("/remove-serving")
	@ResponseBody
	public int removeQueueHead() {
		return ticketService.removeQueueHead();
	}

	/**
	 * This method maps to a GET and check the status of the specified counter
	 * 
	 * @param counterName string representation of the name of the counter
	 * @return ResponseEntity with a boolean value that represents the status of a specific counter (online or offline).
	 */
	@GetMapping("/counter-status")
	public ResponseEntity<Boolean> checkStatus(@RequestParam String counterName) {
		switch(counterName) {
			case "counter1":
				return ResponseEntity.ok(c1.getStatus());
			case "counter2":
				return ResponseEntity.ok(c2.getStatus());
			case "counter3":
				return ResponseEntity.ok(c3.getStatus());
			case "counter4":
				return ResponseEntity.ok(c4.getStatus());
			default: 
				return ResponseEntity.notFound().build();
		}
	}

	/**
	 * This method maps to a POST request and updates the status of a specific counter (online or offline).
	 * 
	 * @param counterName string representation of the name of the counter
	 */
	@PostMapping("/change-status")
	@ResponseBody
	public void changeStatus(@RequestParam String counterName) {
		switch(counterName) {
			case "counter1":
				c1.updateStatus();
				break;
			case "counter2":
				c2.updateStatus();
				break; 
			case "counter3":
				c3.updateStatus();
				break;
			case "counter4":
				c4.updateStatus();
				break;
			default: 
				break;
		}
	}

	/**
	 * This method maps to a GET request and check whether the queue is empty
	 * 
	 * @return boolean that indicates whether the queue is empty.
	 */
	@GetMapping("/check-empty")
	@ResponseBody
	public boolean isEmpty() {
		return ticketService.isQueueEmpty();
	}

	/**
	 * This method maps to a POST request and marks the specified ticket number as complete.
	 * 
	 * @param ticketNumber integer representing the ticket number to be completed
	 */
	@PostMapping("/complete-ticket")
	@ResponseBody
	public void completeTicket(@RequestParam int ticketNumber) {
		ticketService.completeTicket(ticketNumber);
	}
}