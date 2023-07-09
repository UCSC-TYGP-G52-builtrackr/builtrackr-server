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