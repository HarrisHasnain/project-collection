
//  Created by Harris Hasnain
//

#include <iostream>
#include <fstream>
#include <cstdlib>
#include <iomanip>
using namespace std;

#include "list.hpp"
#include "hydro.hpp"

int main(void)
{
    displayHeader();
    pressEnter();
    FlowList my_list;
    int num_records;
    num_records = readData(my_list);
    int choice = menu();
    while (choice != 5)
    {
    
        if (choice == 1)
        {
            display(my_list, num_records);
            pressEnter();
            choice = menu();
        }
        else if (choice == 2)
        {
            addData(my_list, num_records);
            pressEnter();
            cin.ignore();
            choice = menu();
        }
        else if (choice == 3)
        {
            saveData(my_list);
            pressEnter();
            choice = menu();
        }
        else if (choice == 4)
        {
            removeData(my_list, num_records);
            pressEnter();
            cin.ignore();
            choice = menu();
        }
        else
        {
            cout << "Invalid choice. Please try again." << endl;
            pressEnter();
            choice = menu();
        }
        
    }
    
    cout << "Program terminated successfully.\n" << endl;
    
    
    
    return 0;
}



void displayHeader()
{
    cout << "Program: Flow Stuides - Fall 2022" << endl;
    cout << "Version: 1.0" << endl;
    cout << "Produced By: Harris Hasnain" << endl;
}


int readData(FlowList& list)
{
    int year;
    double flow;
    
    ifstream in_stream;
    in_stream.open("/Users/harrishasnain/Desktop/Flow/Flow/flow.txt");
    if(in_stream.fail())
    {
        cout << "Error opening file..." << endl;
        exit(1);
    
    }
    
    int i = 0;
    int suc_insert;
    
    while (!in_stream.eof())
    {
        in_stream >> year >> flow;
        struct ListItem data;
        data.year = year;
        data.flow = flow;
        suc_insert = list.insert(data);
        if (suc_insert == 1)
        {
            i++;
        }
        
    }
    
    in_stream.close();
    
    return i;
}

int menu()
{
    int choice;
    cout << "Please select one of the following operations:" << endl;
    cout << "1. Display flow list, and the average flow." << endl;
    cout << "2. Add data." << endl;
    cout << "3. Save data into the file." << endl;
    cout << "4. Remove data." << endl;
    cout << "5. Quit." << endl;
    cout << "Enter your choice (1, 2, 3, 4 or 5):" << endl;
    cin >> choice;
    cin.ignore();
    cout << "\n" << endl;
    return choice;
}

void display(FlowList& list, int num_records)
{
    cout << "Year:" << "  " << "Flow (in billions of cubic meters):" << endl;
    list.print();
    int avg = average(list, num_records);
    cout << "\nThe annual average of the flow is: " << avg << " billion cubic meters." << endl;
}



void addData(FlowList& list, int& num_records)
{
    int year;
    double flow;
    cout << "Enter the year of the new data: " << endl;
    cin >> year;
    cout << "Enter the flow of the new data: " << endl;
    cin >> flow;
    struct ListItem new_data;
    new_data.year = year;
    new_data.flow = flow;
    int suc_insert;
    suc_insert = list.insert(new_data);
    if (suc_insert == 1)
    {
        num_records++;
        cout << "New data record successfully inserted." << endl;
    }
    else
    {
        cout << "Error: Data record already exists in the set." << endl;
    }
}



void removeData(FlowList& list, int& num_records)
{
    int year;
    cout << "Enter the year of the data to be removed: " << endl;
    cin >> year;
    int suc_removal;
    suc_removal = list.remove(year);
    if (suc_removal == 1)
    {
        num_records--;
        cout << "Data record successfully removed." << endl;
    }
    else
    {
        cout << "Error: Data record does not exist in the set." << endl;
    }

}


int average(FlowList& list, int num_records)
{
    int flow_sum = list.flow_sum();
    int flow_avg = (flow_sum) / (num_records);
    return flow_avg;
}

void saveData(FlowList& list)
{
    ofstream out_stream;
    out_stream.open("/Users/harrishasnain/Desktop/Flow/Flow/flow.txt");
    if(out_stream.fail())
    {
        cout << "Error opening file..." << endl;
        exit(1);
    }
    
    
    Node *ptr;
    
    ptr = list.get_head_ptr();
    
    while (ptr != 0)
    {
        out_stream << ptr->item.year << setw(10) << ptr->item.flow << endl;
        ptr = ptr->next;
    }
    
    cout << "Data successfully saved into the file." << endl;
    
    out_stream.close();

}

void pressEnter()
{
    cout <<"\n<<< Press Enter to Continue >>>" << endl;
    cin.get();
}

