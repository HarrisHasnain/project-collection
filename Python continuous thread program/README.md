This program communicates between 2 threads, a producer thread that generates / enqueues numbers and a producer thread that dequeues / prints them.
Both threads randomly generate a number from 1 - 10, wait that amount of seconds then either enqueue a number to the queue or deque / print a number from the queue.
The program runs in a loop that does not terminate unless the program is exited.
