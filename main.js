import { config } from 'dotenv-flow';
import Discord from 'discord.js';
import natural from 'natural';
import cron from 'node-cron';
import doSetup from './src/setup';

const client = new Discord.Client();
let trainedClassifier;
let classifier;
classifier = natural.BayesClassifier.load('classifier.json', natural.PorterStemmerPt, (err, loadedClassifier) => {
  if (err) {
    classifier = new natural.BayesClassifier();
    return;
  }

  classifier = loadedClassifier;
  trainedClassifier = loadedClassifier;
  trainedClassifier.train();
  console.log('Successfully loaded!');
});

config();
doSetup(client);

const saveAndTrain = () => {
  classifier.save('classifier.json', (err, savedClassifier) => {
    savedClassifier.train();
    trainedClassifier = savedClassifier;
  });
};

cron.schedule('0 0 * * * *', () => {
  console.log('Trained!');
  saveAndTrain();
});

client.on('messageReactionAdd', (messageReaction) => {
  const message = messageReaction.message.content;
  // const reactors = messageReaction.users.cache;
  // const lastReactor = Array.from(reactors)[reactors.size - 1][1];
  // eslint-disable-next-line no-underscore-dangle
  const reaction = messageReaction._emoji.name;
  const tokenizedMessage = natural.PorterStemmerPt.tokenizeAndStem(message);
  console.log(tokenizedMessage);
  classifier.addDocument(tokenizedMessage, reaction);
});

client.on('message', (message) => {
  if (message.content === 'train' && message.author.id === '206124480928415744') {
    saveAndTrain();
  }
  if (message.content.startsWith(`<@!${process.env.CLIENT_ID}>`) || message.content.startsWith(`<@${process.env.CLIENT_ID}>`)) {
    const text = message.content.slice(message.content.indexOf(' '));
    const classification = trainedClassifier.getClassifications(text);
    const cassificationSumary = classification.sort((a, b) => {
      if (a.value > b.value) return -1;
      if (a.value < b.value) return 1;
      return 0;
    });
    console.log(cassificationSumary.slice(0, 5));
    message.channel.send(trainedClassifier.classify(text));
  }
});
