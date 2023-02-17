-- CREATE PROCEDURE spRegisterUser( @IdUser VARCHAR(50), @Name VARCHAR(50), @Email VARCHAR(50), @Password VARCHAR(50), @Address VARCHAR(50))
-- AS

-- BEGIN
-- INSERT INTO users
--      (
--     userId ,
--     userName ,
--     email ,
--     password,
--     address )
-- VALUES
--     (@IdUser ,
--      @Name,
--      @Email ,
--      @Password,
--      @Address )   
-- END     

-- EXECUTE spRegisterUser @IdUser = '12',
--      @Name='Mary',
--      @Email='mary@gmail.com' ,
--      @Password='123cndffc',
--      @Address='6th street Avenue' ;   


CREATE OR ALTER PROCEDURE spRegisterUser( @IdUser VARCHAR(50), @Name VARCHAR(50), @Email VARCHAR(50), @Password VARCHAR(50), @Address VARCHAR(50),
                @FullName VARCHAR(50),@PhoneNo VARCHAR(50),@country VARCHAR(50),@Admin VARCHAR(10))
AS

BEGIN
INSERT INTO users
     (
    userId ,
    userName ,
    email ,
    password,
    address,
    fullname,
    phoneNo,
    country,
    isAdmin )
VALUES
    (@IdUser ,
     @Name,
     @Email ,
     @Password,
     @Address,
     @FullName,
     @PhoneNo,
     @country,
     @Admin)   
END;         

EXECUTE spRegisterUser
