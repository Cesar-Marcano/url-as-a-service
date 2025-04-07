SELECT 
    id, 
    email, 
    username, 
    type, 
    created_at, 
    updated_at, 
    is_email_confirmed, 
    is_2fa_enabled
FROM 
    users
WHERE 
    username = $1;