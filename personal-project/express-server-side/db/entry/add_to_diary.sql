INSERT INTO entries 
(restaurant_name, entry_date, entry_meal, entry_alcohol, bathroom_experience, customer_experience, other, genre_id, user_id)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);

SELECT * FROM entries
JOIN genre ON entries.genre_id = genre.genre_id
WHERE entries.user_id = $9
ORDER BY entries.entry_date;