UPDATE entries 
SET (entry_meal, entry_alcohol, bathroom_experience, customer_experience, other) = ($1, $2, $3, $4, $5) 
WHERE entry_id = $6; 

SELECT * FROM entries
JOIN genre ON entries.genre_id = genre.genre_id
WHERE entries.user_id = $7
ORDER BY entries.entry_date;