CREATE OR ALTER PROCEDURE spAddCars( @CarId VARCHAR(50), @Model VARCHAR(50), @BodyType VARCHAR(50), @Brand VARCHAR(50), @Prices DECIMAL(10),
                @IsDeleted VARCHAR(50))
AS

BEGIN
INSERT INTO Cars
     (
    carId, 
    model , 
    bodyType , 
    brand,
    prices,
    isDeleted )
VALUES
    (@CarId ,
     @Model,
     @BodyType ,
     @Brand,
     @Prices,
     @IsDeleted 
     ) 
SELECT * FROM Cars WHERE carId= @CarId  
END; 
      
EXECUTE spAddCars
SELECT * FROM Cars