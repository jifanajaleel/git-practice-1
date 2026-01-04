--DML query -> SELECT & INSERT query
INSERT INTO panchayath(panchayath_no, panchayath_name, president, president_contact_no) VALUES(1, 'Dharmasala', 'Anil', '+91 9447783756')
SELECT panchayath_no, panchayath_name, president, president_contact_no FROM panchayath
INSERT INTO panchayath(panchayath_no, panchayath_name, president, president_contact_no) VALUES(2, 'Parappur', 'Arjun', '+91 9447653756');
INSERT INTO panchayath(panchayath_no, panchayath_name, president, president_contact_no) VALUES(3, 'Vengara', 'Fathima', '+91 9447780097');
INSERT INTO panchayath(panchayath_no, panchayath_name, president, president_contact_no) VALUES(4, 'Vaaram', 'Javad', '+91 9447771238');
INSERT INTO panchayath(panchayath_no, panchayath_name, president, president_contact_no) VALUES(5, 'Xyz', 'Siju', '+91 9447783000');
SELECT * FROM panchayath;

--'where' and 'ilike' usage with 'AND', 'OR'
SELECT * FROM panchayath WHERE president = 'Arjun';
SELECT * FROM panchayath WHERE president ilike 'A%';
SELECT * FROM panchayath WHERE president ilike 'A%' AND panchayath_name ilike 'Dha%';
SELECT * FROM panchayath WHERE president ilike 'A%' OR panchayath_name ilike 'Dha%';

--difference between 'ilike' & 'like' is that 'like' is case sensitive and 'ilike' is not
SELECT * 
	FROM panchayath 
	WHERE president ilike '%A%'
	ORDER BY panchayath_no desc;
SELECT * 
	FROM panchayath 
	WHERE president like '%a%' OR president like '%A%'
	ORDER BY president asc;