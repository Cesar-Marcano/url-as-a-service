SELECT
    date_trunc($1, click_time) AS time,
    COUNT(*) AS count
FROM url_clicks
WHERE url_id = $2
GROUP BY time
ORDER BY time;