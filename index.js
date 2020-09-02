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
      name: "email",
      message: "Enter your email address"
    }
  ]);
}

function generateHTML(answers) {
  return `
  # ${answers.title}

## Description 

${answers.description}


## Table of Contents

If your README is very long, add a table of contents to make it easy for users to find what they need.

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## Installation

${answers.installation}

## Usage 

${answers.useage} 


## Contributing

${answers.contributing}


## License

  For more information on the license used, please click on the link below:

- [License] (https://opensource.org/licenses/${answers.license})


## Questions

  For questions concerning my apps, click on the link below for my github:

  [Github Link] (https://github.com/${answers.github})

  Or click the link below for my email:

  [Email] (${answers.email})
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