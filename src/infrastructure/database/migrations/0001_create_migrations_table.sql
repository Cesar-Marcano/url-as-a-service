CREATE TABLE
    IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        executed_at TIMESTAMP NOT NULL DEFAULT NOW ()
    );