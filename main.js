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

const introductionMessage = (channel) => {
  channel.send(`Olá, sou uma inteligencia artificial 😃 e fui criado pra entender linguagem natural (essa que vocês seres humanos utilizam para se comunicar), mas pra mim é muito dificil entender o que vocês falam 😭 então quero pelo menos entender o sentimento por trás do que vocês estão falando, e pra isso vocês podem reagir às suas próprias mensagens e às de outras pessoas com emojis que melhor representam elas, eu vou estar olhando e tomando nota pra poder ficar mais esperto, só isso ja me deixa muito feliz 😆\n
se quiser ver o resultado dos meus estudos, você pode me chamar me mencionando e colocando a frase que você quer que eu interprete que eu vou te responder, tipo assim ó:\n
<@742812623686336583> bom dia!
dai eu respondo com um emoji desse jeito -> ${trainedClassifier.classify('bom dia!')}\n
e se você achar que eu me equivoquei e quer ajudar a me corrigir, você pode reagir a mensagem que você me chamou que eu vou tentar aprender o certo`);
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
  if (message.content.startsWith(`se apresenta <@!${process.env.CLIENT_ID}>`) || message.content.startsWith(`se apresenta <@${process.env.CLIENT_ID}>`)) {
    introductionMessage(message.channel);
  }
});

client.on('guildCreate', (server) => {
  if (server.systemChannel) introductionMessage(server.systemChannel);
});
