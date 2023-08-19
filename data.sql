Create table users (
	company_id SERIAL PRIMARY KEY,
	company_name varchar(255),
	reg_no varchar(255),
	br_path varchar(255),
	company_email varchar(255),
	address_line_1 varchar(255),
	address_line_2 varchar(255),
	tel_no varchar (10),
	user_name varchar(255),
	password varchar (255)
);

Create table tasks (
	task_id SERIAL PRIMARY KEY,
	taskName varchar(255),
	specialInformation varchar(255),
	dueDate date,
);

CREATE TABLE user_roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR (255),
	photo_path VARCHAR (255)
);
CREATE TABLE role_privileges (
    no INTEGER GENERATED ALWAYS AS IDENTITY,
    role_id INTEGER,
    privilege VARCHAR(255),
    PRIMARY KEY (role_id, privilege),
    FOREIGN KEY (role_id) REFERENCES user_roles(role_id)
);
CREATE TABLE priviliges (
	no SERIAL PRIMARY KEY,
	privilege varchar (255)
);
INSERT INTO privileges (privilege) VALUES 
	('Create user Profile'),
  	('Create Siets'),
  	('Add Task'),
  	('Assign labourars'),
	('Review Task'),
	('Decline Task'),
	('Remove Tasks'),
	('Upload Documents'),
	('Request Inventory');

CREATE TABLE employee (
	no SERIAL PRIMARY KEY,
	f_name VARCHAR (50),
	l_name VARCHAR (50),
	nic varchar (12),
	tel_no varchar (10),
	id varchar (50),
	email VARCHAR (50),
	address varchar (100),
	dob DATE,
	register_date DATE,
	password varchar (255),
	company_id int,
	type int, 
	FOREIGN KEY (company_id) REFERENCES users(company_id)
);

SELECT
    e.*,
	u.role_name
FROM
    employee as e
INNER JOIN user_roles as u
    ON e.type=u.type AND e.company_id=u.company_id
WHERE e.company_id = 1 