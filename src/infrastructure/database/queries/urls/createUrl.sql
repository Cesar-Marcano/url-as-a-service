INSERT INTO urls
  (slug, original_url, author_id, expiration_date)
    VALUES
  ($1, $2, $3, $4)
    RETURNING id, author_id, created_at, expiration_date, original_url, slug, updated_at;