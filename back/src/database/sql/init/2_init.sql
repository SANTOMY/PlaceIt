create table spots.spots
(
  spot_id bigint primary key,
  spot_name varchar(50),
  geom GEOMETRY,
  spot_type varchar(50),
  picture varchar(50)
  user_id bigint
);
create table spots.review
(
  review_id bigint primary key,
  spot_id bigint,
  comment varchar(255) not null,
  score bigint,
  user_id bigint
);