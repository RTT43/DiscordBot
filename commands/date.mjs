import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('date')
    .setDescription('returns the current date');

export async function execute(interaction) {
    try {
        await interaction.reply( new Date().toDateString());
    } catch (error) {
        console.error('Error in date command:', error);
        throw error; // Rethrow the error to be caught in the event handler
    }
}