package com.example.springboot;

import org.springframework.stereotype.Service;

@Service
public class CounterService {
    private boolean status;

    public CounterService() {
        status = true;
    }

    /**
     * Update the status of the counter. If it is Online(true) then make it Offline(false) and vice versa.
     */
    public void updateStatus() {
        status = !status;
    }

    /**
     * Return the status of the specific counter.
     * 
     * @return boolean value representing the current status of the counter (true if Online, false if Offline)
     */
    public boolean getStatus() {
        return status;
    }
}