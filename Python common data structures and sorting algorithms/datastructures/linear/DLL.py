import sys
sys.path.append('./datastructures')
from nodes.DNode import Node
from linear.SLL import SinglyLinkedList

class DoublyLinkedList:

    def __init__(self, init_value = None):
        list = SinglyLinkedList(init_value)
        self.head = list.head
        self.tail = list.tail
        self.size = list.size

    def InsertHead(self, value):
        node = Node(value)
        if self.head is None:
            self.head = node
            self.tail = node
        else:
            node.next = self.head
            self.head.prev = node
            self.head = node
        self.size += 1

    def InsertTail(self, value):
        node = Node(value)
        if self.tail is None:
            self.head = node
            self.tail = node
        else:
            node.prev = self.tail
            self.tail.next = node
            self.tail = node
        self.size += 1

    
    def DeleteHead(self):
        if self.head is None:
            raise Exception("List is empty.")
        else:
            self.head = self.head.next
            if self.head is not None:
                self.head.prev = None
            else:
                self.tail = None
        self.size -= 1

    def DeleteTail(self):
        if self.tail is None:
            raise Exception("List is empty.")
        else:
            self.tail = self.tail.prev
            if self.tail is not None:
                self.tail.next = None
            else:
                self.head = None
        self.size -= 1

    
    def Insert(self, value, position):
        node = Node(value)
        if position < 1 or position > self.size + 1:
            raise Exception("Invalid position.")
        elif position == 1:
            self.InsertHead(value)
        elif position == self.size + 1:
            self.InsertTail(value)
        else:
            current = self.head
            for i in range(position - 2):
                current = current.next
            node.next = current.next
            node.prev = current
            current.next.prev = node
            current.next = node
            self.size += 1

    def Search(self, value):
        found_val = SinglyLinkedList.Search(self, value)
        return found_val

    def Delete(self, value):
        node = Node(value)
        current = self.head
        while current is not None:
            if current.value == node.value:
                if current == self.head:
                    self.DeleteHead()
                elif current == self.tail:
                    self.DeleteTail()
                else:
                    current.prev.next = current.next
                    current.next.prev = current.prev
                    self.size -= 1
                return
            current = current.next

    def Sort(self):
        if self.size < 2:
            return

        sorted_list = DoublyLinkedList()

        current_node = self.head
        while current_node is not None:
            next_node = current_node.next

            insert_after_node = None
            sorted_current_node = sorted_list.head
            while sorted_current_node is not None and sorted_current_node.value < current_node.value:
                insert_after_node = sorted_current_node
                sorted_current_node = sorted_current_node.next

            if insert_after_node is None:
                current_node.prev = None
                current_node.next = sorted_list.head
                if sorted_list.head is not None:
                    sorted_list.head.prev = current_node
                sorted_list.head = current_node
            else:
                current_node.prev = insert_after_node
                current_node.next = insert_after_node.next
                if insert_after_node.next is not None:
                    insert_after_node.next.prev = current_node
                insert_after_node.next = current_node

            current_node = next_node

        if sorted_list.head is not None:
            sorted_list_tail = sorted_list.head
            while sorted_list_tail.next is not None:
                sorted_list_tail = sorted_list_tail.next
            sorted_list.tail = sorted_list_tail

        self.head = sorted_list.head
        self.tail = sorted_list.tail


    def IsSorted(self):
        sorted = SinglyLinkedList.IsSorted(self)
        return sorted
    

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
        else:
            node.prev = prev_node
            node.next = current_node
            prev_node.next = node

            if current_node is not None:
                current_node.prev = node
            else:
                self.tail = node

        self.size += 1

    
    def Clear(self):
        SinglyLinkedList.Clear(self)
    
    def Print(self):
        SinglyLinkedList.Print(self)