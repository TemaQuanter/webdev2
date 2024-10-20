CREATE TABLE categories(
    category_id SERIAL PRIMARY KEY,
    category_uuid UUID DEFAULT uuid_generate_v4() NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category_motto TEXT NOT NULL,
    banner_url TEXT NOT NULL
);


-- Insert some default categories that will be supported by the app instantly.
INSERT INTO categories (name, category_motto, banner_url)
VALUES
    ('Hoodies', 'Stay cozy, stay cool.', '/images/banners/hoodies.png'),
    ('Laptops', 'Power up your productivity.', '/images/banners/laptops.png'),
    ('Smartphones', 'Stay connected, stay ahead.', '/images/banners/smartphones.png'),
    ('Shoes', 'Step up your style.', '/images/banners/shoes.png'),
    ('Accessories', 'The finishing touch to every look.', '/images/banners/accessories.png'),
    ('Gaming Consoles', 'Level up your gaming experience.', '/images/banners/gaming-consoles.png'),
    ('Headphones', 'Immerse yourself in sound.', '/images/banners/headphones.png'),
    ('Cameras', 'Capture moments, create memories.', '/images/banners/cameras.png'),
    ('Fitness Gear', 'Gear up for greatness.', '/images/banners/fitness-gear.png'),
    ('Home Appliances', 'Modern solutions for modern living.', '/images/banners/home-appliances.png'),
    ('Books', 'Open a book, open your mind.', '/images/banners/books.png'),
    ('Furniture', 'Design your space, define your comfort.', '/images/banners/furniture.png');
