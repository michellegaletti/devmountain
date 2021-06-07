DELETE FROM entries
WHERE entry_id = $1;

SELECT * FROM entries
JOIN genre ON entries.genre_id = genre.genre_id
WHERE entries.user_id = $2
ORDER BY entries.entry_date;