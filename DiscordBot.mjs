import express from 'express';
import { Client, Events, GatewayIntentBits,  Collection } from 'discord.js';
import { config } from 'dotenv';
import fs from 'fs';
import connectToDatabase from './config/db.mjs';

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



client.login(process.env.TOKEN).catch(err => {
    console.error('Failed to login:', err);
});


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




const app = express();


connectToDatabase();

const PORT = process.env.PORT || 3050;

app.get('/', (req, res) => {
  res.send('Discord bot is running!');
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});