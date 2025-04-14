SELECT
    id,
    author_id,
    created_at,
    expiration_date,
    original_url,
    slug,
    updated_at
FROM
    urls
WHERE
    id = $1;