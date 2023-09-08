import sys
sys.path.append('./datastructures')
from nodes.DNode import Node
from linear.SLL import SinglyLinkedList
from linear.DLL import DoublyLinkedList
from linear.CSLL import CircularSinglyLinkedList
from linear.CDLL import CircularDoublyLinkedList
from linear.StackLL import StackLL
from linear.QueueLL import QueueLL
from nodes.TNode import TNode
from trees.BST import BST
from trees.AVL import AVL

if __name__ == "__main__":

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Singly linked list testing...")
    print("\n")

    sll = SinglyLinkedList(7)
    print("Non-empty singly linked list created from constructor:")
    sll.Print()

    sll = SinglyLinkedList(Node(7))
    print("Special case of non-empty singly linked list created from constructor, with node object inserted:")
    sll.Print()

    sll = SinglyLinkedList()
    print("Empty singly linked list created from constructor:")
    sll.Print()
    sll.InsertHead(4)
    sll.InsertHead(5)
    sll.Insert(3, 3)
    sll.InsertTail(1)
    sll.InsertTail(2)
    print("Singly linked list after adding some values:")
    sll.Print()
    print("Returned value when searching for value in the list:")
    print(sll.Search(5))
    print("\nReturned value when searching for value not in the list:")
    print(sll.Search(7))
    print("\nReturned IsSorted status of unsorted list:")
    print(sll.IsSorted())
    sll.Sort()
    print("\nSingly linked list after sorting:")
    sll.Print()
    print("\nReturned IsSorted status of sorted list:")
    print(sll.IsSorted())
    sll.DeleteHead()
    sll.DeleteTail()
    sll.Delete(3)
    print("\nSingly linked list after deleting head, tail and value in the middle:")
    sll.Print()
    print("New unsorted list:")
    sll.Clear()
    sll.InsertHead(4)
    sll.InsertHead(5)
    sll.Insert(1, 3)
    sll.InsertTail(3)
    sll.InsertTail(2)
    sll.Print()
    sll.SortedInsert(6)
    print("Singly linked list after using a sorted insert on an unsorted list:")
    sll.Print()
    sll.SortedInsert(7)
    print("Singly linked list after using a sorted insert on a sorted list:")
    sll.Print()
    sll.Clear()
    print("Singly linked list after clearing list:")
    sll.Print()

    print("End of singly linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Doubly linked list testing...")
    print("\n")

    dll = DoublyLinkedList(7)
    print("Non-empty Doubly linked list created from constructor:")
    dll.Print()

    dll = DoublyLinkedList(Node(7))
    print("Special case of non-empty doubly linked list created from constructor, with node object inserted:")
    dll.Print()

    dll = DoublyLinkedList()
    print("Empty Doubly linked list created from constructor:")
    dll.Print()
    dll.InsertHead(4)
    dll.InsertHead(5)
    dll.Insert(3, 3)
    dll.InsertTail(1)
    dll.InsertTail(2)
    print("Doubly linked list after adding some values:")
    dll.Print()
    print("Returned value when searching for value in the list:")
    print(dll.Search(1))
    print("\nReturned value when searching for value not in the list:")
    print(dll.Search(7))
    print("\nReturned IsSorted status of unsorted list:")
    print(dll.IsSorted())
    dll.Sort()
    print("\nDoubly linked list after sorting:")
    dll.Print()
    print("\nReturned IsSorted status of sorted list:")
    print(dll.IsSorted())
    dll.DeleteHead()
    dll.DeleteTail()
    dll.Delete(3)
    print("\nDoubly linked list after deleting head, tail and value in the middle:")
    dll.Print()
    print("New unsorted list:")
    dll.Clear()
    dll.InsertHead(4)
    dll.InsertHead(5)
    dll.Insert(1, 3)
    dll.InsertTail(3)
    dll.InsertTail(2)
    dll.Print()
    dll.SortedInsert(6)
    print("Doubly linked list after using a sorted insert on an unsorted list:")
    dll.Print()
    dll.SortedInsert(7)
    print("Doubly linked list after using a sorted insert on a sorted list:")
    dll.Print()
    dll.Clear()
    print("Doubly linked list after clearing list:")
    dll.Print()

    print("End of Doubly linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Circular Singly linked list testing...")
    print("\n")

    csll = CircularSinglyLinkedList(7)
    print("Non-empty Circular Singly linked list created from constructor:")
    csll.Print()

    csll = CircularSinglyLinkedList(Node(7))
    print("Special case of non-empty circular singly linked list created from constructor, with node object inserted:")
    csll.Print()

    csll = CircularSinglyLinkedList()
    print("Empty Circular Singly linked list created from constructor:")
    csll.Print()
    csll.InsertHead(4)
    csll.InsertHead(5)
    csll.Insert(3, 3)
    csll.InsertTail(1)
    csll.InsertTail(2)
    print("Circular Singly linked list after adding some values:")
    csll.Print()
    print("Returned value when searching for value in the list:")
    print(csll.Search(1))
    print("\nReturned value when searching for value not in the list:")
    print(csll.Search(7))
    print("\nReturned IsSorted status of unsorted list:")
    print(csll.IsSorted())
    csll.Sort()
    print("\nCircular Singly linked list after sorting:")
    csll.Print()
    print("\nReturned IsSorted status of sorted list:")
    print(csll.IsSorted())
    csll.DeleteHead()
    csll.DeleteTail()
    csll.Delete(3)
    print("\nCircular Singly linked list after deleting head, tail and value in the middle:")
    csll.Print()
    print("New unsorted list:")
    csll.Clear()
    csll.InsertHead(4)
    csll.InsertHead(5)
    csll.Insert(1, 3)
    csll.InsertTail(3)
    csll.InsertTail(2)
    csll.Print()


    csll.SortedInsert(6)

    
    print("Circular Singly linked list after using a sorted insert on an unsorted list:")
    csll.Print()
    csll.SortedInsert(7)
    print("Circular Singly linked list after using a sorted insert on a sorted list:")
    csll.Print()
    csll.Clear()
    print("Circular Singly linked list after clearing list:")
    csll.Print()

    print("End of Circular Singly linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Circular Doubly linked list testing...")
    print("\n")

    cdll = CircularDoublyLinkedList(7)
    print("Non-empty Circular Doubly linked list created from constructor:")
    cdll.Print()

    cdll = CircularDoublyLinkedList(Node(7))
    print("Special case of non-empty circular doubly linked list created from constructor, with node object inserted:")
    cdll.Print()

    cdll = CircularDoublyLinkedList()
    print("Empty Circular Doubly linked list created from constructor:")
    cdll.Print()
    cdll.InsertHead(4)
    cdll.InsertHead(5)
    cdll.Insert(3, 3)
    cdll.InsertTail(1)
    cdll.InsertTail(2)
    print("Circular Doubly linked list after adding some values:")
    cdll.Print()
    print("Returned value when searching for value in the list:")
    print(cdll.Search(1))
    print("\nReturned value when searching for value not in the list:")
    print(cdll.Search(7))
    print("\nReturned IsSorted status of unsorted list:")
    print(cdll.IsSorted())
    cdll.Sort()
    print("\nCircular Doubly linked list after sorting:")
    cdll.Print()
    print("\nReturned IsSorted status of sorted list:")
    print(cdll.IsSorted())
    cdll.DeleteHead()
    cdll.DeleteTail()
    cdll.Delete(3)
    print("\nCircular Doubly linked list after deleting head, tail and value in the middle:")
    cdll.Print()
    print("New unsorted list:")
    cdll.Clear()
    cdll.InsertHead(4)
    cdll.InsertHead(5)
    cdll.Insert(1, 3)
    cdll.InsertTail(3)
    cdll.InsertTail(2)
    cdll.Print()


    cdll.SortedInsert(6)

    
    print("Circular Doubly linked list after using a sorted insert on an unsorted list:")
    cdll.Print()
    cdll.SortedInsert(7)
    print("Circular Doubly linked list after using a sorted insert on a sorted list:")
    cdll.Print()
    cdll.Clear()
    print("Circular Doubly linked list after clearing list:")
    cdll.Print()

    print("End of Circular Doubly linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Stack linked list testing...")
    print("\n")

    stack = StackLL(7)
    print("Non-empty stack linked list created from constructor:")
    stack.Print()

    stack = StackLL(Node(7))
    print("Special case of non-empty stack linked list created from constructor, with node object inserted:")
    stack.Print()

    stack = StackLL()
    print("Empty stack linked list created from constructor:")
    stack.Print()

    stack.Push(5)
    stack.Push(4)
    stack.Push(3)
    stack.Push(2)
    stack.Push(1)
    print("Stack linked list after pushing some values:")
    stack.Print()
    print("Returned value when searching for value in the list:")
    print(stack.Search(1))
    print("\nReturned value when searching for value not in the list:")
    print(stack.Search(7))
    print("\nReturned IsSorted status of sorted stack:")
    print(stack.IsSorted())

    stack.Push(6)
    print("\nStack linked list after pushing a value to make it unsorted:")
    stack.Print()

    print("\nReturned IsSorted status of unsorted stack:")
    print(stack.IsSorted())

    stack.Pop()
    stack.Pop()
    print("\nStack linked list after popping some values:")
    stack.Print()

    stack.Clear()
    print("Stack linked list after clearing:")
    stack.Print()

    print("End of stack linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Queue linked list testing...")
    print("\n")

    queue = QueueLL(7)
    print("Non-empty Queue linked list created from constructor:")
    queue.Print()

    queue = QueueLL(Node(7))
    print("Special case of non-empty queue linked list created from constructor, with node object inserted:")
    queue.Print()

    queue = QueueLL()
    print("Empty Queue linked list created from constructor:")
    queue.Print()

    queue.Enqueue(2)
    queue.Enqueue(3)
    queue.Enqueue(4)
    queue.Enqueue(5)
    queue.Enqueue(6)
    
    print("Queue linked list after enqueueing some values:")
    queue.Print()
    print("Returned value when searching for value in the list:")
    print(queue.Search(3))
    print("\nReturned value when searching for value not in the list:")
    print(queue.Search(7))
    print("\nReturned IsSorted status of sorted Queue:")
    print(queue.IsSorted())

    queue.Enqueue(1)
    print("\nQueue linked list after enqueueing a value to make it unsorted:")
    queue.Print()

    print("\nReturned IsSorted status of unsorted Queue:")
    print(queue.IsSorted())

    queue.Dequeue()
    queue.Dequeue()
    print("\nQueue linked list after dequeueing some values:")
    queue.Print()

    queue.Clear()
    print("Queue linked list after clearing:")
    queue.Print()

    print("End of Queue linked list testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("Binary search tree testing...")
    print("\n")

    tree = BST(5)
    print("BST after being constructed with a value:")
    tree.printInOrder()
    tree.printBF()

    tree = BST()
    print("BST after being constructed empty:")
    tree.printInOrder()
    tree.printBF()

    tree.Insert(5)
    tree.Insert(3)
    tree.Insert(1)
    tree.Insert(4)
    tree.Insert(7)

    print("BST after being inserting some values:")
    tree.printInOrder()
    tree.printBF()

    tree.Insert(TNode(6))
    tree.Insert(TNode(8))

    print("BST after being inserting some nodes:")
    tree.printInOrder()
    tree.printBF()

    print("Returned node value after searching for node not in tree:")
    sub_node = tree.Search(9)
    print(sub_node)

    print("\nReturned node value after searching for node in tree:")
    sub_node = tree.Search(3)
    print(sub_node.data)

    sub_tree = BST(sub_node)
    print("\nSub tree created from searched node, using node constructor:")
    sub_tree.printInOrder()
    sub_tree.printBF()

    sub_tree.set_root(2)
    print("Sub tree after setting new root value:")
    sub_tree.printInOrder()
    sub_tree.printBF()
    sub_node = sub_tree.Search(1)
    print("\nReturned value using getter for root of sub tree:")
    print(sub_tree.get_root().data)
    sub_tree.set_root(sub_node)
    print("\nSub tree after setting root to child node:")
    sub_tree.printInOrder()
    sub_tree.printBF()

    print("\nOriginal tree shown again:")
    tree.printInOrder()
    tree.printBF()

    tree.Delete(4)

    print("Original tree after deleting a leaf node:")
    tree.printInOrder()
    tree.printBF()

    tree.Delete(5)

    print("Original tree after deleting root:")
    tree.printInOrder()
    tree.printBF()

    tree.Delete(2)

    print("Original tree after deleting mid level node:")
    tree.printInOrder()
    tree.printBF()

    tree.Clear()
    print("Original tree after clearing:")
    tree.printInOrder()
    tree.printBF()

    print("End of binary search tree testing...")
    print("\n")
    print("---------------------------------------")

    #'''

    

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

    #'''

    print("\n")

    print("---------------------------------------")
    print("\n")
    print("AVL tree testing...")
    print("\n")

    tree = AVL(5)
    print("AVL tree after being constructed with a value:")
    tree.printInOrder()
    tree.printBF()

    tree = AVL()
    print("AVL tree after being constructed empty:")
    tree.printInOrder()
    tree.printBF()

    tree.Insert(1)
    tree.Insert(2)
    tree.Insert(3)
    tree.Insert(4)
    tree.Insert(6)
    tree.Insert(7)

    print("Balanced AVL tree after inserting some values in an unbalanced way:")
    tree.printInOrder()
    tree.printBF()

    tree.Insert(TNode(8))
    tree.Insert(TNode(9))

    print("Balanced AVL tree after inserting some nodes in an unbalanced way:")
    tree.printInOrder()
    tree.printBF()

    print("Returned node value after searching for node not in tree:")
    sub_node = tree.Search(10)
    print(sub_node)

    print("\nReturned node value after searching for node in tree:")
    sub_node = tree.Search(3)
    print(sub_node.data)


    new_bst = BST()
    new_bst.Insert(1)
    new_bst.Insert(2)
    new_bst.Insert(4)

    print("\nNewly created unbalanced BST:")
    new_bst.printInOrder()
    new_bst.printBF()

    sub_tree = AVL(new_bst.get_root())
    print("\nAVL sub tree constructed from unbalanced BST:")
    sub_tree.printInOrder()
    sub_tree.printBF()

    sub_tree.set_root(3)
    print("Sub tree after setting new root value:")
    sub_tree.printInOrder()
    sub_tree.printBF()

    print("\nReturned value using getter for root of sub tree:")
    print(sub_tree.get_root().data)

    new_bst = BST()
    new_bst.Insert(5)
    new_bst.Insert(6)
    new_bst.Insert(7)

    print("\nAnother unbalanced BST:")
    new_bst.printInOrder()
    new_bst.printBF()

    sub_tree.set_root(new_bst.get_root())
    print("\nBalanced AVL sub tree after setting root to this unbalanced BST:")
    sub_tree.printInOrder()
    sub_tree.printBF()

    print("\nOriginal tree shown again:")
    tree.printInOrder()
    tree.printBF()

    tree.Delete(1)
    tree.Delete(2)
    tree.Delete(3)


    print("Rebalanced original tree after deleting nodes in an unbalanced way:")
    tree.printInOrder()
    tree.printBF()

    tree.Clear()
    print("Original tree after clearing:")
    tree.printInOrder()
    tree.printBF()

    print("End of AVL tree testing...")
    print("\n")
    print("---------------------------------------")

    print("\n")

    #'''

    # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX