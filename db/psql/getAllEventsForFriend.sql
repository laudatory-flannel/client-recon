-- $1 the friend id
SELECT * FROM events
  WHERE friendId = $1;