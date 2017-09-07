create function newuser(usern character varying, passw character varying, img CHARACTER VARYING) returns boolean
LANGUAGE plpgsql
AS $$
begin
    if not exists (select * from tblogin WHERE usern = tblogin.username) then
    	insert into tblogin(username,password) values($1,$2);
    	return true;
    else 
    	return false;
    end if;
end
$$;
