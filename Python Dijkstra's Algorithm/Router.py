# python3 Router.py 0 7000 config-A.txt
# python3 Router.py 1 7001 config-B.txt
# python3 Router.py 2 7002 config-C.txt
# python3 Router.py 3 7003 config-D.txt
# python3 Router.py 4 7004 config-E.txt
# python3 Router.py 5 7005 config-F.txt

from socket import *
import threading
import time
import sys
import json

# ** IMPORTANT **
# might have to install tabulate for formatted output table
from tabulate import tabulate

# define infinity (distance from router to non-neighbour)
INFINITY = 999

# need to lock threads when updating link state info
lock = threading.Lock()

# will contain key value pairs for all link state vectors of key: node id, value: link state vector array
link_state_info = {}

# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

def send_link_state_info(neighbours, num_nodes, router_id, router_port):
    
    while True:
        
        # wait for 1 second
        time.sleep(1)
        
        # create link state vector for this router
        link_state_vector = [INFINITY] * num_nodes
        link_state_vector[router_id] = 0
        for neighbour in neighbours:
            link_state_vector[neighbour['id']] = neighbour['link cost']
        # print("\nlink state vector in sender:")
        # print(link_state_vector)
        
        # lock to prevent modification of link_info_state global variable by multiple threads at the same time
        lock.acquire()
            
        # add (key: node id, value: link state vector) pairing for this router to link_state_info
        link_state_info[str(router_id)] = link_state_vector
        #if (len(link_state_info) <= 6):
            #print("\nlink state info in sender:")
            #print(link_state_info)
            
        # send link state vector info to neighbour routers
        for neighbour in neighbours:
            serverName = 'localhost'
            serverPort = neighbour['port']
            sendingSocket = socket(AF_INET, SOCK_DGRAM)
            sendingSocket.sendto(json.dumps(link_state_info).encode(), (serverName, serverPort))
            
        # release lock when modification is complete
        lock.release()
    
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
def receive_link_state_info(neighbours, num_nodes, router_id, router_port):
    
    # receive state link info from neighbours
    serverPort = router_port
    readingSocket = socket(AF_INET, SOCK_DGRAM)
    readingSocket.bind(('', serverPort))
    
    # read incoming updates to this router's port from its neighbours, update link state info accordingly
    while True:
        
        # receieve link state info
        data, clientAddress = readingSocket.recvfrom(1024)
        received_link_state_info = json.loads(data.decode())
        
        # lock threads when modifying global link state info
        lock.acquire()
        
        link_state_info.update(received_link_state_info)
        
        #if (len(link_state_info) <= 6):
            #print("\nlink_state_info in receiver:")
            #print(link_state_info)
            
        
        
         # send updated  link state info to neighbour routers
        for neighbour in neighbours:
                serverName = 'localhost'
                serverPort = neighbour['port']
                sendingSocket = socket(AF_INET, SOCK_DGRAM)
                sendingSocket.sendto(json.dumps(link_state_info).encode(), (serverName, serverPort))
        
        # release lock when modification is complete
        lock.release()
    
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
def computations(neighbours, num_nodes, router_id, router_port):
    
    global link_state_info
    
    while True:
        
        time.sleep(10)
        
        # lock since accessing global variable with thread
        lock.acquire()
        
        # only perform calculation if link_state_info has same amount of entries as there are nodes (knows link state vector for every node)
        if (len(link_state_info) < num_nodes):
            lock.release()
            continue
        
        #print("entered computation component")
        
        # sort dictionary
        link_state_info = {int(key): value for key, value in link_state_info.items()}
        link_state_info = dict(sorted(link_state_info.items()))
        
        # print("link state after transformation:")
        # print(link_state_info)
        
        # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        
        # Initialize least_cost_paths
        
        neigbour_list = []
        
        for neighbour in neighbours:
            neigbour_list.append(neighbour['id'])
            
        # initialize labels, needs to be somewhat "hard coded"
        # this is because lables of non-neigbours are not known, only their link state vectors
        # max number of nodes (from lab handout) is 10
        id_mapping_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'I', 9: 'J'}
        
        # will be created in order of nodes, so index 0 for example represents the first node, node "A" or node id "0"
        least_cost_paths = []
        for i in range(num_nodes):
            if i == router_id:
                least_cost_paths.append({"node": i, "least_cost_path": 0, "prev_node": router_id, "first_hop_node": router_id})
            else:
                least_cost_paths.append({"node": i, "least_cost_path": INFINITY, "prev_node": None, "first_hop_node": None})
        
        visited = []
        visited.append(router_id)
        
        for i in range(num_nodes):
            if i in neigbour_list:
                for neighbour in neighbours:
                    if neighbour['id'] == i:
                        least_cost_paths[i]["least_cost_path"] = neighbour["link cost"]
                        least_cost_paths[i]["prev_node"] = router_id
                        least_cost_paths[i]["first_hop_node"] = i
                     
        #print("least cost paths initialized:")   
        #for elem in least_cost_paths:
            #print(elem)
            
        #print("link state vector for this router:")
        #print(link_state_info[router_id])
        
        # loop component, ends when all nodes have been visited
        while (len(visited) < num_nodes):
            
            min_least_cost_path = INFINITY
            min_router = INFINITY
            for i in range(num_nodes):
                if (least_cost_paths[i]["least_cost_path"] < min_least_cost_path) and (i not in visited):
                    min_least_cost_path = least_cost_paths[i]["least_cost_path"]
                    min_router = i
                    
            #print("minimum path:")
            #print(min_least_cost_path)
            #print("router of that path:")  
            #print(min_router)    
                    
            # add w to N'
            visited.append(min_router)
            
            min_router_link_state_vector = link_state_info[min_router]
            
            #print("link state vector of minimum router:")
            #print(min_router_link_state_vector)
            
            for i in range(num_nodes):
                if (min_router_link_state_vector[i] < 999) and (i not in visited):
                    old_min_value = least_cost_paths[i]["least_cost_path"]
                    new_min_value = (min_router_link_state_vector[i]) + (least_cost_paths[min_router]["least_cost_path"])
                    least_cost_paths[i]["least_cost_path"] = min(old_min_value, new_min_value)
                    if (new_min_value < old_min_value):
                        least_cost_paths[i]["prev_node"] = min_router
                        # calculate first node to hop to in shortest path, use the first hop of whatever the minimum router is
                        least_cost_paths[i]["first_hop_node"] = least_cost_paths[min_router]["first_hop_node"]

                    
        #print("finalized least cost paths:")
        #for elem in least_cost_paths:
            #print(elem)
        
        #print("visited nodes:")
        #print(visited)
        
        print("\n\n\n")
        
        print("\n---------------------------------------------------------\n")
        
        print(f"\nDijkstra's Algorithm on router {id_mapping_dict[router_id]}:\n")
        
        dijkstra_list = []
        
        for elem in least_cost_paths:
            val_list = []
            val_list.append(elem["node"])
            val_list.append(elem["least_cost_path"])
            val_list.append(elem["prev_node"])
            dijkstra_list.append(val_list)
        
        dijkstra_header_list = ["Destination Router ID", "Distance", "Previous Router ID"]
            
        print(tabulate(dijkstra_list, headers = dijkstra_header_list, numalign = "left"))
        
        print(f"\n\n\nForwarding Table for router {id_mapping_dict[router_id]}:\n")
        
        forwarding_list = []
        
        for elem in least_cost_paths:
            if elem["node"] != router_id:
                values_list = []
                values_list.append(elem["node"])
                values_list.append(id_mapping_dict[elem["first_hop_node"]])
                forwarding_list.append(values_list)
        
        forwarding_header_list = ["Destination Router ID", "Next Hop Router Label"]
            
        print(tabulate(forwarding_list, headers = forwarding_header_list, numalign = "left"))
        
        print("\n---------------------------------------------------------\n")
        
        # XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        
        # release lock when calculation is complete
        lock.release()
    
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# main:
    
