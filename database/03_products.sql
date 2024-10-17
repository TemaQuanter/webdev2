CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
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
CREATE OR REPLACE FUNCTION search_products(search_text TEXT)
RETURNS SETOF products
LANGUAGE plpgsql
AS $$
DECLARE
    search_request TEXT;
BEGIN
    search_request := CONCAT('%', search_products.search_text, '%');

    RETURN QUERY
    SELECT * FROM products WHERE products.title ILIKE search_request
    OR description ILIKE search_request LIMIT 5;
END;
$$;