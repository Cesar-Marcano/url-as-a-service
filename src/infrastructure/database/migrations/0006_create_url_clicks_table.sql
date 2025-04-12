CREATE TABLE
    IF NOT EXISTS url_clicks (
        id SERIAL PRIMARY KEY,
        url_id INT REFERENCES urls (id) ON DELETE CASCADE,
        click_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT NOT NULL,
        ip_address TEXT NOT NULL
    );