create table spots
(
  id serial primary key,
  username varchar(50) unique not null,
  email varchar(255) unique not null
);