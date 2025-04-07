-- delete users with duplicate email or username
DELETE FROM users
WHERE
    id NOT IN (
        SELECT
            MIN(id)
        FROM
            users
        GROUP BY
            email,
            username
        HAVING
            COUNT(*) > 1
    );

ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);