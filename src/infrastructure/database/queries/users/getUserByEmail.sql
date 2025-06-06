SELECT 
    id, 
    email, 
    username, 
    password,
    type, 
    created_at, 
    updated_at, 
    is_email_confirmed, 
    is_2fa_enabled
FROM 
    users
WHERE 
    email = $1;