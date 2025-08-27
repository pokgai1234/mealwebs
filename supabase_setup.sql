-- Create the 'meals' table
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    image_hint TEXT,
    video_url TEXT,
    calories INT,
    protein INT,
    estimated_time TEXT,
    estimated_price REAL
);

-- Create the 'ingredients' table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    meal_id INT REFERENCES meals(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    quantity TEXT,
    category TEXT CHECK (category IN ('main', 'seasoning')),
    shopping_link TEXT
);

-- Insert data into the 'meals' table
INSERT INTO meals (name, description, image_url, image_hint, video_url, calories, protein, estimated_time, estimated_price) VALUES
('Korean Fried Rice', 'This quick Korean fried rice features savory ground beef, fluffy rice, and a medley of colorful vegetables, all tossed in a fiery gochujang sauce. Topped with fresh scallions and a perfectly fried egg, this protein-rich dish is ready in just 20 minutes.', 'https://i.ytimg.com/vi/6PeNgiOIADY/maxresdefault.jpg', 'korean fried rice beef egg', 'https://www.youtube.com/embed/6PeNgiOIADY', 774, 53, '20 mins', 7.00),
('Gordon Ramsay Baked Salmon', 'This simple yet elegant baked salmon recipe, inspired by Gordon Ramsay, is ideal for fitness lovers and food enthusiasts alike. It’s packed with lean protein, omega-3 fatty acids, and nutrient-rich vegetables — making it a perfect post-gym meal that doesn’t sacrifice flavor.', 'https://www.mashed.com/img/gallery/gordon-ramsays-salmon-recipe-with-a-twist/intro-1621521944.jpg', 'baked salmon vegetables', 'https://www.youtube.com/embed/WkrMRk2qdqo', 475, 48, '30-35 mins', 9.00),
('Lemon Chicken with broccoli', 'This lemon chicken meal prep features zesty, herb-marinated chicken with roasted vegetables and quinoa, creating five balanced, flavorful meals in just 35 minutes—perfect for healthy, efficient weekly planning. Easy to make, high protein.', 'https://i0.wp.com/farmlifediy.com/wp-content/uploads/2023/06/Lemon-Chicken-and-Broccoli-10.jpg?resize=1200%2C1680&ssl=1', 'lemon chicken broccoli quinoa', 'https://www.youtube.com/embed/4ZdaEdo73cs', 870, 42, '35 mins', 9.00),
('Honey Garlic Salmon', 'This honey garlic salmon is really easy to make and creates an amazing tasting meal that can be enjoyed throughout the week or frozen for a later date.', 'https://chefjackovens.com/wp-content/uploads/2022/09/My-project-1-2.jpg', 'honey garlic salmon rice broccoli', 'https://www.youtube.com/embed/-3h4O4on_-4', 650, 45, '30 mins', 11.00),
('Garlic Butter Steak Bites', 'Juicy garlic butter steak bites seared to perfection in a hot skillet. Quick, flavorful, and tender, this mouthwatering recipe is perfect for easy dinners, meal prep, or savory appetizers.', 'https://kelvinskitchen.com/wp-content/uploads/2023/10/Garlic-Butter-Steak-Bites-Recipe.jpg', 'steak bites garlic butter skillet', 'https://www.youtube.com/embed/KhycLcdemls', 725, 47.5, '15 mins', 7.50),
('Cheesesteak Burrito', 'Ideal for busy lifestyles, they’re easy to make, freezer-friendly, and designed to keep you full and energized throughout the day. Whether you’re meal prepping for work or looking for a family-friendly dinner option, these Cheesesteak Burritos are a delicious and budget-friendly choice.', 'https://chefjackovens.com/wp-content/uploads/2024/12/Cheesesteak-Burrito-Meal-Prep.png', 'cheesesteak burrito meal prep', 'https://www.youtube.com/embed/g11sYOk2Ku8', 780, 55, '35 mins', 4.50),
('Honey Sriracha Chicken', 'A flavorful and spicy-sweet chicken dish, perfect with rice and sautéed broccolini for a complete meal. Great for those who enjoy bold flavors and a good protein kick.', 'https://i.ytimg.com/vi/YXGphEd1yaY/maxresdefault.jpg', 'honey sriracha chicken rice broccolini', 'https://www.youtube.com/embed/YXGphEd1yaY', 800, 65, '40 mins', 10.50),
('Korean Pork Ribs', 'How to make the most tender, luxurious & melt in your mouth Korean pork ribs using a few simple everyday ingredients. These pork ribs are slow-baked in the oven & produce juicy, tender meat every time without failure.', 'https://chefjackovens.com/wp-content/uploads/2021/11/My-Post-41-1024x536.jpg', 'korean pork ribs oven', 'https://www.youtube.com/embed/xmbRnzDvrY8', 1100, 65, '2-3 hours', 8.75),
('Coconut Lime Chicken', 'This flavorful dish combines juicy tomatoes, creamy coconut milk, garlic, ginger, and optional chili for a rich, aromatic sauce. Finished with fresh coriander and lime, it’s a comforting meal full of warmth, depth, and vibrant color.', 'https://i.ytimg.com/vi/ncY0DMnb_Zw/maxresdefault.jpg', 'coconut lime chicken pan', 'https://www.youtube.com/embed/ncY0DMnb_Zw', 750, 50, '30-35 mins', 8.00),
('Chicken Snack Wraps', 'Savor these high-protein crumbed chicken snack wraps—featuring crispy, golden chicken, smooth and creamy mayonnaise, all wrapped in a soft, warm tortilla. Quick, satisfying, and packed with flavor, they''re the perfect anytime snack.', 'https://chefjackovens.com/wp-content/uploads/2024/03/Chicken-Snack-Wraps.png', 'chicken snack wraps tortilla', 'https://www.youtube.com/embed/lmcNC32cO90', 393, 33, '25-30 mins', 6.50),
('High Protein Marry Me Chicken', 'Make your week easier—and tastier—with this creamy, high-protein Marry Me Chicken meal prep recipe. Packed with bold flavor and balanced nutrition, it’s perfect for healthy eating, muscle gain, or weight loss goals. Ready in under 30 minutes.', 'https://chefjackovens.com/wp-content/uploads/2025/04/Marry-Me-Chicken-1.png', 'marry me chicken pasta', 'https://www.youtube.com/embed/sOR9Mwja_Ws', 650, 64, '30 mins', 12.00),
('Sweet and Sour Chicken', 'Plan your meals for the week ahead with this simple and budget-friendly sweet and sour chicken recipe. It’s easy to make, packed with flavor, and includes full nutritional and macro breakdowns—so you always know exactly what you''re eating. For extra tips and details, check out the video below.', 'https://chefjackovens.com/wp-content/uploads/2023/07/My-project-1-82.jpg', 'sweet sour chicken peppers onion', 'https://www.youtube.com/embed/1N6hbRbyAeQ', 719, 67, '35 mins', 11.50),
('Chicken Caesar Wraps', 'Classic Chicken Caesar salad flavors transformed into a convenient and satisfying wrap. Features tender chicken, crisp romaine lettuce, Parmesan cheese, and a creamy Caesar-style dressing, all bundled in a soft tortilla. A high-protein meal perfect for lunch or a quick dinner.', 'https://i.ytimg.com/vi/gmFAyi4yCJs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAu8Ns5pgxfDQ8eSNzUYZ3Sqb6b5w', 'chicken caesar wrap tortilla', 'https://www.youtube.com/embed/gmFAyi4yCJs', 530, 53, '20-25 mins', 9.00),
('High Protein Beef patty melt', 'A patty melt is a grilled sandwich featuring a seasoned ground beef patty, melted cheese (often Swiss), and caramelized onions, all pressed between two slices of griddled bread, typically rye. It''s a savory and comforting diner classic.', 'https://i.ytimg.com/vi/qwu_e_vkasQ/maxresdefault.jpg', 'beef patty melt sandwich', 'https://www.youtube.com/embed/qwu_e_vkasQ', 418, 34, '20-25 mins', 2.50),
('Hot Honey Beef Bowl', 'This dish offers a flavorful mix of seasoned ground beef and tender sweet potato, elevated by a rich gochujang and soy sauce blend. Toppings of creamy avocado and cottage cheese are brightened by a drizzle of hot honey.', 'https://i.ytimg.com/vi/TC03ZukbX3g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBdr1maztSYm0b6UTREpTlJYghUuA', 'beef bowl sweet potato avocado', 'https://www.youtube.com/embed/TC03ZukbX3g', 775, 57, '25 mins', 6.50),
('Honey Peanut Butter Noodles', 'This vibrant bowl offers a delightful combination of chewy udon noodles, succulent chicken, and colorful vegetables, all coated in a rich and flavorful honey peanut butter sauce. It''s a speedy and satisfying high-protein option.', 'https://i.ytimg.com/vi/RiJdwnXJQa8/maxresdefault.jpg', 'peanut butter noodles chicken vegetables', 'https://www.youtube.com/embed/RiJdwnXJQa8', 760, 52, '20-25 mins', 7.00),
('High Protein Egg Fried Rice', 'This high-protein fried rice recipe transforms leftover rice into a satisfying meal. It''s packed with protein from eggs and your choice of meat or tofu, mixed with colorful vegetables like carrots, peas, and corn, all brought together with savory soy sauce and seasonings for a quick and flavorful dish.', 'https://i.ytimg.com/vi/7vD0C4oR7RI/maxresdefault.jpg', 'egg fried rice chicken vegetables', 'https://www.youtube.com/embed/7vD0C4oR7RI', 627, 57, '20-25 mins', 6.00);

