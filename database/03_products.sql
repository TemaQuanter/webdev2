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