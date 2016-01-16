-- $1 event id
DELETE FROM events
  WHERE id = $1;