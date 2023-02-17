-- CREATE PROCEDURE SpGetSpecificUser @Email VARCHAR(50)
-- AS
-- BEGIN
--  SELECT * FROM users WHERE email =@Email
-- END; 

-- EXECUTE SpGetSpecificUser @Email=''

ALTER PROCEDURE SpGetSpecificUser  @Name VARCHAR(50)
AS
BEGIN
 SELECT * FROM users WHERE userName =@Name
END; 

EXECUTE SpGetSpecificUser @Name='Mary'