-- Insert ingredients for each meal
-- Note: The meal_id corresponds to the order of insertion above (1 for Korean Fried Rice, 2 for Salmon, etc.)
-- Korean Fried Rice (meal_id: 1)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(1, 'Ground Beef (95/5 lean)', '180g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ground%20beef'),
(1, 'Rice', '60g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=rice'),
(1, 'Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion'),
(1, 'Red Bell Pepper', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=red%20bell%20pepper'),
(1, 'Scallions', '2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=scallions'),
(1, 'Egg (Optional)', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=egg'),
(1, 'Garlic', '2 cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(1, 'Ginger', '1 piece', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ginger'),
(1, 'Oil', '6g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=oil'),
(1, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(1, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(1, 'Soy Sauce', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(1, 'Gochujang', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=gochujang'),
(1, 'Light Mayonnaise', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=light%20mayonnaise'),
(1, 'Rice Vinegar', '10g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=rice%20vinegar');

-- Gordon Ramsay Baked Salmon (meal_id: 2)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(2, 'Salmon Fillets', '2 (about 6 oz each)', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salmon%20fillets'),
(2, 'Olive Oil', '2 tablespoons', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(2, 'Unsalted Butter', '2 tablespoons', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=unsalted%20butter'),
(2, 'Garlic', '2 cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(2, 'Dijon Mustard', '1 teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=dijon%20mustard'),
(2, 'Honey', '1 teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(2, 'Fresh Lemon Juice', '1 tablespoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon'),
(2, 'Lemon Zest', '1 teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon'),
(2, 'Salt', '½ teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(2, 'Black Pepper', '¼ teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(2, 'Smoked Paprika', '½ teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=smoked%20paprika'),
(2, 'Fresh Parsley', '1 teaspoon', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=parsley'),
(2, 'Lemon Slices', 'for serving', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon');

-- Lemon Chicken with broccoli (meal_id: 3)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(3, 'Chicken Thigh, Boneless & Skinless', '1kg', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20thigh'),
(3, 'Broccoli, Large Heads', '2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=broccoli'),
(3, 'Green Beans', '250g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=green%20beans'),
(3, 'Basmati Rice', '350g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=basmati%20rice'),
(3, 'Lemons', '2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon'),
(3, 'Olive Oil', '2 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(3, 'Chicken Stock', '1/2 Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20stock'),
(3, 'Garlic', '3 Cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(3, 'Honey', '1/3 Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(3, 'Onion Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(3, 'Soy Sauce', '1 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(3, 'Sesame Oil', '2 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sesame%20oil'),
(3, 'Corn Flour', '1 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=corn%20flour'),
(3, 'Seasoning', 'To Taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=seasoning'),
(3, 'Cold Water', '700ml', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=water'),
(3, 'Salt', 'To Taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt');

-- Honey Garlic Salmon (meal_id: 4)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(4, 'Salmon Fillets', '700g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salmon%20fillets'),
(4, 'Rice', '175g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=rice'),
(4, 'Broccoli Head', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=broccoli'),
(4, 'Lemon', '1/4', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon'),
(4, 'Olive Oil', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(4, 'Garlic Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(4, 'Paprika', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=paprika'),
(4, 'Butter or Olive Oil', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=butter'),
(4, 'Garlic', '3 cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(4, 'Chicken Stock', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20stock'),
(4, 'Soy Sauce', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(4, 'Honey', '2.5 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(4, 'Peanut Oil', '1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=peanut%20oil');

-- Garlic Butter Steak Bites (meal_id: 5)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(5, 'Ribeye Steak', '2 lbs', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ribeye%20steak'),
(5, 'Garlic Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(5, 'Dried Thyme', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=dried%20thyme'),
(5, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(5, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(5, 'Olive Oil or Avocado Oil', '2 tbsps', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(5, 'Butter', '4 tbsps', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=butter'),
(5, 'Garlic', '6 cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(5, 'Fresh Parsley', '1 tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=parsley');

-- Cheesesteak Burrito (meal_id: 6)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(6, 'Steak', '800g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=steak'),
(6, 'Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion'),
(6, 'Bell Peppers', '2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=bell%20pepper'),
(6, 'Mozzarella Cheese', '200g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=mozzarella%20cheese'),
(6, 'Tortillas', '5', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=tortillas'),
(6, 'Onion Powder', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(6, 'Garlic Powder', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(6, 'Paprika', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=paprika'),
(6, 'Chilli Powder', '¼ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chilli%20powder'),
(6, 'Worcestershire Sauce', '1 ½ Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=worcestershire%20sauce');

-- Honey Sriracha Chicken (meal_id: 7)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(7, 'Chicken Thigh', '1.2kg', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20thigh'),
(7, 'Jasmine Rice', '300g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=jasmine%20rice'),
(7, 'Broccolini', '300g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=broccolini'),
(7, 'Sriracha Sauce', '1/2 Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sriracha'),
(7, 'Soy Sauce', '3 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(7, 'Apple Cider Vinegar', '1 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=apple%20cider%20vinegar'),
(7, 'Honey', '2 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(7, 'Fresh Ginger', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ginger'),
(7, 'Garlic', '4 Cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(7, 'Corn Flour', '2 1/2 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=corn%20flour'),
(7, 'Peanut Oil', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=peanut%20oil'),
(7, 'Peanut Oil', '3 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=peanut%20oil'),
(7, 'Sesame Oil', '2 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sesame%20oil');

-- Korean Pork Ribs (meal_id: 8)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(8, 'Pork Ribs', '1.2kg', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=pork%20ribs'),
(8, 'Gochujang (Korean Spice Paste)', '150g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=gochujang'),
(8, 'Ketchup', '150g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ketchup'),
(8, 'Sriracha Sauce', '50g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sriracha'),
(8, 'Chinese 5 Spice Powder', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chinese%205%20spice'),
(8, 'Onion Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(8, 'Garlic Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(8, 'Salt', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt');

-- Coconut Lime Chicken (meal_id: 9)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(9, 'Chicken Breast', '3', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20breast'),
(9, 'Brown Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=brown%20onion'),
(9, 'Gourmet or Truss Tomatoes', '4', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=tomatoes'),
(9, 'Long Red Chilli (Optional)', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=red%20chilli'),
(9, 'Olive Oil or Rice Bran Oil', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(9, 'Onion Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(9, 'Garlic Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(9, 'Sweet Paprika', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sweet%20paprika'),
(9, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(9, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(9, 'Garlic', '6 Cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(9, 'Ginger', '5g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ginger'),
(9, 'Concentrated Tomato Paste', '1 1/2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=tomato%20paste'),
(9, 'Coconut Milk', '1 Can', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=coconut%20milk'),
(9, 'Fresh Coriander (Cilantro)', 'to serve', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=coriander'),
(9, 'Lime Wedge', 'to serve', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lime');

-- Chicken Snack Wraps (meal_id: 10)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(10, 'Chicken Tenderloins', '600g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20tenderloins'),
(10, 'Eggs', '2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=eggs'),
(10, 'Panko Breadcrumbs', '100g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=panko%20breadcrumbs'),
(10, 'Mayonnaise or Greek Yogurt', '100g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=mayonnaise'),
(10, 'Small Taco Wraps', '5-6', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=taco%20wraps'),
(10, 'Baby Cos Lettuce', '1 head', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=cos%20lettuce'),
(10, 'Cheddar Cheese', '100g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=cheddar%20cheese'),
(10, 'Onion Powder', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(10, 'Garlic Powder', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(10, 'Smoked Paprika', '1 ½ tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=smoked%20paprika'),
(10, 'Chilli Flakes (Optional)', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chilli%20flakes'),
(10, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(10, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(10, 'Dijon Mustard', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=dijon%20mustard'),
(10, 'Dried or Fresh Dill', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=dill');

-- High Protein Marry Me Chicken (meal_id: 11)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(11, 'Shell Pasta', '500g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=shell%20pasta'),
(11, 'Chicken Breast', '800g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20breast'),
(11, 'High Protein Cottage Cheese', '2 Cups', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=cottage%20cheese'),
(11, 'Parmigiano Reggiano', '½ Cup', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=parmesan'),
(11, 'Sun-Dried Tomatoes', '½ Cup', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sun-dried%20tomatoes'),
(11, 'Baby Spinach', '200g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=baby%20spinach'),
(11, 'Sun Dried Tomato Oil', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sun-dried%20tomato%20oil'),
(11, 'Dried Italian Herbs', '1 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=italian%20herbs'),
(11, 'Chicken Stock', '⅔ Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20stock'),
(11, 'Onion Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion%20powder'),
(11, 'Garlic Powder', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(11, 'Smoked Paprika', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=smoked%20paprika'),
(11, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(11, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper');

-- Sweet and Sour Chicken (meal_id: 12)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(12, 'Chicken Breast or Thigh', '1.4kg', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken'),
(12, 'Bell Peppers', '3', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=bell%20pepper'),
(12, 'Brown Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=brown%20onion'),
(12, 'Grapeseed Oil', '2 ½ Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=grapeseed%20oil'),
(12, 'Light Soy Sauce', '½ Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=light%20soy%20sauce'),
(12, 'Pineapple Juice', '⅓ Cup', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=pineapple%20juice'),
(12, 'Honey', '4 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(12, 'Worcestershire Sauce', '2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=worcestershire%20sauce'),
(12, 'Apple Cider Vinegar', '2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=apple%20cider%20vinegar'),
(12, 'Ketchup', '2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ketchup'),
(12, 'Corn Flour or Corn Starch', '2 Tbsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=corn%20flour'),
(12, 'Garlic', '4 Cloves', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(12, 'Ginger', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ginger'),
(12, 'Seasoning', 'To Taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=seasoning');

-- Chicken Caesar Wraps (meal_id: 13)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(13, 'Chicken Breast', '600g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20breast'),
(13, 'Large Tortillas', '4', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=tortillas'),
(13, 'Deli Turkey Breast', '200g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=turkey%20breast'),
(13, 'Parmesan Cheese', '40g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=parmesan'),
(13, 'Romaine Lettuce', '2 heads', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=romaine%20lettuce'),
(13, 'Olive Oil', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(13, 'Garlic Powder', '1tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(13, 'Cayenne Pepper', '1tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=cayenne%20pepper'),
(13, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(13, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(13, 'Light Mayonnaise', '40g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=light%20mayonnaise'),
(13, 'Mustard', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=mustard'),
(13, 'Lemon', '1/2', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lemon'),
(13, 'Garlic', '1 clove', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic'),
(13, 'Greek Yogurt', '100g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=greek%20yogurt');

-- High Protein Beef patty melt (meal_id: 14)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(14, 'Sandwich Bread', '8 slices', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sandwich%20bread'),
(14, 'Ground Beef (95/5 lean)', '400g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ground%20beef'),
(14, 'Yellow Onions', '4 small', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=yellow%20onion'),
(14, 'American Cheese Slices', '8', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=american%20cheese'),
(14, 'Olive Oil', '16g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(14, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(14, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper');

-- Hot Honey Beef Bowl (meal_id: 15)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(15, 'Ground Beef (95/5 lean)', '180g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ground%20beef'),
(15, 'Sweet Potatoes', '250g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sweet%20potato'),
(15, 'Avocado', '1/2', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=avocado'),
(15, 'Cottage Cheese', '100g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=cottage%20cheese'),
(15, 'Gochujang', '10g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=gochujang'),
(15, 'Soy Sauce', '25g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(15, 'Olive Oil', '7g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=olive%20oil'),
(15, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(15, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(15, 'Paprika', '1/2 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=paprika'),
(15, 'Honey', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey'),
(15, 'Sriracha', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=sriracha');

-- Honey Peanut Butter Noodles (meal_id: 16)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(16, 'Chicken Breast', '160g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20breast'),
(16, 'Udon Noodles', '200g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=udon%20noodles'),
(16, 'Red Bell Pepper', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=red%20bell%20pepper'),
(16, 'Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion'),
(16, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt'),
(16, 'Black Pepper', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=black%20pepper'),
(16, 'Garlic Powder', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20powder'),
(16, 'Oil', '6g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=oil'),
(16, 'Peanut Butter', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=peanut%20butter'),
(16, 'Soy Sauce', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(16, 'Lime', '1/2', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=lime'),
(16, 'Honey', '15g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=honey');

-- High Protein Egg Fried Rice (meal_id: 17)
INSERT INTO ingredients (meal_id, name, quantity, category, shopping_link) VALUES
(17, 'Jasmine Rice', '50g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=jasmine%20rice'),
(17, 'Chicken Breast', '180g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=chicken%20breast'),
(17, 'Onion', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=onion'),
(17, 'Red Bell Pepper', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=red%20bell%20pepper'),
(17, 'Carrot', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=carrot'),
(17, 'Frozen Peas', '50g', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=frozen%20peas'),
(17, 'Egg', '1', 'main', 'https://www.woolworths.com.au/shop/search/products?searchTerm=egg'),
(17, 'Soy Sauce', '20g', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=soy%20sauce'),
(17, 'Garlic Paste', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=garlic%20paste'),
(17, 'Ginger Paste', '1 tsp', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=ginger%20paste'),
(17, 'MSG', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=msg'),
(17, 'Salt', 'to taste', 'seasoning', 'https://www.woolworths.com.au/shop/search/products?searchTerm=salt');
