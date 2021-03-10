-- Database: fit3162

-- DROP DATABASE fit3162;

-- CREATE DATABASE fit3162
--     WITH 
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_Australia.1252'
--     LC_CTYPE = 'English_Australia.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

DROP TABLE IF EXISTS patient CASCADE;
DROP TABLE IF EXISTS test CASCADE;
DROP TABLE IF EXISTS clinician CASCADE;
DROP TABLE IF EXISTS wptas_test CASCADE;
DROP TABLE IF EXISTS abs_test CASCADE;

CREATE TABLE patient (
	patient_id SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE clinician (
	clinician_id SERIAL PRIMARY KEY NOT NULL,
	clinician_name VARCHAR(50)
);

CREATE TABLE test (
	patient_id INTEGER NOT NULL,
	test_date_time TIMESTAMP NOT NULL,
	clinician_id INTEGER NOT NULL,
	test_score SMALLINT NOT NULL,
	test_type VARCHAR(5) NOT NULL,
	PRIMARY KEY (patient_id, test_date_time),
	FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (clinician_id) REFERENCES clinician (clinician_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CHECK (test_type IN ('wptas', 'abs')),
	CHECK (test_score BETTWEN 0 AND 12)
);

CREATE TABLE wptas_test (
	patient_id INTEGER NOT NULL,
	wptas_question_no SMALLSERIAL NOT NULL,
	wptas_question_desc VARCHAR(255) NOT NULL,
	wptas_option_one BOOLEAN NOT NULL,
	wptas_option_two BOOLEAN NOT NULL,
	wptas_option_three BOOLEAN NOT NULL,
	PRIMARY KEY (patient_id, wptas_question_no),
	FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE abs_test (
	patient_id INTEGER NOT NULL,
	abs_question_no SMALLSERIAL NOT NULL,
	abs_question_desc VARCHAR(255) NOT NULL,
	abs_option SMALLINT,
	PRIMARY KEY (patient_id, abs_question_no),
	FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	CHECK (abs_option IN (1, 2, 3, 4))
);