
//  Created by Harris Hasnain
//

#ifndef hydro_hpp
#define hydro_hpp

#include <stdio.h>

void displayHeader();

int readData(FlowList& list);

int menu();

void display(FlowList& list, int num_records);

void addData(FlowList& list, int& num_records);

void removeData(FlowList& list, int& num_records);

int average(FlowList& list, int num_records);

void saveData(FlowList& list);

void pressEnter();

#endif /* hydro_hpp */
