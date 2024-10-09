CREATE TABLE cart(
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    number_of_items INT NOT NULL,
    
    PRIMARY KEY (user_id, product_id),

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);