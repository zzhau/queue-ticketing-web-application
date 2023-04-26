public class NoArrayFIFOQueue implements IQueuable{
	private String[] queue;
	private int size;


	/**
     * Constructor to initialize an empty array of strings.
     */
	public NoArrayFIFOQueue() {
		queue = new String[0];
		size = 0;
	}	


	/**
     * Add a string into the current queue and returns it
     * 
     * @param value A string object
     * @return A list of string objects
     */
	public String[] enqueue(String value) {

		String[] temp = new String[size + 1];
		for (int i=0; i < size; i++) {
			temp[i] = queue[i];
		}

		temp[size] = value;
		queue = temp;
		size++;
		return queue;
	}

	/**
     * Remove the earliest item added into the queue
     * 
     * @return The removed item of data type String.
     */
	public String dequeue() {

		if (size == 0) {
			return null;
		}

		String item = queue[0];

		String[] temp = new String[size - 1];
		for (int i=0; i < size-1; i++) {
			temp[i] = queue[i + 1];
		}

		queue = temp;
		size--;
		return item;
	}


	/**
     * A getter method to access the queue attribute
     * 
     * @return A list of String objects
     */
    public String[] getQueue() {
        return queue;
    }


    /**
     * Return the size of the current queue
     * 
     * @return The size of the current queue
     */
    public int size() {
        return size;
    }
}