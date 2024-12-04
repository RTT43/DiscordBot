import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('expresssetup')
    .setDescription('Gives commands to setup express server');

export async function execute(interaction) {
    try {
        const commands = [
            'Express Setup Commands:',
            '1. npm init -y',
            '2. npm install express dotenv cors mongodb mongoose',
            '3. npm install nodemon',
            '4. Create a file named server.mjs',
            '5. Add the following:',
            'import express from "express";',
            'import dotenv from "dotenv";',
            'app.get(\'/\', (req, res) => {',
            '  res.send(\'Hello World!\');',
            '});',
            'app.listen(3000, () => {',
            '  console.log(\'Server is running on port 3000\');',
            '});',
            '6. Run the server using npm start or nodemon server.mjs'
        ];
        await interaction.reply(commands.join('\n'));
    } catch (error) {
        console.error('Error in expressSetup command:', error);
        throw error;
    }
}