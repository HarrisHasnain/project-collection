# Airline Company Database

DROP DATABASE IF EXISTS AIRLINECOMPANY;
CREATE DATABASE AIRLINECOMPANY;
USE AIRLINECOMPANY;

DROP TABLE IF EXISTS AIRCRAFT;
CREATE TABLE AIRCRAFT (
	Name			varchar(100) not null,
    primary key (Name)
);

DROP TABLE IF EXISTS FLIGHT;
CREATE TABLE FLIGHT (
	IDNum			integer not null,
    Aircraft		varchar(100) DEFAULT 'none',
    Origin			varchar(100) DEFAULT 'none',
    Destination		varchar(100) DEFAULT 'none',
    Start_date		varchar(100) DEFAULT 'none',
    End_date		varchar(100) DEFAULT 'none',
    primary key (IDNum),
    CONSTRAINT FLIGHT_FK
    foreign key (Aircraft) references AIRCRAFT(Name)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS SEAT_INFO;
CREATE TABLE SEAT_INFO (
	Flight_IDNum		integer not null,
	Seat_number			integer not null,
    Seat_type			varchar(100) not null,
    Seat_price			varchar(100) not null,
    Seat_status			varchar(100) DEFAULT 'empty',
    primary key (Flight_IDNum, Seat_number),
    CONSTRAINT SEAT_FK
    foreign key (Flight_IDNum) references FLIGHT(IDNum)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS FLIGHT_BOOKING;
CREATE TABLE FLIGHT_BOOKING (
	Passenger_email		varchar(100) not null,
    Flight_IDNum		integer not null,
    Booked_seat			varchar(100) not null,
    Ticket_insurance	varchar(100) default 'none',
    primary key (Passenger_email, Flight_IDNum, Booked_seat),
	CONSTRAINT BOOKING_FK_FLIGHT
	foreign key (Flight_IDNum) references FLIGHT(IDNum)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

DROP TABLE IF EXISTS CREW_MEMBER;
CREATE TABLE CREW_MEMBER (
	Member_name			varchar(100) not null,
    Member_role			varchar(100) default 'none',
    Flight_IDNum		integer not null,
    primary key (Member_name, Flight_IDNum),
    CONSTRAINT CREWFK
    foreign key (Flight_IDNum) references FLIGHT(IDNum)
    		ON DELETE CASCADE		ON UPDATE CASCADE
);
# when creating new crew member for a flight, check if their name is in name array, if so do not add them.

DROP TABLE IF EXISTS REGISTERED_USER;
CREATE TABLE REGISTERED_USER (
	Email			varchar(100) not null,
    Name			varchar(100) DEFAULT 'none',
    Address			varchar(100) DEFAULT 'none',
    Membership 		varchar(100) DEFAULT 'no',
    Company_card 	varchar(100) DEFAULT 'no',
    Advantages 		varchar(100) DEFAULT 'no',
    primary key (Email)
);

DROP TABLE IF EXISTS USER_ACCOUNT;
CREATE TABLE USER_ACCOUNT (
	User_email			varchar(100) not null,
	Login_password		varchar(100) not null,
    primary key (User_email)
);

DROP TABLE IF EXISTS ADMIN_LOGIN;
CREATE TABLE ADMIN_LOGIN (
	Login_password		varchar(100) not null,
    primary key (Login_password)
);

DROP TABLE IF EXISTS EMPLOYEE_LOGIN;
CREATE TABLE EMPLOYEE_LOGIN (
	Login_password		varchar(100) not null,
    primary key (Login_password)
);

# initialize admin password
INSERT INTO ADMIN_LOGIN (Login_password)
VALUES
('password');

# initialize employee password
INSERT INTO EMPLOYEE_LOGIN (Login_password)
VALUES
('password');

# Initialization of database:
# after creating a flight, 2x3 = 6 seats should be created for that flight, along with at least 1 captain crew member

INSERT INTO AIRCRAFT (Name)
VALUES
('Boeing 747'),
('Boeing 750'),
('Boeing 747')
	ON DUPLICATE KEY UPDATE
    Name = Values(Name);


INSERT INTO FLIGHT (IDNum, Aircraft, Origin, Destination, Start_Date, End_Date)
VALUES
(1000, 'Boeing 747', 'Calgary, Canada', 'New York, USA', 'Nov 16th 2023, 2:00PM', 'Nov 16th 2023, 5:00PM'),
(1001, 'Boeing 750', 'London, England', 'Paris, France', 'Dec 9th 2023, 11:00PM', 'Dec 10th 2023, 2:00AM');

INSERT INTO SEAT_INFO (Flight_IDNum, Seat_number, Seat_type, Seat_price, Seat_status)
VALUES
(1000, 1, 'Standard', '$100', 'empty'),
(1000, 2, 'Standard', '$100', 'full'),
(1000, 3, 'Comfort', '$140', 'full'),
(1000, 4, 'Comfort', '$140', 'empty'),
(1000, 5, 'Business', '$200', 'full'),
(1000, 6, 'Business', '$200', 'empty'),
(1001, 1, 'Standard', '$100', 'full'),
(1001, 2, 'Standard', '$100', 'full'),
(1001, 3, 'Comfort', '$140', 'empty'),
(1001, 4, 'Comfort', '$140', 'full'),
(1001, 5, 'Business', '$200', 'empty'),
(1001, 6, 'Business', '$200', 'full');

INSERT INTO CREW_MEMBER (Member_name, Member_role, Flight_IDNum)
VALUES
('Todd', 'Captain', '1000'),
('Sam', 'Chef', '1000'),
('John', 'Captain', '1001'),
('Jack', 'Attendant', '1001');

INSERT INTO FLIGHT_BOOKING (Passenger_email, Flight_IDNum, Booked_seat, Ticket_insurance)
VALUES
('lebronjames@gmail.com', 1000, 3, 'none'),
('stephencurry@gmail.com', 1001, 4, 'bought'),
('lukadoncic@gmail.com', 1000, 5, 'bought'),
('nikolajokic@gmail.com', 1001, 6, 'none'),
('lukadoncic@gmail.com', 1001, 1, 'none'),
('harrishasnain12@gmail.com', 1000, 2, 'none'),
('harrishasnain12@gmail.com', 1001, 2, 'bought');

INSERT INTO REGISTERED_USER (Email, Name, Address, Membership, Company_card, Advantages)
VALUES
('lebronjames@gmail.com', 'Lebron James', '500 Laker St', 'yes', 'no', 'no'),
('stephencurry@gmail.com', 'Steph Curry', '100 Golden St', 'no', 'yes', 'no');

INSERT INTO USER_ACCOUNT (User_email, Login_password)
VALUES
('lebronjames@gmail.com', 'coolpassword'),
('harrishasnain12@gmail.com', 'password123');