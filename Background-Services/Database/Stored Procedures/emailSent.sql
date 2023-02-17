CREATE PROCEDURE SpSendWelcomeEmails
AS
BEGIN
 SELECT * FROM users WHERE emailSent ='0'
END; 

EXECUTE SpSendWelcomeEmails