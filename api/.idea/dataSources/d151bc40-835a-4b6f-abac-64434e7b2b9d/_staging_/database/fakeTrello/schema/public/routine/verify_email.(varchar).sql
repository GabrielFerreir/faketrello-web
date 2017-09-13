create or replace function verify_email(usern character varying) returns TABLE(statusemail boolean)
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS(SELECT "authEmail"
            FROM tb_login l
            WHERE l.username ILIKE $1 OR l.email ILIKE $1)
  THEN
    RETURN QUERY
    SELECT "authEmail"
    FROM tb_login l
    WHERE l.username ILIKE $1;
  END IF;
END
$$;
