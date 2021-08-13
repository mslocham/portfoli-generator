const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template.js')


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
        message: 'What is your name?'
      }
    ]);
  };
  
  promptUser().then(answers => console.log(answers));