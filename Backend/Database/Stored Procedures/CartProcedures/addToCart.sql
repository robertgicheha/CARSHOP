CREATE  PROCEDURE spAddToCart (@CardId VARCHAR(50), @CarBrand VARCHAR(50), @UserId VARCHAR(70),@CarId VARCHAR(50),@Prices DECIMAL(10),@Quantity NUMERIC(10))
AS
BEGIN

IF EXISTS (SELECT * FROM cart WHERE cardId = @CardId )
BEGIN
UPDATE cart SET quantity = quantity + @Quantity
END
ELSE 
BEGIN
INSERT INTO cart (
  cardID,
  carBrand,
  userId,
  carID,
  prices,
  quantity
)
VALUES (
  @CardId,
   @CarBrand,
    @UserId,
    @CarId,
    @Prices,
    @Quantity 
);
END
END




