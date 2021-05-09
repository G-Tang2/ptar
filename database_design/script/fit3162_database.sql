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
DROP TABLE IF EXISTS wptas_test CASCADE;
DROP TABLE IF EXISTS wptas_ans CASCADE;
DROP TABLE IF EXISTS abs_test CASCADE;
DROP TABLE IF EXISTS abs_ans CASCADE;
DROP TABLE IF EXISTS wptas_ref_ans CASCADE;

CREATE TABLE patient (
	patient_id VARCHAR(20) PRIMARY KEY NOT NULL
);

CREATE TABLE test (
	test_id SERIAL NOT NULL,
	patient_id VARCHAR(20) NOT NULL,
	test_date_time TIMESTAMP NOT NULL,
	clinician_initials VARCHAR(20) NOT NULL,
	test_score SMALLINT NOT NULL,
	test_type VARCHAR(5) NOT NULL,
	PRIMARY KEY (test_id),
	FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	UNIQUE (patient_id, test_date_time),
	CHECK (test_type IN ('wptas', 'abs')),
	CHECK ((test_type = 'wptas' AND test_score BETWEEN 0 AND 12) OR (test_type = 'abs' AND test_score BETWEEN 0 AND 56))
);

CREATE TABLE wptas_test (
	wptas_question_no SMALLSERIAL NOT NULL,
	wptas_question_desc VARCHAR(255) NOT NULL,
	PRIMARY KEY (wptas_question_no)
);

CREATE TABLE wptas_ans (
	wptas_ans_id SERIAL NOT NULL,
	test_id INTEGER NOT NULL,
	wptas_question_no SMALLINT NOT NULL,
	wptas_mc_given BOOLEAN,
	wptas_correct BOOLEAN,
	wptas_ans_note VARCHAR(255),
	PRIMARY KEY (wptas_ans_id),
	FOREIGN KEY (test_id) REFERENCES test (test_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (wptas_question_no) REFERENCES wptas_test (wptas_question_no)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	UNIQUE (test_id, wptas_question_no)
);

CREATE TABLE wptas_ref_ans (
	wptas_ref_ans_id SERIAL NOT NULL,
	wptas_question_no INTEGER NOT NULL,
	patient_id VARCHAR(20) NOT NULL,
	wptas_ref_ans_date TIMESTAMP NOT NULL,
	wptas_ref_ans_info VARCHAR(255) NOT NULL,
	PRIMARY KEY (wptas_ref_ans_id),
	FOREIGN KEY (wptas_question_no) REFERENCES wptas_test (wptas_question_no)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	UNIQUE (wptas_question_no, patient_id, wptas_ref_ans_date)
);

CREATE TABLE abs_test (
	abs_question_no SERIAL NOT NULL,
	abs_question_desc VARCHAR(255) NOT NULL,
	PRIMARY KEY (abs_question_no)
);

CREATE TABLE abs_ans (
	abs_ans_id SERIAL NOT NULL,
	test_id INTEGER NOT NULL,
	abs_question_no SMALLINT NOT NULL,
	abs_option SMALLINT NOT NULL,
	PRIMARY KEY (abs_ans_id),
	FOREIGN KEY (test_id) REFERENCES test (test_id)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY (abs_question_no) REFERENCES abs_test (abs_question_no)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	UNIQUE (test_id, abs_question_no),
	CHECK (abs_option IN (1, 2, 3, 4))
);

INSERT INTO wptas_test VALUES (1, 'How old are you?');
INSERT INTO wptas_test VALUES (2, 'What is your date of birth?');
INSERT INTO wptas_test VALUES (3, 'What month are we in?');
INSERT INTO wptas_test VALUES (4, 'What time of day is it? (morning, afternoon or night)');
INSERT INTO wptas_test VALUES (5, 'What day of the week is it?');
INSERT INTO wptas_test VALUES (6, 'What year are we in?');
INSERT INTO wptas_test VALUES (7, 'What is the name of this place?');
INSERT INTO wptas_test VALUES (8, 'Face');
INSERT INTO wptas_test VALUES (9, 'Name');
INSERT INTO wptas_test VALUES (10, 'Picture I');
INSERT INTO wptas_test VALUES (11, 'Picture II');
INSERT INTO wptas_test VALUES (12, 'Picture III');

INSERT INTO abs_test VALUES (1, 'Short attention span, easy distractibility, inability to concentrate.');
INSERT INTO abs_test VALUES (2, 'Impulsive, impatient, low tolerance for pain or frustration.');
INSERT INTO abs_test VALUES (3, 'Uncooperative, resistant to care, demanding.');
INSERT INTO abs_test VALUES (4, 'Violent and/or threatening violence toward people or property.');
INSERT INTO abs_test VALUES (5, 'Explosive and/or unpredictable anger.');
INSERT INTO abs_test VALUES (6, 'Rocking, rubbing, moaning, or other self-stimulating behaviours.');
INSERT INTO abs_test VALUES (7, 'Pulling at tubes, restraints etc.');
INSERT INTO abs_test VALUES (8, 'Wandering from treatment areas.');
INSERT INTO abs_test VALUES (9, 'Restlessness, pacing, excessive movement.');
INSERT INTO abs_test VALUES (10, 'Repetitive behaviours, motor and/or verbal.');
INSERT INTO abs_test VALUES (11, 'Rapid, loud or excessive talking');
INSERT INTO abs_test VALUES (12, 'Sudden changes in mood.');
INSERT INTO abs_test VALUES (13, 'Easily initiated or excessive crying and/or laughter.');
INSERT INTO abs_test VALUES (14, 'Self-abusiveness, physical and/or verbal.');

------------------------------
-- REMOVE BEFORE DEPLOYMENT --
------------------------------
INSERT INTO patient VALUES ('T43ma7847QBaIG9Ufpln');
INSERT INTO patient VALUES ('nW083joLdz2Wotb7tDkt');
INSERT INTO patient VALUES ('GmVexuxfbkdBBz823JKe');
INSERT INTO patient VALUES ('pzw8MrVtVEuvFCcAnFaV');
INSERT INTO patient VALUES ('jkFMvxypwBOYjsz6LXue');
COMMIT;
