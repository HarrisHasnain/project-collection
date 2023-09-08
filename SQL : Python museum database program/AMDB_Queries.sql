USE ARTMUSEUM;

#Summary of all tables, actual queries below)

#COLLECTION Table:
SELECT *
FROM COLLECTION;
#This table displays the information of other collections from which the museum borrows art.
#It's primary (unique) key is the collection's name.

#ARTIST Table:
SELECT *
FROM ARTIST;
#This table displays the information of the artists of the objects in the mueseum, if they are known.
##It's primary (unique) key is the artist's name.

#ART_OBJECT Table:
SELECT *
FROM ART_OBJECT;
#This table displays the information of the art objects in the museum, including their type and other associated type dependent information.
#It's primary (unique) key is the object's ID number.
#It has information for the artist's name, which is a foreign key referencing the associated name in the ARTIST table.
#If the information for the referenced artist's name (primary key) is deleted, this foreign key is now null, meaning that the artist's name is simply unknown.
#If the information for the referenced artist's name (primary key) is updated, this foreign key will cascade, meaning that the artist name in this table will update accordingly as well.

#PERMANENT Table:
SELECT *
FROM PERMANENT;
#This table displays extra specialized information for art objects categorized as permanent (belonging to the museum).
#It's primary (unique) key is the object's ID number.
#This ID number is also a foreign key which references the associated ID number in the ART_OBJECT table.
#If the information for the referenced object's ID number (primary key) is deleted, this foreign key will cascade, meaning that the corresponding information in this table will be deleted as well.
#If the information for the referenced object's ID number (primary key) is updated, this foreign key will cascade, meaning that the object's ID number in this table will update accordingly as well.

#BORROWED Table:
SELECT *
FROM BORROWED;
#This table displays extra specialized information for art objects categorized as borrowed (belonging to other collections).
#It's primary (unique) key is the object's ID number.
#This ID number is also a foreign key which references the associated ID number in the ART_OBJECT table.
#If the information for the referenced object's ID number (primary key) is deleted, this foreign key will cascade, meaning that the corresponding information in this table will be deleted as well.
#If the information for the referenced object's ID number (primary key) is updated, this foreign key will cascade, meaning that the object's ID number in this table will update accordingly as well.
#It also has information for the name of the collection it was borrowed from, which is a foreign key referencing the associated name in the COLLECTION table.
#If the information for the referenced collection's name (primary key) is deleted, this foreign key will cascade, meaning that the corresponding information in this table will be deleted as well, as the collection no longer exists.
#If the information for the referenced collection's name (primary key) is updated, this foreign key will cascade, meaning that the collection's name in this table will update accordingly as well.

#EXHIBITION Table:
SELECT *
FROM EXHIBITION;
#This table displays the information of exhibitions for displaying art objects from the museum.
#It's primary (unique) key is the exhibition's name.

#DISPLAYS Table:
SELECT *
FROM DISPLAYS;
#This table displays information for the relationship between art objects and the exhibition they are displayed in, showing the associated exhibition for each object on display.
#It has a primary (unique) key which is the object's ID number.
#This ID number is also a foreign key which references the associated ID number in the ART_OBJECT table.
#If the information for the referenced object's ID number (primary key) is deleted, this foreign key will cascade, meaning that the corresponding information in this table will be deleted as well.
#If the information for the referenced object's ID number (primary key) is updated, this foreign key will cascade, meaning that the object's ID number in this table will update accordingly as well.
#It has another primary key which is the exhibition's name.
#This exhibition name is also a foreign key which references the associated name in the EXHIBITION table.
#If the information for the referenced exhibition's name (primary key) is deleted, this foreign key will cascade, meaning that the corresponding information in this table will be deleted as well, as the exhibition no longer exists.
#If the information for the referenced exhibition's name (primary key) is updated, this foreign key will cascade, meaning that the object's exhibition name in this table will update accordingly as well.

#1)
USE ARTMUSEUM;

