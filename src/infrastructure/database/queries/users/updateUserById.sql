UPDATE users
SET
    email = COALESCE($2, email),
    username = COALESCE($3, username),
    password = COALESCE($4, password),
    type = COALESCE($5, type),
    updated_at = CURRENT_TIMESTAMP,
    is_email_confirmed = COALESCE($6, is_email_confirmed),
    is_2fa_enabled = COALESCE($7, is_2fa_enabled)
WHERE id = $1
RETURNING id, email, username, type, created_at, updated_at, is_email_confirmed, is_2fa_enabled;