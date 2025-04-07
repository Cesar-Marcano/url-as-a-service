INSERT INTO users
  (email, password, type)
    VALUES
  ($1, $2, $3)
    RETURNING id, email, username, type, created_at, updated_at, is_email_confirmed, is_2fa_enabled;
