import { Client, Events, GatewayIntentBits,  Collection } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
//import * as bot from './commands/rtt43bot.mjs';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
         GatewayIntentBits.GuildMessages,
         GatewayIntentBits.MessageContent
    ]
});


// Load commands
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.mjs'));

(async () => {
    for (const file of commandFiles) {
        const command = await import(`./commands/${file}`);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command ${file} is missing a required "data" or "execute" property.`);
        }
    }
})();



function readyDiscord() {
    console.log('Bot is ready: ' + client.user?.tag);
}

client.once(Events.ClientReady, readyDiscord);

// Handle interactions
// client.on(Events.InteractionCreate, async interaction => {
//     if (!interaction.isCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) {
//         await interaction.reply('Unknown command');
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(`Error executing ${interaction.commandName}:`, error);
//         await interaction.reply('There was an error while executing this command!');
//     }
// });

client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to login:', err);
});

// Move the message event handler to the top level
// client.on('messageCreate', msg => {
//     if (msg.content === 'ping') {
//         msg.reply('Pong!');
//     }
// });

// ...
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: 'Unknown command', ephemeral: true });
        }
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);

        // Ensure we only reply or follow up if possible
        if (interaction.isRepliable()) {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error executing this command.', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
            }
        }
    }
});