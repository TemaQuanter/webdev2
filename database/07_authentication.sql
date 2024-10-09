CREATE TABLE authentication (
    auth_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    refresh_token TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);