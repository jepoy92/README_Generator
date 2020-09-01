const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What's your project name?'"
    },
    {
      type: "input",
      name: "description",
      message: "What's your project about?"
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install your application?"
    },
    {
      type: "input",
      name: "useage",
      message: "How will your project be used?"
    },
    
    {
      type:"checkbox",
      message: "Please select a license",
      choices: [
        "Apache",
        "MIT",
        "ISC",
        "GNU GPL v3",
      ],
      name:"license",
    },

    {
      type: "input",
      name:"contributors",
      message:"Who's contributed to this work?"
    }
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

* Table of Contents
* Tests
* Questions


function generateHTML(answers) {
  return `
  # ${answers.title}

## Description 

${answers.description}


## Table of Contents (Optional)

If your README is very long, add a table of contents to make it easy for users to find what they need.

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.


## Usage 

Provide instructions and examples for use. Include screenshots as needed. 


## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.



## License

The last section of a good README is a license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)


---

🏆 The sections listed above are the minimum for a good README, but your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/nielsenjared/badmath)

Badges aren't _necessary_, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.


## Contributing

If you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them.


---
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.

`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("README.md", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });