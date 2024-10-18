-- Enable the extension for UUID generation.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_uuid UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    balance NUMERIC(10, 2) NOT NULL,
    profile_picture_url TEXT,
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE
);


-- A function that validates user credentials before allowing them
-- in the database.
CREATE OR REPLACE FUNCTION check_correct_user_credentials()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check that the user email follows correct format.
    IF NEW.email NOT LIKE '%@%.%' THEN
        RAISE EXCEPTION 'Incorrect format of email';
    END IF;

    RETURN NEW;
END;
$$;


-- This function makes sure that each user record has a relative verification record.
CREATE OR REPLACE FUNCTION create_verification_record()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check if the user has a verification record on the insert.
    IF NOT EXISTS (SELECT 1 FROM verification WHERE verification.user_id = NEW.user_id) THEN
        -- Insert verification record.
        INSERT INTO verification (user_id) VALUES (NEW.user_id);
    END IF;

    RETURN NEW;
END;
$$;


-- This function performs a soft-delete for the user.
CREATE OR REPLACE PROCEDURE soft_delete_user(user_id INT)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Check that the user actually exists in the database.
    IF NOT EXISTS (SELECT 1 FROM users WHERE users.user_id = soft_delete_user.user_id) THEN
        -- The user does not exist.
        RAISE EXCEPTION 'The user with ID % does not exist', soft_delete_user.user_id;
    END IF;

    -- Remove verification for the user.
    DELETE FROM verification WHERE verification.user_id = soft_delete_user.user_id;

    -- Remove the authentication for the user.
    DELETE FROM authentication WHERE authentication.user_id = soft_delete_user.user_id;

    -- Remove the user's cart.
    DELETE FROM cart WHERE cart.user_id = soft_delete_user.user_id;

    -- Set all products that the user was selling as unavailable.
    UPDATE products SET number_of_items = 0 WHERE products.seller_id = soft_delete_user.user_id;

    -- Anonymize user data and mark the account as deleted.
    UPDATE users SET
        first_name = 'User',
        last_name = 'Deleted',
        email = CONCAT(soft_delete_user.user_id, '@deleted.com'),
        password = 'None',
        balance = 0,
        profile_picture_url = NULL,
        is_deleted = TRUE
    WHERE
        users.user_id = soft_delete_user.user_id;
END;
$$;


-- A trigger that validates user credentials before insert or update.
CREATE TRIGGER validate_user_credentials_before_insert
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION check_correct_user_credentials();


-- A trigger that makes sure that each user has a verification record.
CREATE TRIGGER create_verification_on_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_verification_record();

