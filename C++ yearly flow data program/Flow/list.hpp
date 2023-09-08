
//  Created by Harris Hasnain
//

#ifndef list_hpp
#define list_hpp

#include <stdio.h>

struct ListItem
{
    int year;
    double flow;
};

struct Node
{
    ListItem item;
    Node *next;
};

class FlowList
{
    
public:
    FlowList();
    int insert(const ListItem& item);
    void print() const;
    int remove(const int& year);
    int flow_sum();
    Node* get_head_ptr()const;
private:
    Node *headM;
    
};



#endif /* list_hpp */
