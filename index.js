//LINES 2-5 ARE IMPORTING THE MODULES WE NEED.
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const generateMarkdown = require("./utils/generateMarkdown.js");
//PLACING PROMPT QUESTIONS INSIDE OF 'QUESTIONS'VARIABLE (LINE-7)
const questions = [
    {
        type: "input",
        message: "Enter Github username",
        name: "userName"
    },
    {
        type: "input",
        message: "What is the application title?",
        name: "title"
    },
    {
        type: "input",
        message: "Describe your applications functionality:",
        name: "description"
    },
    {
        type: "input",
        message: "Steps to install your application:",
        name: "installation"
    },
    {
        type: "input",
        message: "Instructions for application usage:",
        name: "instructions"
    },
    {
        type: "input",
        message: "Enter license name, IF NONE, ENTER 'N/A'. ",
        name: "license"
    },
    {
        type: "input",
        message: "Enter license URL. IF NONE ENTER, 'N/A'",
        name: "licenseURL"
    },
    {
        type: "input",
        message: "Enter Github usernames of contributors, followed by a comma. no spaces: IF NONE ENTER 'N/A'. ",
        name: "contributors"
    },
    {
        type: "input",
        message: "test completed:",
        name: "tests"
    },
];
 //WRITETOFILE SAVES DATA INTO FILENAME.
function writeToFile(fileName, data) {
 //WRITEFILE APPENDS THE RESPONSES INTO FILENAME. CHECKING FOR ERRORS WITH CONDITIONAL STATEMENT.
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("SUCCESS");
        }
    });
}
 //FUNCTION INIT PROMPTS QUESTIONS IN THE TERMINAL.
async function init() {
    console.log("Create A README file");
 //USERRESPONSE HOLDS OUR PROMPT QUESTIONS THAT RECEIVE USERINPUT
    const userResponse = await inquirer.prompt(questions);
    console.log(userResponse);
    const { userName, title, description, installation, instructions, license, licenseURL, contributors, tests, acknowledgments} = userResponse;
 //CONDITIONAL STATEMENT CHECKING IF NO NAME WAS ENTERED.   
    if (userName === ""){
        return init(); 
    }
 //VARIABLE THAT GENERATES A BADGE FOR README.
    const badge = `https://img.shields.io/badge/${userName}`;
    const licensePrint = `\n[${license}](${licenseURL})\n`;
 //AXIOS CALL TO RETRIEVE GITHUB USER INFO
    const gitInfo = await axios.get(`https://api.github.com/users/${userName}`);
 //ASSIGNING ONLY THE INFO NEEDED AND SETTING IT TO GITINFO
    const { data: { avatar_url, html_url, location, email } } = gitInfo
 //VARIABLE THAT WILL HOLD CONTRIBUTORS ARRAY (IF ANY)
    const contributorArray = contributors.split(","); 
    let contributorsString = ``;
 //LOOPING THRU CONTRIBUTORS WITH FOREACH
    contributorArray.forEach(element => { 
        let url = `http://github.com/${element}`;
 //VARIABLE CREATING LIST IN MARKDOWN FILE (READMD)
        const mdString = `\n[${element}](${url})\n`;
 //APPENDING TO GLOBAL VARIABLE
        contributorsString += mdString;
    });
 //VARIABLE CALLING FUNCTION WITH ARGUMENTS
    const markdown = generateMarkdown({ userName, title, description, installation, instructions, licensePrint, contributorsString, tests, avatar_url, html_url, location, email, badge,});
 //WRITETOFILE FUNCTION TAKING IN CREATED NAME OF FILE, ALONG WITH USER SUBMISSIONS AND INFO FROM AXIOS CALL
    writeToFile("README.md", markdown);
};
// PROMPTING QUESTIONS
init();