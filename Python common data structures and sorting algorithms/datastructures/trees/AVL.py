import sys
sys.path.append('./datastructures')
from nodes.TNode import TNode
from trees.BST import BST

class AVL:
    
    def __init__(self, obj = None):
        tree = BST(obj)
        self.root = tree.root
        if isinstance(obj, TNode):
            self.balance_tree(self.get_root())
    
    def get_root(self):
        return self.root
    
    def set_root(self, obj):
        BST.set_root(self, obj)
        if isinstance(obj, TNode):
            self.balance_tree(self.get_root())

    def Insert(self, obj):
        BST.Insert(self, obj)
        self.balance_tree(self.get_root())

    def Delete(self, val):
        BST.Delete(self, val)
        self.balance_tree(self.get_root())

    def Search(self, val):
        found_node = BST.Search(self, val)
        return found_node
    
    def printInOrder(self):
        BST.printInOrder(self)

    def print_ordered_tree(self):
        BST.print_ordered_tree(self)

    def printBF(self):
        BST.printBF(self)

    def Clear(self):
        BST.Clear(self)





    def balance_tree(self, root):

        if root is None:
            return

        # Calculate the balance factor of the root node
        left_height = self.get_height(root.get_left())
        right_height = self.get_height(root.get_right())
        balance_factor = right_height - left_height
        root.set_balance(balance_factor)

        # Check if the balance factor is -2, 0, or 2
        if balance_factor == -2:
            # The left subtree is longer than the right subtree
            if self.get_height(root.get_left().get_right()) > self.get_height(root.get_left().get_left()):
                # Left-right rotation
                self.rotate_left(root.get_left())
            # Left-left rotation
            self.rotate_right(root)
        elif balance_factor == 2:
            # The right subtree is longer than the left subtree
            if self.get_height(root.get_right().get_left()) > self.get_height(root.get_right().get_right()):
                # Right-left rotation
                self.rotate_right(root.get_right())
            # Right-right rotation
            self.rotate_left(root)
        
        # Recursively balance the left and right subtrees
        self.balance_tree(root.get_left())
        self.balance_tree(root.get_right())

    def rotate_left(self, root):
 
        new_root = root.get_right()
        root.set_right(new_root.get_left())
        if new_root.get_left() is not None:
            new_root.get_left().set_parent(root)
        new_root.set_parent(root.get_parent())
        if root.get_parent() is None:
            self.set_root(new_root)
        elif root == root.get_parent().get_left():
            root.get_parent().set_left(new_root)
        else:
            root.get_parent().set_right(new_root)
        new_root.set_left(root)
        root.set_parent(new_root)
        root.set_balance(self.get_height(root.get_right()) - self.get_height(root.get_left()))
        new_root.set_balance(self.get_height(new_root.get_right()) - self.get_height(new_root.get_left()))

    def rotate_right(self, root):

        new_root = root.get_left()
        root.set_left(new_root.get_right())
        if new_root.get_right() is not None:
            new_root.get_right().set_parent(root)
        new_root.set_parent(root.get_parent())
        if root.get_parent() is None:
            self.set_root(new_root)
        elif root == root.get_parent().get_left():
            root.get_parent().set_left(new_root)
        else:
            root.get_parent().set_right(new_root)
        new_root.set_right(root)
        root.set_parent(new_root)
        root.set_balance(self.get_height(root.get_right()) - self.get_height(root.get_left()))
        new_root.set_balance(self.get_height(new_root.get_right()) - self.get_height(new_root.get_left()))

    def get_height(self, root):
 
        if root is None:
            return -1
        else:
            return 1 + max(self.get_height(root.get_left()), self.get_height(root.get_right()))