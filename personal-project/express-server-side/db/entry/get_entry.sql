SELECT * FROM entries e
JOIN genre g ON e.genre_id = g.genre_id
WHERE e.entry_id = $1
ORDER BY e.entry_date;