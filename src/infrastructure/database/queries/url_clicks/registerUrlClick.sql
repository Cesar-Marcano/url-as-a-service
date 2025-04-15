INSERT INTO url_clicks
  (url_id, user_agent, ip_address, country, city)
    VALUES
  ($1, $2, $3, $4, $5)
    RETURNING 1;