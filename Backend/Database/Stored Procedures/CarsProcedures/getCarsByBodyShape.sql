CREATE OR ALTER PROCEDURE getCarByBodyShape @BodyType VARCHAR(50)
AS
BEGIN 
SELECT * FROM Cars WHERE  bodyType =@BodyType
END

EXECUTE getCarByBodyShape @BodyType='Saloon'