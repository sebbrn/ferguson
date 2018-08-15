<h1 align="center">Ferguson</h1>

<p align="center">
  <img width="250" src="low_poly_cat.jpg"><br>
  :point_up_2: This is Ferguson
</p>

## Description
Ferguson is a lovely countdown bot for Slack.\
You can tell him your upcoming events.\
He'll remind you when it's time to get nervous.

### Add to your workspace
Click the following button or visit *[Fergusons home](https://ferguson-bot.herokuapp.com)* 
to invite him to your workspace.

<a href="https://ferguson-bot.herokuapp.com/login">
  <img alt="Add to Slack" 
       height="40" width="139" 
       src="https://platform.slack-edge.com/img/add_to_slack.png"
       srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x">
</a>

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
Don't forget to make a copy of the `.env.example` file, rename it to `.env` and ask the contributors with which values the variables have to be filled.