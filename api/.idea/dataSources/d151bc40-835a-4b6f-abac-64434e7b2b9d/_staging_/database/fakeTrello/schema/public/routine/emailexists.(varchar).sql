CREATE FUNCTION emailexists(emailuser CHARACTER VARYING)
  RETURNS TABLE(usern CHARACTER VARYING, emailu CHARACTER VARYING)
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS(SELECT l.email
            FROM tb_login l
            WHERE l.email ILIKE $1)
  THEN
    RETURN QUERY
    SELECT
      l.username,
      l.email
    FROM tb_login l
    WHERE l.email ILIKE $1;
  END IF;
END;
$$;
