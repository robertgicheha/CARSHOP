CREATE TABLE users (userId VARCHAR(50) NOT NULL, userName VARCHAR(50) UNIQUE, email VARCHAR(50), password VARCHAR(50), address VARCHAR(50),
                   PRIMARY KEY (userId))

ALTER TABLE users
ADD fullName VARCHAR(50), phoneNo VARCHAR(50), country VARCHAR(50)  

ALTER TABLE users
ADD isAdmin VARCHAR(10) DEFAULT '0'


ALTER TABLE users ADD  emailSent VARCHAR(50) DEFAULT '0'