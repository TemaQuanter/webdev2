CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_uuid UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);


-- Insert some default categories that will be supported by the app instantly.
INSERT INTO categories (name)
VALUES
    ('Hoodies'),
    ('Laptops'),
    ('Smartphones'),
    ('Shoes'),
    ('Accessories'),
    ('Gaming Consoles'),
    ('Headphones'),
    ('Cameras'),
    ('Fitness Gear'),
    ('Home Appliances'),
    ('Books'),
    ('Furniture');