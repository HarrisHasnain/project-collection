
//  Created by Harris Hasnain
//

#include "list.hpp"

#include <iostream>
#include <stdlib.h>
#include <assert.h>
#include <iomanip>
using namespace std;

FlowList::FlowList(): headM(0)
{
}



int FlowList::insert(const ListItem& item)
{
    
    if (headM == 0 || item.year < headM->item.year)
    {
        Node *new_node = new Node;
        new_node->item.year = item.year;
        new_node->item.flow = item.flow;
        new_node->next = headM;
        headM = new_node;
    }
    
    else if (item.year == headM->item.year)
    {
        return 0;
    }
    
    else if (item.year > headM->item.year)
    {
        Node *before = headM;
        Node *after = headM->next;
        while((after != 0) && (item.year > after->item.year))
        {
            before = after;
            after = after->next;
            
        }
        
        if (after == 0)
        {
            Node *new_node = new Node;
            new_node->item.year = item.year;
            new_node->item.flow = item.flow;
            new_node->next = 0;
            before->next = new_node;
        }
        
        else if (item.year == after->item.year)
        {
            return 0;
        }
        
        else if (item.year < after->item.year)
        {
            Node *new_node = new Node;
            new_node->item.year = item.year;
            new_node->item.flow = item.flow;
            new_node->next = after;
            before->next = new_node;
        }
    }
    
    return 1;
}





void FlowList::print() const
{
    if (headM == 0)
    {
        cout << "[ ]" << endl;
    }
    
    else if (headM != 0)
    {
        Node *p;
        for (p = headM; p != 0; p = p->next)
            cout << p->item.year << "   " << p->item.flow << endl;
    }
    
}



int FlowList::remove(const int& year)
{
    if (headM == 0 || year < headM->item.year)
    {
        return 0;
    }
    
    Node *doomed_node = 0;
    
    if (year == headM->item.year) {
        doomed_node = headM;
        headM = headM->next;
    }
    
    else {
        Node *before = headM;
        Node *maybe_doomed = headM->next;
        while((maybe_doomed) != 0 && (year > maybe_doomed->item.year)) {
            before = maybe_doomed;
            maybe_doomed = maybe_doomed->next;
        }
        
        if (maybe_doomed == 0 || maybe_doomed->item.year != year)
        {
            return 0;
        }
        
        else
        {
            doomed_node = maybe_doomed;
            if (doomed_node->next == 0)
            {
                before->next = 0;
            }
            else
            {
                before->next = doomed_node->next;
            }
        }
        
    }
    
    delete doomed_node;
    
    doomed_node = 0;
    
    return 1;
}


int FlowList::flow_sum()
{
    int sum = 0;
    Node *ptr;
    for (ptr = headM; ptr != 0; ptr = ptr->next)
    {
        sum = sum + ptr->item.flow;
    }
    
    return sum;
    
}

Node* FlowList::get_head_ptr()const
{
    return headM;
}

