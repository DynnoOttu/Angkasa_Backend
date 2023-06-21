CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    photo VARCHAR DEFAULT 'https://res.cloudinary.com/dzs9aijqab/image/upload/v1686153375/jvwxznvqriapltlscx5f.png',
    phone VARCHAR,
    address VARCHAR,
    city VARCHAR,
    country VARCHAR,
    postal_code VARCHAR,
    verif INT DEFAULT 0,
    role VARCHAR DEFAULT 'user',
    OTP VARCHAR,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE Table airlines(
    id SERIAL PRIMARY KEY, 
    airline_name VARCHAR DEFAULT NULL, 
    photo VARCHAR DEFAULT NULL
);

CREATE TABLE airports(
    id SERIAL PRIMARY KEY,
    airport_name VARCHAR,
    city VARCHAR,
    country VARCHAR,
    airport_code VARCHAR
);


ALTER TABLE airports add created_at TIMESTAMP;
ALTER TABLE tickets add facilites VARCHAR;
ALTER TABLE tickets add flight_class VARCHAR;


CREATE TABLE tickets(
    id SERIAL PRIMARY KEY,
    airline_id SERIAL REFERENCES airlines(id),
    origin VARCHAR REFERENCES airports(id),
	destination VARCHAR REFERENCES airports(id),
	takeoff TIMESTAMP,
    landing TIMESTAMP,
    transit INTEGER,
    price INTEGER DEFAULT NULL,
    duration VARCHAR DEFAULT NULL,
    create_at TIMESTAMP DEFAULT NULL,
    delete_at TIMESTAMP DEFAULT NULL
);

SELECT * FROM tickets;

CREATE TABLE bookings(
    id SERIAL PRIMARY KEY, 
    users_id VARCHAR DEFAULT NULL,
    tickets_id INTEGER,
    is_paid INTEGER DEFAULT 0,
    title VARCHAR DEFAULT NULL,
    fullname VARCHAR DEFAULT NULL, 
    nationality VARCHAR DEFAULT NULL,
    insurance VARCHAR DEFAULT NULL,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL
);

SELECT * FROM bookings;

SELECT * FROM users;