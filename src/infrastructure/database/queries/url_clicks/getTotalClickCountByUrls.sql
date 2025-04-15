SELECT
    u.id AS url_id,
    COUNT(uc.url_id) AS click_count
FROM urls u
LEFT JOIN url_clicks uc ON u.id = uc.url_id
WHERE u.author_id = $1
GROUP BY u.id;