# check argument length
if len(sys.argv) != 4:
    print("Usage: python Router.py <routerid> <routerport> <configfile>")
    sys.exit(1)

# initialize variables to pass into threads
router_id = int(sys.argv[1])
router_port = int(sys.argv[2])
config_file = sys.argv[3]

num_nodes = 0
neighbours = []

# read necessary information from file, store into num_nodes and neighbours
with open (config_file, 'r') as f:
    lines = f.readlines()
    num_nodes = int(lines[0].strip())
    #print(f"\nnumber of nodes: {num_nodes}")
    for i in range(1, len(lines)):
        # check if end of file
        if ((lines[i][0] == "\n") or (lines[i][0] == " ")):
            break
        line = lines[i].strip()
        #print(line)
        neighbour_info = line.split()
        label = neighbour_info[0]
        id = int(neighbour_info[1])
        link_cost = int(neighbour_info[2])
        port_number = int(neighbour_info[3])
        neighbours.append({"label": label, "id": id, "link cost": link_cost, "port": port_number})
        
#print("\nneighbour list:")
#for neighbour in neighbours:
    #print(neighbour)
    
# create threads
send_info_thread = threading.Thread(target = send_link_state_info, args = (neighbours, num_nodes, router_id, router_port))
receive_info_thread = threading.Thread(target = receive_link_state_info, args = (neighbours, num_nodes, router_id, router_port))
computation_thread = threading.Thread(target = computations, args = (neighbours, num_nodes, router_id, router_port))

send_info_thread.start()
receive_info_thread.start()
computation_thread.start()

# time.sleep(20)

# send_info_thread.join()
# receive_info_thread.join()
# computation_thread.join()

#print (f"router #: {router_id} link state table:")
#print(link_state_info)