//functions creates text from user input
function generateMarkdown(data) {
  console.log(data)
  return `
 
  # ${data.title}
  \n${data.badge}
  \n${data.description}
# Table of Contents
* [Installation](##installation)
* [Instructions](##instructions)
* [License](##license)
* [Contributors](##contributors)
* [Tests](##tests)
* [Author](##author)


# Installation
> ${data.installation}
# Instructions
> ${data.instructions}
# License
${data.licensePrint}  
# Contributors
${data.contributorsString}
# Tests
${data.tests}
# Author
\n![ProfileImage](${data.avatar_url})
\n${data.userName}
\nEmail: ${data.email}
\nLocation: ${data.location}
\nGithub: ${data.html_url}
`;
} 
//Exports generateMarkdown funtion to index.js
module.exports = generateMarkdown;

