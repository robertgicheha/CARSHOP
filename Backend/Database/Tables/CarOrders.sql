CREATE DATABASE carOrders
CREATE TABLE specCarOrders (id VARCHAR(50), userName VARCHAR(50),carId VARCHAR(50),email VARCHAR(50),carName VARCHAR(30),carPrice DECIMAL(10),isDeleted VARCHAR(10) DEFAULT '0')
 ALTER TABLE  specCarOrders
 ADD isDeleted VARCHAR(10) DEFAULT '0';

 

 

 