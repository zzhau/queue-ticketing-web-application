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

	@GetMapping("/counter")
	public String counter() {
		return "counter";   // we need to return the html name to access it
	}

    @GetMapping("/customer")
	public String customer() {
		return "customer";   // we need to return the html name to access it
	}

	// Generate the ticket number incremeneting by 1 each time starting from 0 
	@PostMapping("/generate-number")
	@ResponseBody
	public int generateNumber() {
		return ticketService.generateNumber();	
	}

	@PostMapping("/check-queue")
	@ResponseBody
	public Queue<Integer> checkQueue() {
		return ticketService.checkQueue();
	}

	// Returns the head of the queue if only it is not empty but does not remove it
	@GetMapping("/now-serving")
	@ResponseBody
	public int checkQueueHead() {
		return ticketService.checkQueueHead();
	}

	// Returns the last element of the queue if only it is not empty but does not remove it
	@GetMapping("/last-number")
	@ResponseBody
	public int checkQueueLast() {
		return ticketService.checkQueueLast();
	}

	// Returns and remove the first element of the queue
	@GetMapping("/remove-serving")
	@ResponseBody
	public int removeQueueHead() {
		return ticketService.removeQueueHead();
	}

	// Get the status of the counter if it is Online then it will return True and False otherwise
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

	@GetMapping("/check-empty")
	@ResponseBody
	public boolean isEmpty() {
		return ticketService.isQueueEmpty();
	}

	@PostMapping("/complete-ticket")
	@ResponseBody
	public void completeTicket(@RequestParam int ticketNumber) {
		ticketService.completeTicket(ticketNumber);
	}
}