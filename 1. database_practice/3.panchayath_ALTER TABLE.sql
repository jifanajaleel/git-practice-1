select * from panchayath;
--Add a column
ALTER TABLE panchayath
ADD COLUMN office_location VARCHAR(50);

--Rename a column
ALTER TABLE panchayath
RENAME COLUMN office_location to office;

--Drop a column
ALTER TABLE panchayath
DROP COLUMN office;

--Rename a table
ALTER TABLE panchayath
RENAME TO panchayat;

ALTER TABLE panchayat
RENAME TO panchayath;

--Change datatype of a column (to CHAR)
ALTER TABLE panchayath
ALTER COLUMN president_contact_no
TYPE CHAR(14);

--Add or Drop constraints (eg: UNIQUE, NOT NULL, PRIMARY KEY, FOREIGN KEY, CHECK)
--Add or Drop UNIQUE
ALTER TABLE panchayath
ADD CONSTRAINT President_contact_no
UNIQUE(president_contact_no);

ALTER TABLE panchayath
DROP CONSTRAINT President_contact_no;

--Set or Drop NOT NULL constraint
ALTER TABLE panchayath
ALTER COLUMN president_contact_no
SET NOT NULL;

ALTER TABLE panchayath
ALTER COLUMN president_contact_no
DROP NOT NULL;

--Add or Drop PRIMARY KEY
ALTER TABLE panchayath
ADD CONSTRAINT p_key
PRIMARY KEY(panchayath_no);

--Add or Drop FOREIGN KEY
ALTER TABLE ward
ADD CONSTRAINT ward_p_key
FOREIGN KEY(panchayath_number)
REFERENCES panchayath(panchayath_no);

ALTER TABLE ward
DROP CONSTRAINT ward_p_key;