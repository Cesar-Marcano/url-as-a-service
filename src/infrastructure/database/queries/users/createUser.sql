INSERT INTO users
  (email, password, user_type)
    VALUES
  ($1, $2, $3)
    RETURNING id, email, username, user_type, created_at, updated_at, is_email_confirmed, is_2fa_enabled;
