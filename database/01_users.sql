CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    profile_picture BYTEA,
    balance NUMERIC(10, 2) NOT NULL
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

