# Are You a Robot?

## Dependencies

  - Node 12.16.1
    - In case you didn't have node installed, is recommended the use of NVM. [full guide here](https://github.com/creationix/nvm)
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