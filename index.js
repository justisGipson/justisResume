#!/usr/bin/env node
"use strict";

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

const response = chalk.bold.cyanBright;

const resume = require('./resume/resume.json');

clear();

console.log(
  chalk.bold.greenBright(
    figlet.textSync('Justis Gipson', 
        { 
            horizontalLayout: 'full',
            font: 'slant', 
        }
    )
  )
);

const resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: chalk.bold.blueBright("Take some time to find out more about me."),
    choices: [...Object.keys(resume), "Exit"]
};

const main = () => {
    console.log(chalk.bold.green("JavaScript Developer"));
    resumeHandler();
}

const resumeHandler = () => {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions == 'Exit') {
            return;
        }
        let option = answer.resumeOptions;
        console.log(response("---------------------------------------"));
        resume[`${option}`].forEach(info => {
            console.log(response('|   =>  ' + info));
        });
        console.log(response("---------------------------------------"));
        
        inquirer.prompt({
            type: 'list',
            name: 'exitBack',
            message: 'Go back or Exit?',
            choices: ['Back', 'Exit']
        })
        .then(choice => {
            if (choice.exitBack == 'Back') {
                resumeHandler();
            } else {
                return;
            }
        });
    });
}

main();
