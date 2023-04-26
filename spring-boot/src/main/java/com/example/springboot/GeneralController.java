package com.example.springboot;

import java.util.Queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class GeneralController {
	@Autowired
    private TicketService ticketService;

	@GetMapping("/greeting")
	public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";   // we need to return the html name to access it
	}

    @GetMapping("/customer")
	public String customer() {
		return "customer";   // we need to return the html name to access it
	}

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

	@GetMapping("/now-serving")
	@ResponseBody
	public int checkQueueHead() {
		return ticketService.checkQueueHead();
	}

	@GetMapping("/last-number")
	@ResponseBody
	public int checkQueueLast() {
		return ticketService.checkQueueLast();
	}
}