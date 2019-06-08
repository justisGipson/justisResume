#!/usr/bin/env node
"use strict";

let inquirer = require('inquirer');
let chalk = require('chalk');
let figlet = require('figlet');
let clear = require('clear');


let response = chalk.bold.cyanBright;

let resume = require('./resume/resume.json');

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

let resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: chalk.bold.blueBright("Take some time to find out more about me."),
    choices: [...Object.keys(resume), "Exit"]
};

let main = () => {
    console.log(chalk.bold.green("Hello, I'm Justis and welcome."));
    resumeHandler();
}

let resumeHandler = () => {
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
        //console.log(resume[${option}]);
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
