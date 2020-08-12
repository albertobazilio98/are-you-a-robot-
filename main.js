import { config } from 'dotenv-flow';
import Discord from 'discord.js';
import natural from 'natural';
import doSetup from './src/setup';

const client = new Discord.Client();
let trainedClassifier;
let classifier;
classifier = natural.BayesClassifier.load('classifier.json', natural.PorterStemmerPt, (err, loadedClassifier) => {
  if (err) return;
  console.log(loadedClassifier);

  classifier = loadedClassifier;
  trainedClassifier = loadedClassifier;
  trainedClassifier.train();
});

config();
doSetup(client);

client.on('messageReactionAdd', (messageReaction) => {
  const message = messageReaction.message.content;
  // eslint-disable-next-line no-underscore-dangle
  const reaction = messageReaction._emoji.name;
  const tokenizedMessage = natural.PorterStemmerPt.tokenizeAndStem(message);
  classifier.addDocument(tokenizedMessage, reaction);
});

client.on('message', (message) => {
  // message.react('🍆');
  if (message.content === 'train' && message.author.id === '206124480928415744') {
    classifier.save('classifier.json', (err, savedClassifier) => {
      savedClassifier.train();
      trainedClassifier = savedClassifier;
    });
  }
  if (message.content.startsWith('test')) {
    const text = message.content.slice(4);
    console.log(trainedClassifier.getClassifications(text));
    message.channel.send(trainedClassifier.classify(text));
  }
});
