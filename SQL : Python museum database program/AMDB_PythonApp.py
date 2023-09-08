import mysql.connector

#username = root
#password = computer password

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def admin_console():
    print("\nPlease choose whether you would like to type an SQL command directly, or run an SQL script:")
    print("1 - Direct SQL command")
    print("2 - Insert SQL script")
    selection = input("please choose one of the options above to modify the database using SQL commands: ")

    if selection == '1':
        print("\nPlease select whether you would like to display data, or modify the data:")
        print("1 - Display data (select)")
        print("2 - Modify data (insert / update / delete)")
        sub_selection = input("Please choose one of the options above to interact with the database: ")
        if sub_selection == '1':
            try:
                cmd = input("\nPlease insert the full SQL display command to be executed: ")
                cur.execute(cmd)
                print_table(cur)
            except:
                print("\nInvalid command.")
        elif sub_selection == '2':
            try:
                cmd = input("\nPlease insert the full SQL modification command to be executed: ")
                cur.execute(cmd)
                cnx.commit()
            except:
                    print("\nInvalid command.")
            else:
               print("\nInvalid selection. Terminating program...")

    elif selection == '2':
        print("\nPlease select whether you would like to display data, or modify the data:")
        print("1 - Display data (select)")
        print("2 - Modify data (insert / update / delete")
        sub_selection = input("Please choose one of the options above to interact with the database: ")
        if sub_selection == '1':
            try:
                file_path = input("\nPlease enter the path of the display sql script you would like to run: ")
                cur.execute(file_path)
                print_table(cur)
            except:
                    print("\nInvalid script or path.")
        elif sub_selection == '2':
            try:
                file_path = input("\nPlease enter the path of the modification sql script you would like to run: ")
                cur.execute(file_path)
                cnx.commit()
            except:
                    print("\nInvalid script or path.")
        else:
               print("\nInvalid selection. Terminating program...")

    else:
        print("\nInvalid selection. Terminating program...")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def data_entry():
    print("\nPlease choose whether you would like to view information, or modify the database, and how you would like to do so:")
    print("1 - Display information from the database through prompts")
    print("2 - Modify the database through a sequence of prompts (insert / update / delete)")
    print("3 - Insert a file to perform commands on the database")

    selection = input("Please choose one of the above options to interact with the database: ")

    if selection == '1':
        guest_view()

    elif selection == '2':
        print("\nPlease choose how you would like to modify the database:")
        print("1 - Insert data")
        print("2 - Update data")
        print("3 - Delete data")
        sub_selection = input("Please choose one of the above options to modify the database: ")
        if sub_selection == '1':
            insert(cur)
        elif sub_selection == '2':
            update(cur)
        elif sub_selection == '3':
            delete(cur)
        else:
            print("\nInvalid selection. Terminating program...")

    elif selection == '3':
        try:
            file_name = input("\nPlease enter the name of the file: ")
            fd = open(file_name, 'r')
            sqlFile = fd.read()
            fd.close()
            sqlCommands = sqlFile.split(';')
            for command in sqlCommands:
                try:
                    if command.strip() != '':
                        cur.execute(command)
                except (IOError):
                    print("\nCommand skipped: ", command)
            cnx.commit()
            print("\nHere is the new table:")
            print_table(cur)
        except:
            print("\nError reading file. Terminating program.")

    else:
         print("\nInvalid selection. Terminating program...")


#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def guest_view():
    print("\nPlease specify the information are you looking for:")
    print("1 - Art Object information")
    print("2 - Artist information")
    print("3 - Other collections information")
    print("4 - Exhibitions information")
    selection = input("please type the number of one of the options above to select that information: ")

    if selection == '1':
        object_info(cur)

    elif selection == '2':
        artist_info(cur)

    elif selection == '3':
        collection_info(cur)

    elif selection == '4':
        exhibition_info(cur)

    else:
        print("\nInvalid selection. Terminating program...")


