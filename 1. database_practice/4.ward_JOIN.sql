--INNER JOIN

SELECT * FROM ward;
INSERT INTO ward(ward_name, member_name) VALUES('Ward 10', 'Vinod');
INSERT INTO ward(ward_name, member_name) VALUES('Ward 11', 'Ramesh');

SELECT *
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no;

SELECT w.ward_no, w.ward_name, w.member_name, p.panchayath_name as panchayath
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no;

SELECT w.ward_no, w.ward_name, w.member_name, p.panchayath_name as panchayath
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no
WHERE w.member_name like 'S%';

--OUTER JOIN (Left Join, Right Join)
--LEFT JOIN
SELECT *
FROM ward w
LEFT JOIN panchayath p ON w.panchayath_number=p.panchayath_no;

--RIGHT JOIN
SELECT *
FROM ward w
RIGHT JOIN panchayath p ON w.panchayath_number=p.panchayath_no;