INSERT INTO events (friendId, name, date) 
  VALUES ($1, $2, $3)
  RETURNING *;