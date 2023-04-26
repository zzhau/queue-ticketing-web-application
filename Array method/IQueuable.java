interface IQueuable {
	String[] enqueue(String value);
	String dequeue();
  	String[] getQueue();
  	int size(); 
}