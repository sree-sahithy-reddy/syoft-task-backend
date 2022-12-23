CREATE TABLE products_list (
	id  VARCHAR (256) NOT NULL PRIMARY KEY,
    product_name VARCHAR (256),
    product_description VARCHAR,
    inventory_count INT,
    price INT, 
	created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP
);

CREATE TYPE role AS ENUM ('admin', 'manager', 'staff');

CREATE TABLE syoft_users (
    username VARCHAR (256) NOT NULL PRIMARY KEY,
    password VARCHAR,
    email VARCHAR,
    role role,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP 
);