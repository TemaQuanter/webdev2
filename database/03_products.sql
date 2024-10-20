CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_uuid UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    seller_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    image_url TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    number_of_items INT NOT NULL,
    
    FOREIGN KEY (seller_id) REFERENCES users(user_id),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


-- This is a simple search engine for products.
CREATE OR REPLACE FUNCTION search_products(search_text TEXT, result_limit INT, page_number INT)
RETURNS TABLE (
    product_uuid UUID,
    seller_uuid UUID,
    title VARCHAR(100),
    description TEXT,
    category_uuid UUID,
    image_url TEXT,
    price NUMERIC(10, 2),
    number_of_items INT
) 
LANGUAGE plpgsql
AS $$
DECLARE
    search_request TEXT;
    offset_value INT;
BEGIN
    -- Check that the result limit is not greater than 100 to prevent
    -- bottlenecks.
    IF (result_limit > 100) THEN
        RAISE EXCEPTION 'result_limit cannot be greater than 100';
    END IF;

    -- Check that the page number is a valid number.
    IF (page_number < 1) THEN
        RAISE EXCEPTION 'page_number must be a positive number';
    END IF;

    -- Search pattern.
    search_request := CONCAT('%', search_text, '%');

    -- Offset value to implement chunks in which the data will be extracted.
    offset_value := (page_number - 1) * result_limit;

    RETURN QUERY
    SELECT 
        p.product_uuid,
        u.user_uuid AS "seller_uuid",
        p.title,
        p.description,
        c.category_uuid AS "category_uuid",
        p.image_url,
        p.price,
        p.number_of_items 
    FROM products p
    JOIN users u ON u.user_id = p.seller_id
    JOIN categories c ON c.category_id = p.category_id
    WHERE p.title ILIKE search_request
    OR p.description ILIKE search_request
    OFFSET offset_value
    LIMIT result_limit;
END;
$$;


-- This is a category products extractor.
CREATE OR REPLACE FUNCTION search_category_products(input_category_uuid UUID, result_limit INT, page_number INT)
RETURNS TABLE (
    product_uuid UUID,
    seller_uuid UUID,
    seller_first_name VARCHAR(50),
    seller_last_name VARCHAR(50), 
    title VARCHAR(100),
    description TEXT,
    image_url TEXT,
    price NUMERIC(10, 2),
    number_of_items INT
) 
LANGUAGE plpgsql
AS $$
DECLARE
    offset_value INT;
BEGIN
    -- Log the values
    RAISE NOTICE 'input_category_uuid: %, result_limit: %, page_number: %', input_category_uuid, result_limit, page_number;

    -- Check that the result limit is not greater than 100 to prevent
    -- bottlenecks.
    IF (result_limit > 100) THEN
        RAISE EXCEPTION 'result_limit cannot be greater than 100';
    END IF;

    -- Check that the page number is a valid number.
    IF (page_number < 1) THEN
        RAISE EXCEPTION 'page_number must be a positive number';
    END IF;

    -- Offset value to implement chunks in which the data will be extracted.
    offset_value := (page_number - 1) * result_limit;

    RETURN QUERY
    SELECT 
        p.product_uuid,
        u.user_uuid AS "seller_uuid",
        u.first_name AS "seller_first_name",
        u.last_name AS "seller_last_name",
        p.title,
        p.description,
        p.image_url,
        p.price,
        p.number_of_items 
    FROM products p
    JOIN users u ON u.user_id = p.seller_id
    JOIN categories c ON c.category_id = p.category_id
    WHERE c.category_uuid = input_category_uuid
    OFFSET offset_value
    LIMIT result_limit;
END;
$$;