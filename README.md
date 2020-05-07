# Node.js Happy Wheels API Wrapper

### Installation
```
npm i happy-wheels
```

### Searching levels
```js
const HappyWheels = require('happy-wheels');

HappyWheels.searchLevels('rope swing', 'rating').then(([ level ]) => {
    console.log(level);
});

/*
Level {
    name: 'ROPE SWING',
    description: 'Hello everyone! =)\nThis is my first Rope Swing\n\nI Hope You Like It!\nHave A Nice Day!',
    id: '10037145',
    createdAt: 2018-09-01T00:00:00.000Z,
    author: User {
        name: 'Guy Incognito',
        id: '9716036'
    },
    character: 'Segway Guy',
    playCount: '1421695',
    votes: '6321',
    weightedRating: '4.6916',
    averageRating: 5
}
*/

//OBS: the second parameter can also be an object with:

{
    searchBy: 'name', // (name|user)
    sortBy: 'newest', // (newest|oldest|plays|rating)
    uploaded: 'week', // (today|week|month|anytime)
    page: 1 // int
}
```

### Getting levels by ID
```js
const HappyWheels = require('happy-wheels');

HappyWheels.getLevel('10037145').then((level) => {    
    console.log(level.author);

    level.author.fetchProfile().then(console.log);
});

/*
first log:

User {
    name: 'Guy Incognito',
    id: '9716036'
}

second log:

User {
    name: 'Guy Incognito',
    id: '9716036',
    createdAt: 2018-07-19T00:00:00.000Z,
    website: 'https://www.youtube.com/channel/UCjbZibo8nc6reBHCyJeYHxA',
    location: 'ec1f8d',
    gender: 'Male'
}
*/
```

### Getting users by ID
```js
const HappyWheels = require('happy-wheels');

HappyWheels.getUser('9716036').then((user) => {
    console.log(user.name);

    user.getLevels().then(console.log);
});
```

### Getting replays by ID
```js
const HappyWheels = require('happy-wheels');

HappyWheels.getReplay('62083428').then((replay) => {
    console.log(replay);
});

/*
Replay {
    level: Level {
        name: 'ROPE SWING',
        description: 'Hello everyone! =)\nThis is my first Rope Swing\n\nI Hope You Like It!\nHave A Nice Day!',
        id: '10037145',
        createdAt: 2018-09-01T00:00:00.000Z,
        author: User {
            name: 'Guy Incognito',
            id: '9716036'
        },
        character: 'Segway Guy',
        playCount: '1421695',
        votes: '6321',
        weightedRating: '4.6916',
        averageRating: 5
    }
    description: 'New Record!! =)',
    id: '62083428',
    createdAt: 2019-06-18T00:00:00.000Z,
    author: User { name: 'Guy Incognito', id: '9716036' },
    character: 'Segway Guy',
    votes: '10',
    weightedRating: '3.31',
    averageRating: 5
}
*/
```