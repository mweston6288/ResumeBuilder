const fs = require ("fs");
const axios = require("axios").default;
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML.js");

// Check this
const pdf = require("html-pdf");



function createPDF(head, body){
  const options = {"format":"Letter"};
  pdf.create(head+body, options).toFile("resume.pdf", function(err, res){
    if (err) return console.log(err)
    console.log(res);
  })
}

function init(){
    inquirer.prompt([
        {
          type: "input",
          message: "What is your user name?",
          name: "username"
        },
        {
          type: "list",
          message: "What is your favorite color?",
          name: "color",
          choices:["blue", "pink", "green", "red"]
        }
      ]).then(async function(response){
        const head = generateHTML.generateHTML(response);
        
        const {data} = await axios.get("https://api.github.com/users/"+response.username)
        console.log(data)
        const body = await generateHTML.generateBody(data);
        createPDF(head, body);
        })
        .catch(function(err){
          console.log(err);
          console.log("Username not found")
      })

}

init();