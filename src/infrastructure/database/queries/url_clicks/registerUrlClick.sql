INSERT INTO url_clicks
  (url_id, user_agent, ip_address)
    VALUES
  ($1, $2, $3)
    RETURNING 1;