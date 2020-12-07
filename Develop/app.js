const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your managers name?',
           name: 'managerName'
        },
        {
            type: 'input',
            message: 'What is your managers id',
            name: 'managerID'
        },
        {
            type: 'input',
            message: 'What is your managers email?',
            name: 'managerEmail'
        },
        {
            type: 'input',
            message: 'What is your managers office number?',
            name: 'managerOfficeNum'
        }
    ])
    .then((answers) => {
        const manager = new Manager(
            answers.managerName,
            answers.managerID,
            answers.manaerEmail,
            answers.managerOfficeNum
        );
        employees.push(manager);
        createTeam();
    })

function createTeam() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What team member would you like to add?",
                name: "newEmployee",
                choices: ["Engineer", "Intern", "Done"],
        }
        ])
        .then((answers) => {
            switch (answers.newEmployee) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                case "Done":
                    renderTeam();
                    break;
                    deafult:
                    renderTeam();
            }
    })
}
    
function createEngineer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Engineer's name?",
                name: "engineerName",
            },
            {
                type: "input",
                message: "What is the Engineer's ID?",
                name: "engineerID",
            },
            {
                type: "input",
                message: "What is your Engineer's email?",
                name: "engineerEmail",
            },
            {
                type: "input",
                message: "What is your Engineer's GitHub?",
                name: "engineerGithub"
            }
        ])
        .then((answers) => {
            const engineer = new Engineer(
                answers.engineerName,
                answers.engineerID,
                answers.engineerEmail,
                answers.engineerGithub
            );
            employees.push(engineer);
            createTeam();
    })
}

function createIntern() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the Intern's name?",
                name: "internName",
            },
            {
                type: "input",
                message: "What is the Intern's ID?",
                name: "internID",
            },
            {
                type: "input",
                message: "What is your Intern's email?",
                name: "internEmail",
            },
            {
                type: "input",
                message: "What school does the Intern attend?",
                name: "internSchool"
            }
        ])
        .then((answers) => {
            const intern = new Intern(
                answers.internName,
                answers.internId,
                answers.internEmail,
                answers.internSchool
            )
            employees.push(intern)
    createTeam();
        })
    
}

function renderTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    return fs.writeFileSync(outputPath, render(employees));
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
