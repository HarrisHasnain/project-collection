# Test queries

USE AIRLINECOMPANY;

select * from FLIGHT;
select * from FLIGHT_BOOKING;
select * from SEAT_INFO;
select * from REGISTERED_USER;
select * from user_account;
/*
INSERT INTO REGISTERED_USER (Email, Name, Address, Membership, Company_card, Advantages) VALUES ("harrishasnain12@gmail.com","harris","1 street","yes","no","no")
        ON DUPLICATE KEY UPDATE
        Name = VALUES(Name),
        Address = VALUES(Address),
        Membership = VALUES(Membership),
        Company_card = VALUES(Company_card),
        Advantages = VALUES(Advantages);
*/

/*
select MAX(IDNum) from FLIGHT;
*/

# USERS:

# 1. Browse the available flights to a specific destination.
# 2. Select their desired flight.
# 3. Browse the seat map graphically.
# 4. Select their desired seat (regular, or business-class)
# 5. Select the desired ticket cancellation insurance, if interested.
# 6. Make payment, using a credit card.
# 7. Receive ticket via email.
# 8. Receive receipt for their payments via email.
# 9. Cancel their flight.

# AGENTS:

# 1. Browse the list passengers in a flight.

# ADMINS:

# 1. Browse the list fights, their origin and destination in a specific date.
# 2. Browse the list crews in a specific flight (for example flight number AB123 to New York).
# 3. Brows the list Aircrafts that company owns
# 4. Add/remove a crew.
# 5. Add/remove an aircraft.
# 6. Add/remove flight destinations.
# 7. Add/remove/modify flights information.
# 8. Print list of users who have registered with the airline company. For more details see the additional information, below.

# -----------------------------------------------------------------------------------------------------------------------------------------------


/*
# SELECT * FROM FLIGHT WHERE IDNum = 1000;
SELECT DISTINCT FLIGHT_BOOKING.Passenger_email, SEAT_INFO.Seat_number, SEAT_INFO.Seat_type
FROM FLIGHT_BOOKING
JOIN SEAT_INFO ON FLIGHT_BOOKING.Flight_IDNum = SEAT_INFO.Flight_IDNum AND FLIGHT_BOOKING.Booked_seat = SEAT_INFO.Seat_number
WHERE FLIGHT_BOOKING.Flight_IDNum = 1000 ORDER BY SEAT_INFO.Seat_number ASC;
*/

/*
INSERT INTO PASSENGER (Email, Name, Address, Registered)
VALUES
('lebronjames@gmail.com', 'Lebron 2', '400 goated Street', 'true')
ON DUPLICATE KEY UPDATE
		Name = VALUES(Name),
		Address = VALUES(Address),
		Registered = VALUES(Registered);
*/


/*
SELECT 
  F.Origin, F.Destination, F.Start_date, F.End_date,
  S.Seat_number, S.Seat_type, S.Seat_price,
  FB.Flight_IDNum, FB.Ticket_insurance, FB.Passenger_Email
  FROM 
    FLIGHT_BOOKING FB
  JOIN 
    FLIGHT F ON FB.Flight_IDNum = F.IDNum
  JOIN 
    SEAT_INFO S ON FB.Flight_IDNum = S.Flight_IDNum AND FB.Booked_seat = S.Seat_number
  WHERE 
    FB.Passenger_Email = 'lukadoncic@gmail.com';
*/

/*
ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'computer_password';
FLUSH PRIVILEGES;
*/