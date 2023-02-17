CREATE TABLE cart (cardID VARCHAR(50), carBrand VARCHAR(50),customerName VARCHAR(50),userId VARCHAR(50),carId VARCHAR(50),prices DECIMAL(10),FOREIGN KEY (userId) REFERENCES users(userId),
                    FOREIGN KEY (carId) REFERENCES Cars(carId))

ALTER TABLE cart
ADD quantity NUMERIC(10)

ALTER TABLE cart
DROP COLUMN customerName