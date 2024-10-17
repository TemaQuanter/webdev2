CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    buyer_id INT NOT NULL,
    seller_id INT NOT NULL,
    product_id INT NOT NULL,
    number_of_items INT NOT NULL,
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,

    FOREIGN KEY (buyer_id) REFERENCES users(user_id),
    FOREIGN KEY (seller_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);