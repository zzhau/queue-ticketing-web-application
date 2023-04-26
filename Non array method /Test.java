public class Test extends NoArrayLIFOQueue{
	public static void main(String[] args) {
		NoArrayLIFOQueue abcd = new NoArrayLIFOQueue();
		abcd.enqueue("1");
		abcd.enqueue("2");
		abcd.enqueue("3");
		abcd.enqueue("4");
		abcd.enqueue("5");
		abcd.enqueue("6");
		abcd.enqueue("7");
		abcd.enqueue("8");
		abcd.enqueue("9");
		abcd.enqueue("10");
		abcd.enqueue("11");
		for (String temp : abcd.getQueue()) {
			System.out.println(temp);
		}

		System.out.println("----------------------");

		System.out.println(abcd.dequeue());
		System.out.println(abcd.dequeue());
		System.out.println(abcd.dequeue());
		System.out.println(abcd.dequeue());
		



		System.out.println("----------------------");
		for (String temp : abcd.getQueue()) {
			System.out.println(temp);
		}
	}
}