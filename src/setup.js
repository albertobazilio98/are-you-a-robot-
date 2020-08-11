let client = {};

const doLogin = () => {
  client.login(process.env.TOKEN)
    .catch((e) => console.log(e));
};

const setPresence = () => {
  client.user.setPresence({ activity: { name: `${process.env.PREFIX} help`, type: 0 } })
    .catch((e) => console.log(e));
  // 0 = Jogando
  // 1 = Transmitindo
  // 2 = Ouvindo
  // 3 = Assistindo
};

const doSetup = (discordClient) => {
  client = discordClient;
  doLogin();
  client.once('ready', () => setPresence());
};

export default doSetup;
