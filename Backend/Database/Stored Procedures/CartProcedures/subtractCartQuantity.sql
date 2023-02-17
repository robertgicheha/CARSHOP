CREATE PROCEDURE SubtractCar
    @CardID VARCHAR(50)
AS
BEGIN
  SET NOCOUNT ON 
    IF EXISTS(SELECT * FROM cart WHERE cardID = @CardID AND quantity>1)
   BEGIN 
    UPDATE cart SET quantity=quantity -1 WHERE cardID = @CardID
    SELECT * FROM cart WHERE cardID = @CardID
END
ELSE
BEGIN
 DELETE  FROM cart WHERE  cardID = @CardID
END
END



