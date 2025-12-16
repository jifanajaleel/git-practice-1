--DDL query -> CREATE & ALTER query
CREATE TABLE IF NOT EXISTS ward(
	ward_no SERIAL PRIMARY KEY,
	ward_name VARCHAR(100) UNIQUE NOT NULL,
	member_name VARCHAR(150),
	member_contact_no VARCHAR(15) UNIQUE
);

INSERT INTO ward(ward_name, member_name, member_contact_no) VALUES('Ward 1', 'Akhil', '+91 9400782664');
INSERT INTO ward(ward_name, member_name, member_contact_no) VALUES('Ward 2', 'Sujith', '+91 9400287466');
SELECT * FROM ward;

ALTER TABLE ward
ADD COLUMN panchayath_number BIGINT;

ALTER TABLE ward
ADD CONSTRAINT fk_ward_panchayath_no
FOREIGN KEY (panchayath_number)
REFERENCES panchayath(panchayath_no);

--DML query -> UPDATE query
UPDATE ward
	SET panchayath_number=3;

UPDATE ward
	SET panchayath_number=1
	WHERE ward_no=2;

--DML query -> DELETE query
DELETE FROM ward
WHERE panchayath_number=3;

INSERT INTO ward(ward_no, ward_name, member_name, member_contact_no, panchayath_number) VALUES(1, 'Ward 1', 'Akhil', '+91 9400782664', 3);
INSERT INTO ward(ward_no, ward_name, member_name, member_contact_no, panchayath_number) VALUES(3, 'Ward 3', 'Jasir', '+91 9400796003', 3);
SELECT * FROM ward ORDER BY ward_no asc;