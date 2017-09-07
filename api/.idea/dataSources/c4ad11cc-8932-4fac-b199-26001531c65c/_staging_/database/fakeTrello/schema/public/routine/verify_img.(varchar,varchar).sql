CREATE FUNCTION verify_img(img CHARACTER VARYING, usern CHARACTER VARYING)
  RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  IF EXISTS(SELECT email
            FROM tb_login l
            WHERE l.email = usern OR l.username = usern)
  THEN
    UPDATE tb_login
    SET profile_img = $1;
    RETURN TRUE;
  END IF;
END;
$$;
