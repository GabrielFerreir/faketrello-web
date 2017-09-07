CREATE FUNCTION newuser(emaild CHARACTER VARYING, passw CHARACTER VARYING, img CHARACTER VARYING,
                        namep  CHARACTER VARYING, usern CHARACTER VARYING)
  RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT exists(SELECT *
                FROM tb_login
                WHERE emailD = tb_login.email OR usern = tb_login.username)
  THEN
    INSERT INTO tb_login (email, password, profile_img, name, username) VALUES ($1, $2, $3, $4, $5);
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END
$$;
