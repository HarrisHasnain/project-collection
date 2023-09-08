import sys
sys.path.append('./datastructures')
from nodes.DNode import Node
from linear.DLL import DoublyLinkedList

class CircularDoublyLinkedList:

    def __init__(self, init_value = None):
        if init_value is None:
            self.head = None
            self.size = 0
        else:
            if isinstance(init_value, Node):
                init_value.prev = init_value
                init_value.next = init_value
                self.head = init_value
                self.size = 1
                return
            init_node = Node(init_value)
            init_node.prev = init_node
            init_node.next = init_node
            self.head = init_node
            self.size = 1

    def InsertHead(self, value):
        new_node = Node(value)
        if self.head is None:
            new_node.prev = new_node
            new_node.next = new_node
        else:
            new_node.prev = self.head.prev
            new_node.next = self.head
            self.head.prev.next = new_node
            self.head.prev = new_node
        self.head = new_node
        self.size += 1

    def InsertTail(self, value):
        new_node = Node(value)
        if self.head is None:
            new_node.prev = new_node
            new_node.next = new_node
            self.head = new_node
        else:
            new_node.prev = self.head.prev
            new_node.next = self.head
            self.head.prev.next = new_node
            self.head.prev = new_node
        self.size += 1

    def Insert(self, value, position):
        if position < 1 or position > self.size + 1:
            raise IndexError('Index out of range')
        if position == 1:
            self.InsertHead(value)
        elif position == self.size + 1:
            self.InsertTail(value)
        else:
            new_node = Node(value)
            current_node = self.head
            for i in range(1, position-1):
                current_node = current_node.next
            new_node.prev = current_node
            new_node.next = current_node.next
            current_node.next.prev = new_node
            current_node.next = new_node
            self.size += 1

    def Search(self, value):
        found_val = DoublyLinkedList.Search(self, value)
        return found_val

    def DeleteHead(self):
        if self.head is None:
            return
        if self.size == 1:
            self.head = None
        else:
            self.head.next.prev = self.head.prev
            self.head.prev.next = self.head.next
            self.head = self.head.next
        self.size -= 1

    def DeleteTail(self):
        if self.head is None:
            return
        if self.size == 1:
            self.head = None
        else:
            self.head.prev.prev.next = self.head
            self.head.prev = self.head.prev.prev
        self.size -= 1

    def Delete(self, value):
        if self.head is None:
            return
        current_node = self.head
        while current_node.value != value:
            current_node = current_node.next
            if current_node == self.head:
                return
        if self.size == 1:
            self.head = None
        elif current_node == self.head:
            self.head = self.head.next
        current_node.prev.next = current_node.next
        current_node.next.prev = current_node.prev
        self.size -= 1

    def Clear(self):
        DoublyLinkedList.Clear(self)

    def IsSorted(self):
        sorted = DoublyLinkedList.IsSorted(self)
        return sorted

    def SortedInsert(self, value):
        if self.head is None:
            self.InsertHead(value)
            return
        sorted = self.IsSorted()
        if sorted == False:
            self.Sort()
        current_node = self.head
        new_node = Node(value)
        if current_node.value >= value:
            new_node.next = current_node
            new_node.prev = current_node.prev
            current_node.prev.next = new_node
            current_node.prev = new_node
            self.head = new_node
        else:
            while current_node.next != self.head and current_node.next.value < value:
                current_node = current_node.next
            new_node.next = current_node.next
            new_node.prev = current_node
            current_node.next.prev = new_node
            current_node.next = new_node
        self.size += 1

    def Sort(self):
        if self.head is None:
            return
        sorted_list = CircularDoublyLinkedList(self.head.value)
        current_node = self.head.next
        while current_node != self.head:
            sorted_list.SortedInsert(current_node.value)
            current_node = current_node.next
        self.head = sorted_list.head

    def Print(self):

        print("\n")

        length = self.size
        sorted = self.IsSorted()
        
        print("List length:", length)
        if sorted:
            print("Sorted: Yes")
        else:
            print("Sorted: No")

        if (self.head is None):
            print("List is empty.")
            print("\n")
            return
        
        print("Head value: ", self.head.value)
        current_node = self.head
        print("List contents:")
        for i in range(1, self.size + 1):
            print(current_node.value)
            current_node = current_node.next

        print("\n")