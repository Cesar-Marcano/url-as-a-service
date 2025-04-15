SELECT
    user_agent,
    COUNT(*) AS count
FROM url_clicks
WHERE url_id = $1
GROUP BY user_agent
ORDER BY count DESC;