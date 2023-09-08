import sys
sys.path.append('./datastructures')
from nodes.DNode import Node
from linear.SLL import SinglyLinkedList

class CircularSinglyLinkedList:

    def __init__(self, init_value = None):
        if init_value is None:
            self.head = None
            self.tail = None
            self.size = 0
        else:
            if isinstance(init_value, Node):
                self.head = init_value
                self.tail = init_value
                init_value.next = init_value
                self.size = 1
                return
            init_node = Node(init_value)
            self.head = init_node
            self.tail = init_node
            init_node.next = init_node
            self.size = 1


    def InsertHead(self, value):
        node = Node(value)
        if self.head is None:
            node.next = node
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head = node
            self.tail.next = node
        self.size += 1

    def InsertTail(self, value):
        node = Node(value)
        if self.tail is None:
            node.next = node
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.tail.next = node
            self.tail = node
        self.size += 1

    def Insert(self, value, position):
        node = Node(value)
        if position < 1 or position > self.size + 1:
            raise ValueError("Invalid position")

        if position == 1:
            self.InsertHead(value)
        elif position == self.size + 1:
            self.InsertTail(value)
        else:
            current_node = self.head
            for i in range(1, position - 1):
                current_node = current_node.next

            node.next = current_node.next
            current_node.next = node
            self.size += 1

    def Search(self, value):
        found_val = SinglyLinkedList.Search(self, value)
        return found_val
    
    def DeleteHead(self):
        if self.head is None:
            return

        if self.size == 1:
            self.head = None
            self.tail = None
            self.size = 0
            return

        self.head = self.head.next
        self.tail.next = self.head
        self.size -= 1

    def DeleteTail(self):
        if self.tail is None:
            return

        if self.size == 1:
            self.head = None
            self.tail = None
            self.size = 0
            return

        current_node = self.head
        while current_node.next != self.tail:
            current_node = current_node.next

        current_node.next = self.head
        self.tail = current_node
        self.size -= 1

    def Delete(self, value):
        node = Node(value)
        if self.head is None:
            return

        if self.head.value == node.value:
            self.DeleteHead()
            return

        if self.tail.value == node.value:
            self.DeleteTail()
            return

        prev = self.head
        curr = self.head.next
        while curr != self.head:
            if curr.value == node.value:
                prev.next = curr.next
                self.size -= 1
                return
            prev = curr
            curr = curr.next

    def Sort(self):
        if self.head is None:
            return

        current_node = self.head.next
        self.head.next = None
        self.tail = self.head

        while current_node is not None:
            next_node = current_node.next

            if current_node.value < self.head.value:
                current_node.next = self.head
                self.head = current_node
            elif current_node.value >= self.tail.value:
                current_node.next = self.head
                self.tail.next = current_node
                self.tail = current_node
            else:
                temp_node = self.head
                while temp_node != self.tail:
                    if temp_node.value <= current_node.value < temp_node.next.value:
                        current_node.next = temp_node.next
                        temp_node.next = current_node
                        break
                    temp_node = temp_node.next

            current_node = next_node

        self.tail.next = self.head

    def IsSorted(self):
        sorted = SinglyLinkedList.IsSorted(self)
        return sorted

    def SortedInsert(self, value):
        node = Node(value)
        sorted = self.IsSorted()
        if sorted == False:
            self.Sort()

        current_node = self.head
        prev_node = self.tail
        while current_node.next != self.head and current_node.value < node.value:
            prev_node = current_node
            current_node = current_node.next
            if current_node == self.head:
                break
            
        if prev_node == self.tail:
            self.InsertHead(value)
        elif current_node.next == self.head:
            self.InsertTail(value)
        else:
            prev_node.next = node
            node.next = current_node
            self.size += 1
    
    def Clear(self):
        SinglyLinkedList.Clear(self)

    def Print(self):
        SinglyLinkedList.Print(self)

    