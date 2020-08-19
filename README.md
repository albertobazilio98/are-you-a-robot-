# Are You a Robot?

Are you a robot? is a chatbot with the purpose of studying artificial intelligences that are capable of interpreting natural language and carrying out sentiment analysis.

The bot learns through baysean networks and porter stemming to associate text with sentiments through reactions with discord emojis.

You can join [the official server by clicking here](https://discord.gg/PvNF3WR) to check the bot features

The bot currently works primarily with Brazilian Portuguese, it also works with other languages, but the results may not be as expected

## Dependencies

  - Node 12.16.1
    - In case you didn't have node installed, is recommended the use of NVM. [full guide here](https://github.com/creationix/nvm)
  - npm 6.13.4
  - Git

## Setup

#### Download

TO download repository, open up terminal in desired folder and run
```bash
$ git clone https://github.com/albertobazilio98/are-you-a-robot-.git
$ cd are-you-a-robot-
```

#### Environment

You'll need to register a new bot on discord website. You can find a simple tutorial of how to do this on the [dsicord.js guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot).

After that get your bot secret token and client id in hands and paste them in the file `.env.exeample` as indicated

```bash
$ cp .env.example .env
```

#### Node Dependencies

If you're using NVM, you can type in terminal

```bash
$ nvm install
```

otherwise you'll need to mannualy download and install the indicated version above

Install the project dependencies

```bash
$ npm install
```

## Run

Just type

```bash
$ node .
```

## Usage

After setting up everything, you'll need to invite your bot to a discord server, you may use this invite link:

- https://discord.com/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID_HERE&scope=bot

Placing your bot client id as designated

Select the desired server and the bot will greet himself after joining

![greet](https://i.imgur.com/a1ZVRU8.png)

#### Classifying

The bot will collect and store the text of all reacted messages

![reaction](https://i.imgur.com/08FoQE3.png)

this reaction will output in your console running the collected data like this:

```js
[ 'olá', 'bom', 'conhec' ] 😄
[ 'olá', 'bom', 'conhec' ] happy
```

#### Training

The bot will automatically train and backup the gattered data every hour, but you can mannually train by typping "train" in a discord channel where the bot is in.

- note: to do this you will need to set your user_id in .env file

#### Getting results

After trained you can see the results by send a message that starts with a mention of the bot followed by the text you want to test like this:

![response](https://i.imgur.com/DjtaViJ.png)

This will output in your console something like this:

```js
[
  { label: '🤖', value: 0.0011347517730496456 },
  { label: '🧀', value: 0.0007092198581560284 },
  { label: '🛑', value: 0.0007092198581560284 },
  { label: '🤔', value: 0.0007092198581560284 },
  { label: '😆', value: 0.0007092198581560284 }
]
[
  { label: 'happy', value: 0.008097165991902834 },
  { label: 'laughing', value: 0.004048582995951418 },
  { label: 'thinking', value: 0.004048582995951417 }
]
```

## License

MIT License

Copyright (c) 2020 albertobazilio98

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.