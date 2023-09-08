import sys
sys.path.append('./datastructures')
from nodes.DNode import Node

class SinglyLinkedList:

    def __init__(self, init_value = None):
        if init_value is None:
            self.head = None
            self.tail = None
            self.size = 0
        else:
            if isinstance(init_value, Node):
                self.head = init_value
                self.tail = init_value
                self.size = 1
                return
            init_node = Node(init_value)
            self.head = init_node
            self.tail = init_node
            self.size = 1
        

    def InsertHead(self, value):
        node = Node(value)
        if self.head is None:
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head = node
        self.size += 1

    def InsertTail(self, value):
        node = Node(value)
        if self.tail is None:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            self.tail = node
        self.size += 1


    def DeleteHead(self):
        if self.head is None:
            raise Exception("List is empty.")
        else:
            removed_node = self.head
            self.head = self.head.next
            removed_node.next = None
            self.size -= 1
            if self.head is None:
                self.tail = None
            return

    def DeleteTail(self):
        if self.tail is None:
            raise Exception("List is empty.")
        elif self.head == self.tail:
            self.head = None
            self.tail = None
            self.size -= 1
            return
        else:
            current_node = self.head
            while current_node.next != self.tail:
                current_node = current_node.next
            current_node.next = None
            self.tail = current_node
            self.size -= 1
            return
        
    def Insert(self, value, position):
        node = Node(value)
        if position <  1 or position > self.size + 1:
            raise IndexError("Position is out of range.")
        elif position == 1:
            self.InsertHead(value)
        elif position == self.size + 1:
            self.InsertTail(value)
        else:
            current_node = self.head
            for i in range(position - 2):
                current_node = current_node.next
            node.next = current_node.next
            current_node.next = node
            self.size += 1

    def Search(self, value):
        node = Node(value)
        current_node = self.head
        for i in range(1, self.size + 1):
            if current_node.value == node.value:
                return current_node.value
            current_node = current_node.next
        return None
    


    def Delete(self, value):
        node = Node(value)
        if node.value is None or self.head is None:
            raise Exception("List is empty or no value was provided.")

        if self.head.value == node.value:
            self.DeleteHead()
            return
        
        prev = self.head
        curr = self.head.next
        while curr is not None:
            if curr.value == value:
                prev.next = curr.next
                self.size -= 1
                if self.tail.value == value:
                    self.tail = prev
                return
            prev = curr
            curr = curr.next

    def Sort(self):
        if self.size < 2:
            return
        
        sorted_list = SinglyLinkedList()
        
        current_node = self.head
        while current_node is not None:
            next_node = current_node.next
            
            insert_after_node = None
            sorted_current_node = sorted_list.head
            while sorted_current_node is not None and sorted_current_node.value < current_node.value:
                insert_after_node = sorted_current_node
                sorted_current_node = sorted_current_node.next
                
            if insert_after_node is None:
                current_node.next = sorted_list.head
                sorted_list.head = current_node
            else:
                current_node.next = insert_after_node.next
                insert_after_node.next = current_node
                
            current_node = next_node

        if self.head is not None:
            sorted_list_tail = self.head
            while sorted_list_tail.next is not None:
                sorted_list_tail = sorted_list_tail.next
            sorted_list.tail = sorted_list_tail

        self.head = sorted_list.head
        self.tail = sorted_list.tail

    def IsSorted(self):
        if self.head is None:
            return True
        current_node = self.head
        for i in range(1, self.size):
            if current_node.value > current_node.next.value:
                return False
            current_node = current_node.next
        return True

    def SortedInsert(self, value):
        node = Node(value)
        sorted = self.IsSorted()
        if sorted == False:
            self.Sort()

        current_node = self.head
        prev_node = None
        while current_node is not None and current_node.value < node.value:
            prev_node = current_node
            current_node = current_node.next
        if prev_node is None:
            self.InsertHead(value)
        if current_node is None:
            self.InsertTail(value)
        else:
            prev_node.next = node
            node.next = current_node
            self.size += 1

    def Clear(self):
        self.head = None
        self.tail = None
        self.size = 0

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
        print("Tail value: ", self.tail.value)
        current_node = self.head
        print("List contents:")
        for i in range(1, self.size + 1):
            print(current_node.value)
            current_node = current_node.next

        print("\n")