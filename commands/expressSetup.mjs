import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('expresssetup')
    .setDescription('Gives commands to setup express server');

export async function execute(interaction) {
    try {
        await interaction.reply(
            ' Express Setup Commands: \n 1. npm init -y \n 2. npm install express dotenv cors mongodb mongoose \n 3. npm install nodemon \n 4. Create a file named server.mjs \n 5. Add the following \n import express from "express" \n' +
'import dotenv from "dotenv";\n app.get(\'/\', (req, res) => { \n res.send(\'Hello World!\'); \n }); \n app.listen(3000, () => { \n console.log(\'Server is running on port 3000\'); \n }); \n 6. Run the server using npm start for nodemon server.mjs'
        );
    } catch (error) {
        console.error('Error in expressSetup command:', error);
        throw error; // Rethrow the error to be caught in the event handler
    }
}

