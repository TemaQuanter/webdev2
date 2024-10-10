CREATE TABLE verification(
    user_id INT PRIMARY KEY,
    email_is_verified BOOLEAN NOT NULL DEFAULT FALSE,

    FOREIGN KEY (user_id) REFERENCES users(user_id)
);