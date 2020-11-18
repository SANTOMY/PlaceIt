create table spots.spots
(
  spot_id text primary key not null,
  spot_name text not null,
  x double precision not null,
  y double precision not null,
  geom GEOMETRY not null,
  spot_type text not null,
  picture text not null,
  user_id text not null
);
create table spots.review
(
  review_id text primary key not null,
  spot_id text not null,
  comment text not null,
  score bigint not null,
  user_id text not null
);