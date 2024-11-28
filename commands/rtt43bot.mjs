import { SlashCommandBuilder } from "discord.js";
import fs from 'fs';

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js') || file.endsWith('.mjs'));

export const data = new SlashCommandBuilder();

    data.setName('rtt43bot')
    data.setDescription('This is a test command for the bot')


export  async function execute(interaction) {
        await interaction.reply('This is a test command for the bot');

        
    }