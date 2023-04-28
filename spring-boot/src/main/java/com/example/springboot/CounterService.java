package com.example.springboot;

import org.springframework.stereotype.Service;

@Service
public class CounterService {
    private boolean status;

    public CounterService() {
        status = true;
    }

    // Update the status of the counter. If it is Online(true) then make it Offline(false) and vice versa.
    public void updateStatus() {
        // Meaning it is Online
        if (status == true) {
            status = false;
        }
        // Meaning it is Offline
        else {
            status = true;
        }
    }

    public boolean getStatus() {
        return status;
    }
}