// commands/ping.mjs

import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!');

export async function execute(interaction) {
    try {
        await interaction.reply('Pong!');
    } catch (error) {
        console.error('Error in ping command:', error);
        throw error; // Rethrow the error to be caught in the event handler
    }
}