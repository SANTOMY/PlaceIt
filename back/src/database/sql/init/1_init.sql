create table users.users
(
  id text primary key,
  username text not null, 
  email text not null,
  password text not null
);