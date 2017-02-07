const {dialog} = require("electron").remote;
var fs = require("fs");

window.onload = function() {
  var files = [];
  project = {"name":"Untitled", "sources":{}, "notecards":{}};
  projectLocation = "";

  var openProject = document.getElementById("openproject");

  openProject.onclick = () => {
    var files = (dialog.showOpenDialog({properties:["openFile"], filters:[
      {name:"JSON Project", extensions:["json"]}
    ]}));
    if(files != undefined) {
      projectLocation = files[0];
      fs.readFile(files[0], (err, data) => {
        if(err) {
          return console.error(err);
        }
        project = JSON.parse(data);
        document.getElementById("currentproject").innerHTML = project.name;
      });
    }
  }
}

function randomId() {
  var str = "";
  for(var i = 0; i < 3; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
