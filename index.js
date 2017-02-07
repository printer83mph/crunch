const {dialog} = require("electron").remote;
var fs = require("fs");

window.onload = function() {
  var files = [];
  var project = {"name":"Untitled", "sources":{}, "notecards":{}};

  var openProject = document.getElementById("openproject");

  openProject.onclick = () => {
    files = (dialog.showOpenDialog({properties:["openFile"], filters:[
      {name:"JSON Project", extensions:["json"]}
    ]}));
    fs.readFile(files[0], (err, data) => {
      if(err) {
        return console.error(err);
      }
      project = JSON.parse(data);
    });
  }
}
