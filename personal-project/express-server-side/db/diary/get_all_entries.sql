SELECT * FROM entries
JOIN genre ON entries.genre_id = genre.genre_id
WHERE entries.user_id = $1
ORDER BY entries.entry_date;