#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def insert(cur):
    try:
        print("\nPlease select one of the tables from below to insert a tuple into:")
        print("\n[Collection, Artist, Art_object, Permanent, Borrowed, Exhibition, Displays]")
        table_name = input("\nPlease enter the name of a table: ")
        if table_name == 'Collection':
            inst_collection_template = "insert into Collection values (%s,%s,%s,%s,%s,%s)"
            col_name = input("Please enter the name of the collection: ")
            col_type = input("Please enter the type of the collection: ")
            col_desc = input("Please enter the description of the collection: ")
            col_address = input("Please enter the address of the collection: ")
            col_phone = input("Please enter the phone number of the collection: ")
            col_contact = input("Please enter the name of the contact person of the collection: ")
            inst_collection_data = (col_name, col_type, col_desc, col_address, col_phone, col_contact)
            cur.execute(inst_collection_template,inst_collection_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Artist':
            inst_artist_template = "insert into Artist values (%s,%s,%s,%s,%s,%s,%s)"
            artist_name = input("Please enter the name of the artist: ")
            artist_birth = input("Please enter the date of birth of the artist: ")
            artist_death = input("Please enter the date of death of the artist (press enter and leave blank if unknown): ") or None
            artist_country = input("Please enter the country of the artist: ")
            artist_epoch = input("Please enter the epoch of the artist: ")
            artist_desc = input("Please enter the description of the artist: ")
            artist_style = input("Please enter the style of the artist: ")
            inst_artist_data = (artist_name, artist_birth, artist_death, artist_country, artist_epoch, artist_desc, artist_style)
            cur.execute(inst_artist_template,inst_artist_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Art_object':
            inst_artist_template = "insert into Art_object values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            object_id = input("Please enter the ID number of the object: ")
            object_epoch = input("Please enter the epoch of the object: ")
            object_origin = input("Please enter the origin country of the object: ")
            object_year = input("Please enter the year of the object: ")
            object_title = input("Please enter the title of the object: ")
            object_desc = input("Please enter the description of the object: ")
            object_art_type = input("Please enter the art type of the object: ")
            object_material = input("Please enter the material of the object (press enter and leave blank if art type is other): ") or None
            object_style = input("Please enter the style of the object: ")
            object_height = input("Please enter the height of the object (press enter and leave blank if art type is NOT statue / sculpture): ") or None
            object_weight = input("Please enter the weight of the object (press enter and leave blank if art type is NOT statue / sculpture): ") or None
            object_type = input("Please enter the type of the object (press enter and leave blank if art type is NOT other): ") or None
            object_paint_type = input("Please enter the paint type of the object (press enter and leave blank if art type is NOT painting): ") or None
            object_artist = input("Please enter the style of the artist (press enter and leave blank if unknown, or if there is no matching artist in Artist table): ") or None
            inst_artist_data = (object_id, object_epoch, object_origin, object_year, object_title, object_desc, object_art_type, object_material, object_style, object_height, object_weight, object_type, object_paint_type, object_artist)
            cur.execute(inst_artist_template,inst_artist_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Permanent':
            inst_perm_template = "insert into Permanent values (%s,%s,%s,%s)"
            perm_id = input("Please enter the ID number of the object (has to already exist in Art_object table): ")
            perm_status = input("Please enter the status of the object: ")
            perm_cost = input("Please enter the cost of the object: ")
            perm_date_acquired = input("Please enter the date acquired of the object: ")
            inst_perm_data = (perm_id, perm_status, perm_cost, perm_date_acquired)
            cur.execute(inst_perm_template,inst_perm_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Borrowed':
            inst_borr_template = "insert into Borrowed values (%s,%s,%s,%s)"
            borr_id = input("Please enter the ID number of the object (has to already exist in Art_object table): ")
            borr_date_borrowed = input("Please enter the date borrowed of the object: ")
            borr_date_returned = input("Please enter the date returned of the object: ")
            borr_collection = input("Please enter the collection the object was borrowed from (has to already exist in Collection table): ")
            inst_borr_data = (borr_id, borr_date_borrowed, borr_date_returned, borr_collection)
            cur.execute(inst_borr_template,inst_borr_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Exhibition':
            inst_exbn_template = "insert into Exhibition values (%s,%s,%s)"
            exbn_name = input("Please enter the name of the exhibition: ")
            exbn_start = input("Please enter the start date of the exhibition: ")
            exbn_end = input("Please enter the end date of the exhibition: ")
            inst_exbn_data = (exbn_name, exbn_start, exbn_end)
            cur.execute(inst_exbn_template,inst_exbn_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        elif table_name == 'Displays':
            inst_displays_template = "insert into Displays values (%s,%s)"
            displays_object_id = input("Please enter the ID number of the object (has to already exist in Art_object table): ")
            displays_exbn_name = input("Please enter the name of the exhibition (has to already exist in Exhibition table): ")
            inst_displays_data = (displays_object_id, displays_exbn_name)
            cur.execute(inst_displays_template,inst_displays_data)
            cnx.commit()
            print("\nInsertion successful. Here is the new table:")
            cur.execute(f"select * from {table_name}")
            print_table(cur)
        else:
            print("\nInvalid selection. Terminating program...")
    
    except:
           print("\nInsertion Failed. One or more invalid values entered.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def update(cur):
    try:
        print("\nPlease select one of the tables from below to perform an update on:")
        print("\n[Collection, Artist, Art_object, Permanent, Borrowed, Exhibition, Displays]")
        table_name = input("\nPlease enter the name of a table: ")
        print("\nPlease select one of the tuples from the table below to update (choose by entering the first value in the tuple):")
        cur.execute(f"select * from {table_name}")
        print_table(cur)
        col_names = cur.column_names
        primary_key = col_names[0]
        row = input("\nPlease select the first value (primary key) of the tuple: ")
        update_attribute = input("Please select the attribute (column) in the tuple you would like to update: ")
        new_value = input("Please select the new value for the tuple's attribute: ")
        cur.execute(f"update {table_name} set {update_attribute} = '{new_value}' where {primary_key} = '{row}'")
        cnx.commit()
        print("\nUpdate successful. Here is the new table:")
        cur.execute(f"select * from {table_name}")
        print_table(cur)
    except:
        print("\nUpdate Failed. One or more invalid values entered.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def delete(cur):
    try:
        print("\nPlease select one of the tables from below to delete a tuple from:")
        print("\n[Collection, Artist, Art_object, Permanent, Borrowed, Exhibition, Displays]")
        table_name = input("\nPlease enter the name of a table: ")
        print("\nPlease select one of the tuples from the table below to delete (choose by entering the first value in the tuple):")
        cur.execute(f"select * from {table_name}")
        print_table(cur)
        col_names = cur.column_names
        primary_key = col_names[0]
        row = input("\nPlease select the first value (primary key) of the tuple: ")
        cur.execute(f"delete from {table_name} where {primary_key} = '{row}'")
        cnx.commit()
        print("\nDeletion successful. Here is the new table:")
        cur.execute(f"select * from {table_name}")
        print_table(cur)
    except:
           print("\nDeletion Failed. One or more invalid values entered.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def print_table(cur):
    search_result = cur.fetchall()
    if(len(search_result) == 0):
        print("\nNo entries found.")
    else:
        col_names = cur.column_names
        print("\nSearch found",len(search_result),"Entries:\n")
        header_size=len(col_names)
        for i in range(header_size):
            print("{:<50s}".format(col_names[i]),end='')
        print()
        print(50*header_size*'-')
        for row in search_result:
            for val in row:
                print("{:<50s}".format(str(val)),end='')
            print()
    return len(search_result)

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def object_info(cur):
    print("\nFirst, please select whether you would like to see information for objects owned by the museum, or objects borrowed by the museum (or go back to the upper menu): ")
    print("1 - Owned objects")
    print("2 - Borrowed objects")
    print("3 - Return to upper menu")
    subselection = input("please type the number of one of the options above to select information for those objects (or go back to the upper menu): ")

    if subselection == '1':
        print("\nOwned object information:\n")
        cur.execute("select * from Permanent")
        print_table(cur)
    elif subselection == '2':
        print("\nBorrowed object information:\n")
        cur.execute("select * from Borrowed")
        print_table(cur)
    elif subselection == '3':
        guest_view()
        return

    searchkey = input("\nPlease insert the ID number of the object whose information you are looking for (or type 0 to display information for all objects): ")
    if searchkey == '0':
        instr = "select * from Art_object"
        cur.execute(instr)
        print_table(cur)

    else:
        try:
            instr = "select * from Art_object where IDNum = %(oid)s"
            cur.execute(instr,{'oid':searchkey})
            print_table(cur)
        except:
            print("\nError: invalid search key provided. Terminating program.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def artist_info(cur):
    return_upper = input("\nPress 0 to return to the upper menu, press enter or anything else to continue: ")
    if return_upper == '0':
        guest_view()
        return
    searchkey = input("\nPlease insert the name of the artist you are looking for (or type 0 to display information for all artists): ")
    if searchkey == '0':
        instr = "select * from Artist"
        cur.execute(instr)
        print_table(cur)

    else:
        try:
            instr = "select * from Artist where Name = %(Name)s"
            cur.execute(instr,{'Name':searchkey})
            print_table(cur)
        except:
            print("\nError: invalid search key provided. Terminating program.")
        
#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def collection_info(cur):
    return_upper = input("\nPress 0 to return to the upper menu, press enter or anything else to continue: ")
    if return_upper == '0':
        guest_view()
        return
    searchkey = input("\nPlease insert the name of the collection you are looking for (or type 0 to display information for all collections): ")
    if searchkey == '0':
        instr = "select * from Collection"
        cur.execute(instr)
        print_table(cur)

    else:
        try:
            instr = "select * from Collection where Name = %(Name)s"
            cur.execute(instr,{'Name':searchkey})
            print_table(cur)
        except:
            print("\nError: invalid search key provided. Terminating program.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def exhibition_info(cur):
    return_upper = input("\nPress 0 to return to the upper menu, press enter or anything else to continue: ")
    if return_upper == '0':
        guest_view()
        return
    print("\nPlease select the name of one of the exhibitions from the list below to see which art objects it has on display: ")
    instr = "select * from Exhibition"
    cur.execute(instr)
    print_table(cur)
    searchkey = input("\nPlease insert the name of the exhibition to see the objects from the museum it has on display (or type 0 to display information for all displays): ")
    if searchkey == '0':
        instr = "select * from Displays"
        cur.execute(instr)
        print_table(cur)

    else:
        try:
            instr = "select * from Displays where Exbn_name = %(Name)s"
            cur.execute(instr,{'Name':searchkey})
            print_table(cur)
        except:
            print("\nError: invalid search key provided. Terminating program.")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

if __name__ == "__main__":
    
    print("\nWelcome to the Art Museum Database.")
    print("In order to proceed, please select your role from the list of options given below:")
    print("1 - Database Admin")
    print("2 - Data Entry User")
    print("3 - Browse as Guest")

    selection = input("please type 1, 2, or 3 to select your role: ")

    if selection in ['1','2','3']:
        
        username= input("user name: ")
        passcode= input("password: ")
        cnx = mysql.connector.connect(
            host = "127.0.0.1",
            port = 3306,
            user = username,
            password = passcode
        )

        cur = cnx.cursor()
        cur.execute("use ARTMUSEUM")

        if selection == '1':
            admin_console()
        elif selection == '2':
            data_entry()
        elif selection == '3':
            guest_view()

        cnx.close()

    else:
        print("\nInvalid selection. Terminating program...")
    
    print("\nThank you for using the Art Museum Database application.\n")

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
