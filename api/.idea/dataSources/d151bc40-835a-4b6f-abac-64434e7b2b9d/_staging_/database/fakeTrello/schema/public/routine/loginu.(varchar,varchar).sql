CREATE OR REPLACE FUNCTION loginu(emaild CHARACTER VARYING, passw CHARACTER VARYING)
  RETURNS TABLE(
    email        CHARACTER VARYING,
    password     CHARACTER VARYING,
    username     CHARACTER VARYING,
    statusEmail  BOOLEAN,
    senhacorreta BOOLEAN)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    tb_login.email,
    tb_login.username,
    tb_login.password,
    tb_login."authEmail"
    (tb_login.password = $2)
  FROM tb_login
  WHERE tb_login.email ILIKE $1 OR tb_login.username ILIKE $1;
END
$$;
