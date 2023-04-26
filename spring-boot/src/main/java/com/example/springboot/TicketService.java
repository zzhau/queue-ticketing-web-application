package com.example.springboot;

import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Queue;

@Service
public class TicketService {
    private int number;
    private LinkedList<Integer> queue;

    public TicketService() {
        number = 1;
        queue = new LinkedList<>();
    }

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
}