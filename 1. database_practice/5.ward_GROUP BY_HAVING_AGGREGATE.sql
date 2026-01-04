--GROUP BY function
SELECT * FROM ward;

SELECT panchayath_number 
FROM ward 
GROUP BY panchayath_number;

--AGGREGATE function (eg:COUNT, SUM, AVG, MAX, MIN)
SELECT COUNT(*) FROM ward;

SELECT panchayath_number, COUNT(ward_no) 
FROM ward 
GROUP BY panchayath_number;

ALTER TABLE ward
ADD COLUMN income money;

UPDATE ward
SET income=500
WHERE ward_no<5;

SELECT panchayath_number, COUNT(ward_no), SUM(income::numeric), AVG(income::numeric)
FROM ward w
GROUP BY panchayath_number;

SELECT w.panchayath_number, COUNT(ward_no) 
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no	
GROUP BY panchayath_number;

SELECT w.panchayath_number, p.panchayath_name, COUNT(ward_no)
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no	
GROUP BY w.panchayath_number, p.panchayath_name;

SELECT min(income::numeric) FROM ward;
SELECT max(income::numeric) FROM ward;

SELECT w.panchayath_number, COUNT(ward_no), min(income::numeric)
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no	
GROUP BY w.panchayath_number;

SELECT w.panchayath_number, p.panchayath_name, COUNT(ward_no), min(income::numeric)
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no
WHERE p.panchayath_name ilike 'Dh%'
GROUP BY w.panchayath_number, p.panchayath_name;

--HAVING function
SELECT w.panchayath_number, p.panchayath_name, COUNT(ward_no), SUM(income::numeric)
FROM ward w
INNER JOIN panchayath p ON w.panchayath_number=p.panchayath_no
WHERE p.panchayath_name ilike 'Dh%'
GROUP BY w.panchayath_number, p.panchayath_name
HAVING SUM(income::numeric)>400;