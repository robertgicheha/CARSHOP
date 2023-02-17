CREATE PROCEDURE SpUpdateUserSentEmail  @IdUser VARCHAR(50)
AS
BEGIN
 UPDATE users SET emailSent ='1' WHERE userId = @IdUser
END; 

EXECUTE SpUpdateUserSentEmail @IdUser='24'