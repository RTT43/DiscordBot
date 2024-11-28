import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as bot from './commands/rtt43bot.mjs';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent
    ]
});

function readyDiscord() {
    console.log('Bot is ready: ' + client.user.tag);
}

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to login:', err);
});

// Move the message event handler to the top level
client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'rtt43bot') {
        await bot.execute(interaction);
    } else {
        await interaction.reply('Unknown command');
    }
});






// Event listener for when a slash command is executed
client.on(Events.InteractionCreate, handleInteraction);

