create table spots.spots
(
  spot_id bigint primary key,
  spot_name text,
  geom GEOMETRY,
  spot_type text,
  picture text
  user_id text
);
create table spots.review
(
  review_id bigint primary key,
  spot_id bigint,
  comment text,
  score bigint,
  user_id text
);