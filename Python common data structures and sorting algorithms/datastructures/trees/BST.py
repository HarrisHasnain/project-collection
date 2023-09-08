import sys
sys.path.append('./datastructures')
from nodes.TNode import TNode

class BST:

    def __init__(self, obj = None):
        if obj is None:
            self.root = None
        elif isinstance(obj, int):
            self.root = TNode(obj)
        else:
            self.root = obj

    def get_root(self):
        return self.root

    def set_root(self, val):
        if isinstance(val, int):
            if self.root is None:
                self.root = TNode(val)
            else:
                self.root.data = val
        else:
                self.root = val


    def Insert(self, obj):
        if isinstance(obj, int):
            obj = TNode(obj)
        if self.root is None:
            self.root = obj
        else:
            current_node = self.root
            while True:
                if obj.get_data() < current_node.get_data():
                    if current_node.get_left() is None:
                        current_node.set_left(obj)
                        obj.set_parent(current_node)
                        break
                    else:
                        current_node = current_node.get_left()
                else:
                    if current_node.get_right() is None:
                        current_node.set_right(obj)
                        obj.set_parent(current_node)
                        break
                    else:
                        current_node = current_node.get_right()

    def Delete(self, key):
        node = self.Search(key)
        if node is None:
            print("value is not in the tree.")
            return False

        parent = node.get_parent()
        if node.get_left() is None and node.get_right() is None:
            if parent is None:
                self.root = None
            elif parent.get_left() == node:
                parent.set_left(None)
            else:
                parent.set_right(None)
        elif node.get_left() is None:
            if parent is None:
                self.root = node.get_right()
            elif parent.get_left() == node:
                parent.set_left(node.get_right())
            else:
                parent.set_right(node.get_right())
            node.get_right().set_parent(parent)
        elif node.get_right() is None:
            if parent is None:
                self.root = node.get_left()
            elif parent.get_left() == node:
                parent.set_left(node.get_left())
            else:
                parent.set_right(node.get_left())
            node.get_left().set_parent(parent)
        else:
            successor = node.get_right()
            while successor.get_left() is not None:
                successor = successor.get_left()
            node.set_data(successor.get_data())
            successor_parent = successor.get_parent()
            if successor_parent.get_left() == successor:
                successor_parent.set_left(successor.get_right())
            else:
                successor_parent.set_right(successor.get_right())
            if successor.get_right() is not None:
                successor.get_right().set_parent(successor_parent)

        return True

    def Search(self, val):
        current = self.root
        while current is not None:
            if val == current.data:
                return current
            elif val < current.data:
                current = current.left
            else:
                current = current.right
        return None
    
    def printInOrder(self):
        print("\n")
        print("Tree in order:")
        self.print_ordered_tree()
        print("\n")

    def print_ordered_tree(self):
        if self.root is None:
            print("Tree is empty.")
            return
        if self.root.get_left() is not None:
            left_bst = BST(self.root.get_left())
            left_bst.print_ordered_tree()
        print(self.root.get_data(), end=" ")
        if self.root.get_right() is not None:
            right_bst = BST(self.root.get_right())
            right_bst.print_ordered_tree()

    def printBF(self):
        print("\n")
        print("Tree in BF format:")
        if self.root is None:
            print("Tree is empty.")
            print("\n")
            return
        queue = [self.root]
        while len(queue) > 0:
            level_size = len(queue)
            for i in range(level_size):
                node = queue.pop(0)
                print(node.get_data(), end=" ")
                if node.get_left() is not None:
                    queue.append(node.get_left())
                if node.get_right() is not None:
                    queue.append(node.get_right())
            print()
        print("\n")

    def Clear(self):
        self.root = None