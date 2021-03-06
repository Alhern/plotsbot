const fs = require('fs');

const Behaviors = require('./behaviors');

const greetBehavior = require('./behaviors/greet');
const helpBehavior = require('./behaviors/help').helpBehavior;

// Read file synchronously because we'd need this object in later steps anyway.
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let client;

if (process.env.TEST) {
  const CliClient = require('./interfaces/cli');
  client = new CliClient(config.name);
  console.log('Bot is running in testing mode.');
  console.log(`[${process.env.USER} => ${config.name}]`);
} else {
  const IrcClient = require('./interfaces/irc');
  client = new IrcClient(config.server, config.name, config.channels);
}

const joinBehaviors = [
  greetBehavior
];

const messageBehaviors = [
  helpBehavior
];

const behaviors = new Behaviors(config.name, client, joinBehaviors, messageBehaviors);
behaviors.bootstrap();
