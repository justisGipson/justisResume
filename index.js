#!/usr/bin/env node
"use strict";

let inquirer = require('inquirer');
let chalk = require('chalk');

let response = chalk.bold.green;

let resume = require('./resume/resume.json');

let resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: "What would you like to know about me?",
    choices: [...Object.keys(resume), "Exit"]
};

let main = () => {
    console.log('Hello, my name is Justis Gipson and welcome to my resume.');
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