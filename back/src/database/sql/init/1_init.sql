create table users.users
(
  email text primary key,
  id text not null,
  username text not null, 
  password text not null,
  is_active boolean not null
);