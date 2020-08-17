import { config } from 'dotenv-flow';
import Discord from 'discord.js';
import cron from 'node-cron';
import doSetup from './src/setup';
import BayesNetwork from './src/bayesNetwork';
import { emojis, translations } from './emojis.json';

const client = new Discord.Client();

const mainNetwork = new BayesNetwork('classifier.json');
const sentimentNetwork = new BayesNetwork('sentimentClassifier.json');

config();
doSetup(client);

const classifiedMessage = (message) => `${mainNetwork.classify(message)} - ${translations[sentimentNetwork.classify(message)]}`;

const introductionMessage = (channel) => {
  channel.send(`Olá, sou uma inteligencia artificial 😃 e fui criado pra entender linguagem natural (essa que vocês seres humanos utilizam para se comunicar), mas pra mim é muito dificil entender o que vocês falam 😭 então quero pelo menos entender o sentimento por trás do que vocês estão falando, e pra isso vocês podem reagir às suas próprias mensagens e às de outras pessoas com emojis que melhor representam elas, eu vou estar olhando e tomando nota pra poder ficar mais esperto, só isso ja me deixa muito feliz 😆\n
se quiser ver o resultado dos meus estudos, você pode me chamar me mencionando e colocando a frase que você quer que eu interprete que eu vou te responder, tipo assim ó:\n
<@742812623686336583> bom dia!
dai eu respondo com um emoji desse jeito -> ${classifiedMessage('bom dia!')}\n
e se você achar que eu me equivoquei e quer ajudar a me corrigir, você pode reagir à mensagem que você me chamou que eu vou tentar aprender o certo`);
};

cron.schedule('0 0 * * * *', () => {
  mainNetwork.saveAndTrain();
  sentimentNetwork.saveAndTrain();
});

client.on('messageReactionAdd', (messageReaction) => {
  const message = messageReaction.message.content;
  const reactors = messageReaction.users.cache;
  const lastReactor = Array.from(reactors)[reactors.size - 1][1];
  if (lastReactor.bot) return;

  const reaction = messageReaction._emoji.name;
  mainNetwork.tokenizeAndLearn(message, reaction);
  if (emojis[reaction]) {
    sentimentNetwork.tokenizeAndLearn(message, emojis[reaction]);
  }
});

client.on('message', (message) => {
  if (message.content === 'train' && message.author.id === process.env.OWNER_ID) {
    mainNetwork.saveAndTrain();
    sentimentNetwork.saveAndTrain();
  }
  if (message.content.startsWith(`<@!${process.env.CLIENT_ID}>`) || message.content.startsWith(`<@${process.env.CLIENT_ID}>`)) {
    const text = message.content.slice(message.content.indexOf(' '));
    console.log(mainNetwork.classificationSumary(text), sentimentNetwork.classify(text));
    message.channel.send(classifiedMessage(text));
  }
  if (message.content.startsWith(`hey <@!${process.env.CLIENT_ID}>`) || message.content.startsWith(`hey <@${process.env.CLIENT_ID}>`)) {
    const text = message.content.slice(message.content.indexOf('>') + 2);
    if (text.startsWith('se apresenta')) {
      introductionMessage(message.channel);
    }
  }
});

client.on('guildCreate', (server) => {
  if (server.systemChannel) introductionMessage(server.systemChannel);
});
