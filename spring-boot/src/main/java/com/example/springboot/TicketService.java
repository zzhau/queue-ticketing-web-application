package com.example.springboot;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

@Service
public class TicketService {
    private int number;
    private LinkedList<Integer> queue;
    private ArrayList<Integer> completedTickets;

    public TicketService() {
        number = 1;
        queue = new LinkedList<>();
    }

    // Generate the ticket number incremeneting by 1 each time starting from 0 
    public int generateNumber() {
        int temp = number;
        queue.add(temp);
        number++;
		return temp;
    }

    public Queue<Integer> checkQueue() {
        return queue;
    }

    // Returns the head of the queue if only it is not empty but does not remove it
    public int checkQueueHead() {
        if (!queue.isEmpty()) {
            return queue.peek().intValue();
        }
        else {
            return -999;
        }
    }

    // Returns the last element of the queue if only it is not empty but does not remove it
    public int checkQueueLast() {
        if (!queue.isEmpty()) {
            return queue.getLast().intValue();
        }
        else {
            return -999;
        }
    }

    // Returns the first element of the queue if only it is not empty
    public int removeQueueHead() {
        if (!queue.isEmpty()) {
            return queue.poll().intValue();
        }
        else {
            return -999;
        }
    }

    // Returns a boolean indicating whether the queue is empty
    public boolean isQueueEmpty() {
        return queue.isEmpty();
    }

    
    // Add the completed ticket number into the completed tickets list
    public void completeTicket(int ticketNumber) {
        completedTickets.add(ticketNumber);
    }
}