SELECT *
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'ARTMUSEUM';

SELECT *
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
WHERE CONSTRAINT_SCHEMA = 'ARTMUSEUM';

#The information schemas above show all of the tables in the database, and information regarding each table as well.
#The schemas also show all of the constraints that the database has, the type of constraint, the table that constraint is associated with, and more.

#2)

SELECT ART_OBJECT.Title, ART_OBJECT.Year
FROM ART_OBJECT;

#3)

SELECT ART_OBJECT.Year, ART_OBJECT.Title, ART_OBJECT.Art_type
FROM ART_OBJECT
ORDER BY Year ASC;

#4)

SELECT ART_OBJECT.Title, ART_OBJECT.Year
FROM ART_OBJECT
WHERE ART_OBJECT.IDNum IN (SELECT ART_OBJECT.IDNum
FROM ART_OBJECT
WHERE ART_OBJECT.Art_Type = 'Statue');

#5)

SELECT ART_OBJECT.Title, PERMANENT.Date_acquired
FROM (ART_OBJECT JOIN PERMANENT ON PERMANENT.IDNum = ART_OBJECT.IDNum)
WHERE PERMANENT.Status = 'Display';

#6)

SET SQL_SAFE_UPDATES = 0;
#To use triggers that don't have a primary key in the WHERE statement, SQL safe mode must be temporarily turned off (at least on my computer).
#SQL safe mode is turned back on after query finishes executing.

UPDATE PERMANENT
SET PERMANENT.Status = 'Stored'
WHERE PERMANENT.IDNum IN (SELECT ART_OBJECT.IDNum
FROM ART_OBJECT
WHERE ART_OBJECT.Art_type = 'Painting');

SET SQL_SAFE_UPDATES = 1;

#6 - Bonus)

CREATE TRIGGER After_permanent_status_update
AFTER UPDATE ON PERMANENT
FOR EACH ROW
DELETE FROM DISPLAYS
WHERE DISPLAYS.Object_IDNum IN (SELECT PERMANENT.IDNum
FROM PERMANENT
WHERE PERMANENT.Status = 'Stored');

#The function of this custom trigger is to remove an art object from the DISPLAYS table (if it exists in there) when it's status is set to "stored" in the PERMANENT table (if it exists in there).
#This is because intuitively, stored objects in the museum are most likely not going to also somehow be on display at exhibitions as well.

SET SQL_SAFE_UPDATES = 0;

UPDATE PERMANENT
SET PERMANENT.Status = 'Stored'
WHERE PERMANENT.IDNum = 1000;

SELECT *
FROM PERMANENT;
    
SELECT *
FROM DISPLAYS;

SET SQL_SAFE_UPDATES = 1;

#7)

SET SQL_SAFE_UPDATES = 0;

DELETE FROM ART_OBJECT
WHERE ART_OBJECT.IDNum IN (SELECT PERMANENT.IDNum
FROM PERMANENT
WHERE PERMANENT.Status = 'Stored');

SET SQL_SAFE_UPDATES = 1;

#7 - Bonus)

CREATE TRIGGER After_display_delete
AFTER DELETE ON DISPLAYS
FOR EACH ROW
DELETE FROM EXHIBITION
WHERE EXHIBITION.Name NOT IN (SELECT DISPLAYS.Exbn_name
FROM DISPLAYS);

#The function of this custom trigger is to remove an exhibition from the EXHIBITION table when it no longer has any of the museum's art on display in the DISPLAYS table (name no longer exists anywhere in DISPLAYS table).
#This is because intuitively, the museum would not care to catalog an exhibition if the exhibition does not feature any of the museum's art.

SET SQL_SAFE_UPDATES = 0;

DELETE FROM DISPLAYS
WHERE DISPLAYS.OBJECT_IDNum = 1000;

SELECT *
FROM DISPLAYS;

SELECT *
FROM EXHIBITION;

SET SQL_SAFE_UPDATES = 1;
