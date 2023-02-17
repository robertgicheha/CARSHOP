CREATE PROCEDURE softDeleteProduct @CarId VARCHAR(50)
AS
BEGIN
  UPDATE Cars SET isDeleted= '1' WHERE carId =@CarId 

END

SELECT * FROM Cars