const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js')


// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//       console.log(profileDataArr[i]);
//     }
  
//     console.log('================');
  
//     // // Is the same as this...
//     // profileDataArr.forEach((profileItem) => {
//     //   console.log(profileItem)
//     // }); 
//     // //  or

//     profileDataArr.forEach(profileItem => console.log(profileItem));
//   };
  
  // printProfileData(profileDataArgs);

  // const name = profileDataArgs[0];
  // const github = profileDataArgs[1];
  



  // const pageHTML = generatePage(name, github);
  
  // fs.writeFile('./index.html', generatePage(name, github), err => {
  //   if (err) throw new Error(err);
  
  //   console.log('Portfolio complete! Check out index.html to see the output!');
  // });

  const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your Github Username',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your Github username!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      // The inquirer method automatically passes an object containing the user's answers to the when function. 
      // This allows us to write conditional code based on the answers the user has supplied thus far.
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      }
    ]);
  };

  const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
      portfolioData.projects = [];
    }
    
    return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter the name of your project!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter a description of your project!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    })
  };

  promptUser()
    .then(promptProject)
    .then(portfolioData => {
      const pageHTML = generatePage(portfolioData);

    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);

    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });