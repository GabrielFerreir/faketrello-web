create function changeuser(pass character varying, usern character varying)
returns boolean
LANGUAGE plpgsql
AS $$
begin
	update tblogin set password = $1 where username = $2;
    return true;
end
$$;
