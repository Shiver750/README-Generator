// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const codeBlock = "```";
let licenseBadge = "";

const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Create an array of questions for user input
const prompts = [
    "Please enter your Github username",
    "Enter your preferred email address",
    "What is the title of your project?",
    "Provide a description for your project",
    "What command should be run to install dependencies?",
    "What does the user need to know about using the repo?",
    "What type of license will your project have?",
    "What should a user know about contributing to the repo?",
    "What command should be run to run tests?",
];

function userPrompts() {
    return inquirer.prompt([
        {
            type: "input",
            message: prompts[0],
            name: "username"
        },
        {
            type: "input",
            message: prompts[1],
            name: "email"
        },
        {
            type: "input",
            message: prompts[2],
            name: "title"
        },
        {
            type: "input",
            message: prompts[3],
            name: "description"
        },
        {
            type: "input",
            message: prompts[4],
            default: "npm i",
            name: "install"
        },
        {
            type: "input",
            message: prompts[5],
            name: "usage"
        },
        {
            type: "list",
            message: prompts[6],
            choices: ["MIT", "APACHE 2.0", "BSD 3", "None"],
            name: "license"
        },
        {
            type: "input",
            message: prompts[7],
            name: "contributor"
        },
        {
            type: "input",
            message: prompts[8],
            default: "npm test",
            name: "test"
        },
  ])
}

function generateReadMe(response) {
    return `
# ${response.title}
${licenseBadge}
## Description
${response.description}
## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
        
## Installation
To install necessary dependencies, run the following command:
${codeBlock}
${response.install}
${codeBlock}
## Usage
${response.usage}
## License 
This project is licensed under the ${response.license} license.
## Contributing
${response.contributor}
## Tests
To run tests, run the following command:
${codeBlock}
${response.test}
${codeBlock}
## Questions
If you have any questions about this repository, open an issue or contact me directly at ${response.email}. You can find more of my work at [${response.username}](https://github.com/${response.username}).`;
}

// function to initialize program
async function init() {
    try {
        const response = await userPrompts();
        const readme = generateReadMe(response);
        await writeFileAsync("output/README.md", readme);
        console.log("README.md file Created!");
    } catch(err) {
        console.log(err);
    }
}
  
// function call to initialize program
init();