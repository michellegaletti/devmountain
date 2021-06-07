-- Get all info about user where their email is equal to the one passed in
SELECT * FROM users
WHERE email = $1; 