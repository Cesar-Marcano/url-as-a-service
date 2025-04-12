CREATE TABLE
    IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        original_url TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        author_id INT REFERENCES users (id) ON DELETE CASCADE,
        expiration_date TIMESTAMPTZ
    );