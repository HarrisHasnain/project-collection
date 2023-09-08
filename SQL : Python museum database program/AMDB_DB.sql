DROP DATABASE IF EXISTS ARTMUSEUM;
CREATE DATABASE ARTMUSEUM;
USE ARTMUSEUM;

DROP TABLE IF EXISTS COLLECTION;
CREATE TABLE COLLECTION (
	Name			varchar(50) not null,
    Type			varchar(30) not null,
    Description		varchar(50) not null,
    Address			varchar(50) not null,
    Phone			varchar(30) not null,
    Contact_person	varchar(30) not null,
    primary key (Name)
);

INSERT INTO COLLECTION (Name, Type, Description, Address, Phone, Contact_person)
VALUES
('Museum of France', 'Museum', 'Head museum in France', '1234 France Ave', '123-456-7890', 'Jean Frank'),
('Adam Smith Collection', 'Personal', 'Personal collection of Adam Smith', '5678 Green Lane', '100-2000-3000', 'Adam Smith');



DROP TABLE IF EXISTS ARTIST;
CREATE TABLE ARTIST (
	Name			varchar(50) not null,
    Date_born		varchar(30) not null,
    Date_died		varchar(30),
    Origin_country	varchar(30) not null,
    Epoch			varchar(30) not null,
    Description		varchar(50) not null,
    Main_style 		varchar(30) not null,
    primary key (Name)
);

INSERT INTO ARTIST (Name, Date_born, Date_died, Origin_country, Epoch, Description, Main_style)
VALUES
('Leonardo Da Vinci', 'June 10th 1350', 'March 5th 1401', 'Italy', 'Renaissance', 'Italian artist', 'Paintings'),
('Bob Ross', 'May 26th 1946', 'September 29th 2002', 'USA', 'Modern', 'American artist', 'All art');



DROP TABLE IF EXISTS ART_OBJECT;
CREATE TABLE ART_OBJECT (
	IDNum 		integer not null,
    Epoch		varchar(30) not null,
    Origin 		varchar(30) not null,
    Year		varchar(30),
    Title		varchar(50) not null,
    Description	varchar(50) not null,
    Art_type	varchar(30) not null,
    Material 	varchar(30),
    Style		varchar(30),
    Height		integer,
    Weight		integer,
    Type 		varchar(30),
    Paint_type 	varchar(30),
	Artist_name	varchar(50),
    primary key (IDNum),
    CONSTRAINT OBJECTFK
    foreign key (Artist_name) references ARTIST(Name)
			ON DELETE SET NULL		ON UPDATE CASCADE
);

INSERT INTO ART_OBJECT (IDNum, Epoch, Origin, Year, Title, Description, Art_type, Material, Style, Height, Weight, Type, Paint_type, Artist_name)
VALUES
(1000, 'Renaissance', 'Italy', '1300', 'Mona Lisa', 'Italian painting', 'Painting', 'Canvas', 'Abstract', null, null, null, 'Oil', 'Leonardo Da Vinci'),
(2000, 'Ancient', 'Egypt', '2000BC', 'Pyramid of Giza', 'Egyptian pyramid', 'Statue', 'Stone', 'Symmetric', 1000, 2000, null, null, 'Bob Ross'),
(3000, 'Modern', 'Greece', '1845', 'David vs Goliath', 'Old greek sculpture', 'Sculpture', 'Cement', 'Rounded', 1000, 2000, null, null, 'Leonardo Da Vinci'),
(4000, 'Ancient', 'China', '1050', 'Art of War', 'Ancient chinese scripture', 'Other', null, 'Torn', null, null, 'Tattered', null, 'Bob Ross');



DROP TABLE IF EXISTS PERMANENT;
CREATE TABLE PERMANENT (
	IDNum			integer not null,
    Status			varchar(30) not null,
    Cost			integer not null,
    Date_acquired	date not null,
    primary key (IDNum),
    CONSTRAINT PERMFK
    foreign key (IDNum) references ART_OBJECT(IDNum)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

INSERT INTO PERMANENT (IDNum, Status, Cost, Date_acquired)
VALUES
(1000, 'Display', 5000, 20221016),
(2000, 'Stored', 10000, 20210703);

DROP TABLE IF EXISTS BORROWED;
CREATE TABLE BORROWED (
	IDNum			integer not null,
    Date_borrowed	date not null,
    Date_returned	date not null,
    Collection_name	varchar(50) not null,
    primary key (IDNum),
    CONSTRAINT BORRFKOBJECT
    foreign key (IDNum) references ART_OBJECT(IDNum)
			ON DELETE CASCADE		ON UPDATE CASCADE,
    CONSTRAINT BORRFKCOLL
    foreign key (Collection_name) references COLLECTION(Name)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

INSERT INTO BORROWED (IDNum, Date_borrowed, Date_returned, Collection_name)
VALUES
(3000, 20201204, 20201227, 'Museum of France'),
(4000, 20190223, 20190312, 'Adam Smith Collection');


DROP TABLE IF EXISTS EXHIBITION;
CREATE TABLE EXHIBITION (
	Name		varchar(50) not null,
    Start_date	date not null,
    End_date	date not null,
    primary key (Name)
);

INSERT INTO EXHIBITION (Name, Start_date, End_date)
VALUES
('2005 Art Fair', 20051018, 20051118),
('2010 Creativity Display', 20101105, 20101205);


DROP TABLE IF EXISTS DISPLAYS;
CREATE TABLE DISPLAYS (
	Object_IDNum	integer not null,
    Exbn_name		varchar(50) not null,
    primary key (Object_IDNum, Exbn_name),
    CONSTRAINT DSPLYFKOBJECT
    foreign key (Object_IDNum) references ART_OBJECT(IDNum)
			ON DELETE CASCADE		ON UPDATE CASCADE,
    CONSTRAINT DSPLYFKEXBN
    foreign key (Exbn_name) references EXHIBITION(Name)
			ON DELETE CASCADE		ON UPDATE CASCADE
);

INSERT INTO DISPLAYS (Object_IDNum, Exbn_name)
VALUES
(1000, '2005 Art Fair'),
(3000, '2010 Creativity Display');
