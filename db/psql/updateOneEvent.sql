-- $1 event id
-- $2 columns that need to be updated, can be array or single value
-- $3 values corresponding the columns, must be same length as $2
UPDATE events
  SET ($2^) = ($3^)
  WHERE id = $1
  RETURNING *;