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

CREATE OR REPLACE FUNCTION add_employee(
  f_name VARCHAR,
  l_name VARCHAR,
  nic VARCHAR,
  tel_no VARCHAR,
  employee_id INTEGER,
  email VARCHAR,
  address VARCHAR,
  dob DATE,
  register_date DATE,
  hashed_password VARCHAR,
  company_id INTEGER,
  type INTEGER
)
RETURNS INTEGER AS $$
DECLARE
  first_table_id INTEGER;
BEGIN
  -- First table insertion
  INSERT INTO employee (f_name, l_name, nic, tel_no, id, email, address, dob, register_date, password, company_id, type)
  VALUES (f_name, l_name, nic, tel_no, employee_id, email, address, dob, register_date, hashed_password, company_id, type)
  RETURNING no INTO first_table_id;

  -- Second table insertion using the primary key from the first table
  INSERT INTO site_manager (employee_id)
  VALUES (first_table_id);

  -- Return the primary key of the first insertion
  RETURN first_table_id;
END;
$$ LANGUAGE plpgsql;