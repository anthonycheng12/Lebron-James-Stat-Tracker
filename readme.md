# LeBron James Tracker

## Overview

For the average NBA fan it is hard to remember what LeBron is up too.

LeBron James Tracker is a web app that will allow users to keep track of LeBron. Users can select the year and view LeBron's stats. User's can also see photos and videos of LeBron. Users should be able to login and register.


## Data Model

The application will store Users, Photos and Videos

* Stats are supplied (via NBA API)
* Each Photo and video has description links to allow more information (by embedding)


An Example User:

```javascript
{
username: "anthonycheng",
hash: // a password hash,
}
```

An Example List with Embedded Items:

```javascript
{
user: // a reference to a User object
name: "LeBron James",
ppg: 28,
reb: 8,
ast: 7
}
```


## [Link to Commented First Draft Schema](db.js) 


## Wireframes

/players/create - homepage

![list create](documentation/1homepage.png)

/players - page for showing all players

![list](documentation/2allPlayers.png)

/players/lebron - page for showing specific stats on your selected player

![list](documentation/3specificPlayer.png)

## Site map

![list](documentation/sitemap.jpg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a player list
4. as a user, I can view my player list
5. as a user, I can add players to my player list
6. as a user, I can delete players of my list

## Research Topics

* (5 points) Integrate user authentication
* I will use LoopBack via CLI to create an authentication
* LoopBack is a highly extensible open source Node.js framework
* (3 points) Use the NBA JavaScript API to gather statistics
* see <code>https://github.com/bttmly/nba</code>


8 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [LoopBack](https://medium.freecodecamp.org/build-restful-api-with-authentication-under-5-minutes-using-loopback-by-expressjs-no-programming-31231b8472ca)
2. [NBA API](https://github.com/bttmly/nba) 

