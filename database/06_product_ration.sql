CREATE TABLE product_ratings (
    product_id INT NOT NULL,
    buyer_id INT NOT NULL,
    rating INT NOT NULL,
    
    PRIMARY KEY (product_id, buyer_id),
    CONSTRAINT rating_range CHECK (rating BETWEEN 1 AND 5)
);