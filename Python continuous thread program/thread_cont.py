import threading
import random
import time

class CircularQueue:
    def __init__(self, size):
        self.size = size
        self.queue = [None for i in range(size)]
        self.head = self.tail = -1
        self._lock = threading.Lock()
        self._not_full = threading.Condition(self._lock)
        self._not_empty = threading.Condition(self._lock)

    def lock(self):
        self._lock.acquire()

    def unlock(self):
        self._lock.release()

    def enqueue(self, data):
        with self._not_full:
            while (self.tail + 1) % self.size == self.head:
                self._not_full.wait(1)
            if self.head == -1:
                self.head = 0
            self.tail = (self.tail + 1) % self.size
            self.queue[self.tail] = data
            self._not_empty.notify()

    def dequeue(self):
        with self._not_empty:
            while self.head == -1:
                self._not_empty.wait(1)
            data = self.queue[self.head]
            if self.head == self.tail:
                self.head = self.tail = -1
            else:
                self.head = (self.head + 1) % self.size
            self._not_full.notify()
            return data

def producer():
    while True:
        data = random.randint(1, 10)
        time.sleep(data)
        q.enqueue(data)

def consumer():
    while True:
        data = random.randint(1, 10)
        time.sleep(data)
        print(q.dequeue())

if __name__ == '__main__':
    q = CircularQueue(5)
    t1 = threading.Thread(target=producer)
    t2 = threading.Thread(target=consumer)
    t1.start()
    t2.start()
    t1.join()
    t2.join()