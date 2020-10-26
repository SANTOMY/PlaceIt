create table spots.spots
(
  spot_id serial primary key,
  spot_name varchar(50) unique not null,
  geom GEOMETRY(),
  spot_type varchar(50) unique not null,
  this.user_id bigint;
);
create table spots.review
(
  review_id serial primary key,
  spot_id bigint,
  comment varchar(255) unique not null,
  score bigint,
  user_id bigint
);