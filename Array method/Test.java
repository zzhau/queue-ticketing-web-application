public class Test {
	public static void main(String[] args) {
		FIFOQUEUE abcd = new FIFOQUEUE();
		abcd.enqueue("1");
		abcd.enqueue("2");
		abcd.enqueue("3");
		abcd.enqueue("4");
		abcd.enqueue("5");
		abcd.enqueue("6");
		abcd.enqueue("7");
		for (String temp : abcd.getQueue()) {
			System.out.println(temp);
		}

		System.out.println("----------------------");

		System.out.println(abcd.dequeue());
		System.out.println(abcd.dequeue());
		System.out.println(abcd.dequeue());

		System.out.println("---------------------");
		for (String temp : abcd.getQueue()) {
			System.out.println(temp);
		}
	}
}