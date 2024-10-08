CREATE TABLE cart(
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    number_of_items INT NOT NULL,
    
    PRIMARY KEY (user_id, product_id)
);