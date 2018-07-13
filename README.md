<h1 align="center">Ferguson</h1>

<p align="center">
  <img width="250" src="low_poly_cat.jpg"><br>
  :point_up_2: This is Ferguson
</p>

## Description
Ferguson is a lovely countdown bot for Slack.\
You can tell him your upcoming events.\
He'll remind you when it's time to get nervous.

## Deployment
```
npm install
npm start
```

## Heroku
Develop branch currently deployed on [Heroku](https://ferguson-bot.herokuapp.com/hello)

## Local development infos

### Open a HTTP tunnel
```
npm install -g localtunnel
lt --port 3000 --subdomain ferguson-bot
```
Once ferguson is running on your machine and the tunnel is open 
he is available at <https://ferguson-bot.localtunnel.me/>

### Environment variables
Don't forget to make a copy of the `.env.example` file and ask the contributors with which values the variables have 
to be filled.