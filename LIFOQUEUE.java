public class LIFOQUEUE implements IQueuable{
	private String[] queue;


	/**
	 * Constructor to initialize an empty array of strings.
	 */
	public LIFOQUEUE() {
		queue = new String[0];
	}	


	/**
	 *  Add a string into the current queue and returns it
	 * 
	 *  @param value  A string object
	 *  @return  A list of string objects
	 */
	public String[] enqueue(String value) {
		String[] temp = new String[queue.length + 1];
		System.arraycopy(queue, 0, temp, 0, queue.length);
		temp[queue.length] = value;
		queue = temp;
		return queue;
	}


	/**
	 *  Remove the latest item added into the queue
	 * 
	 *  @return  The removed item of data type String.
	 */
	public String dequeue() {
		if (queue.length == 0) {
			return null;
		}
		String item = queue[queue.length - 1];
		String[] temp = new String[queue.length -1];
		System.arraycopy(queue, 0, temp, 0, queue.length - 1);
		queue = temp;
		return item;
	}


	/**
	 *  A getter method to access the queue attribute
	 * 
	 *  @return  An array list of String objects
	 */
	public String[] getQueue() {
		return queue;
	}


	/**
	 *  Return the size of the current queue
	 * 
	 *  @return  The size of the current queue
	 */
	public int size() {
		return queue.length;
	}
}