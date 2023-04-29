package com.example.springboot;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;

@Service
public class TicketService {
    private int number;
    private LinkedList<Integer> queue;
    private ArrayList<Integer> completedTickets;

    /**
     * Constructor for the TicketService class. It initializes the number, queue and completedTickets variables.
     */
    public TicketService() {
        number = 1;
        queue = new LinkedList<>();
        completedTickets = new ArrayList<>();
    }

    /**
     * Generates the next ticket number and adds it to the end of the queue.
     * 
     * @return interger value of the newly generated ticket number
     */
    public int generateNumber() {
        int temp = number;
        queue.add(temp);
        number++;
		return temp;
    }

    /**
     * Returns the head of the queue if it is not empty.
     * 
     * @return integer value from the head of the queue
     */
    public int checkQueueHead() {
        if (!queue.isEmpty()) {
            return queue.peek().intValue();
        }
        else {
            return -999;
        }
    }

    /**
     * Returnthe last element of the queue if it is not empty but does not remove it.
     * 
     * @return integer value of the last element in the queue
     */
    public int checkQueueLast() {
        if (!queue.isEmpty()) {
            return queue.getLast().intValue();
        }
        else {
            return -999;
        }
    }

    /**
     * Removes and returns the head of the queue if it is not empty.
     * 
     * @return integer value of the head of the queue
     */
    public int removeQueueHead() {
        if (!queue.isEmpty()) {
            return queue.poll().intValue();
        }
        else {
            return -999;
        }
    }

    /**
     * Checks whether the queue is empty.
     * 
     * @return a boolean indicating whether the queue is empty
     */
    public boolean isQueueEmpty() {
        return queue.isEmpty();
    }

    /**
     * Adds the completed ticket number to the list of completed tickets.
     * 
     * @param ticketNumber integer value of the ticket number to be added to the list of completed tickets
     */
    public void completeTicket(int ticketNumber) {
        completedTickets.add(ticketNumber);
        System.out.println(completedTickets);
    }
}