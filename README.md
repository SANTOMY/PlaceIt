# pbl2_group2

# スプリント情報
- スプリント1
- スケジュール:10/19-10/27

# 議事録Format
- https://docs.google.com/document/d/148lP1wZMw-8HKG6Fl9SislHI9NlvjODZYrUFlQNJ9YQ/edit?usp=sharing


# How To Run
## For Docker
- 1.Copy docker-compose.yml (Check discord)
- 2.Make docker image
```
$ docker-compose build
```
- 3.Run container
```
$ docker run -it -p 3000:3000 pbl2-back
```
## Connect to DB from console
- 1.Connect
```
$ psql -hec2-3-218-112-22.compute-1.amazonaws.com -Ujbkfxlthkrasiq -dd63cdmlbgnj93n
```
- 2.Insert example data
```
d63cdmlbgnj93n=# INSERT INTO sample_point(name,geom)
d63cdmlbgnj93n-# VALUES ('point1',ST_GeomFromText('POINT(35.67 139.75)',4326));
```
## Enter front container
```
$ docker-compose exec front sh
```
## Run front application
- 1.Install Vue CLI
```
$ npm install -g @vue/cli-service
```
- 2.Create node_modules
```
$ cd front
$ npm install
```
- 3.Run application
```
$ npm run serve
```
