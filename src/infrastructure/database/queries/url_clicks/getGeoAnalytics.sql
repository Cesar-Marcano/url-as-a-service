SELECT
    country,
    city,
    COUNT(id) AS count
FROM
    url_clicks
WHERE
    url_id = $1
GROUP BY
    country, city
ORDER BY
    count DESC;