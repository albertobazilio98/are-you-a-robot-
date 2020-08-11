import { config } from 'dotenv-flow';
import Discord from 'discord.js';
import doSetup from './src/setup';

const client = new Discord.Client();

config();
doSetup(client);
