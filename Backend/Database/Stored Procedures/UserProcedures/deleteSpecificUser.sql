CREATE PROCEDURE SpDeleteSpecificUser @IdUser VARCHAR(50)
AS
BEGIN
 DELETE FROM users WHERE userId =@IdUser
END; 

EXECUTE SpDeleteSpecificUser @IdUser='12'