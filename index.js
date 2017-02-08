const {dialog} = require("electron").remote;
var fs = require("fs");

window.onload = function() {
  var files = [];
  project = {"name":"Untitled", "sources":{}, "notecards":{}};
  projectLocation = "";

  var openProject = document.getElementById("openproject");

  openProject.onclick = () => {
    var files = dialog.showOpenDialog({properties:["openFile"], filters:[
      {name:"JSON Project", extensions:["json"]}
    ]});
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

	var saveProject = document.getElementById("saveproject");

	saveProject.onclick = () => {
		if(projectLocation == "") {
			saveAs();
		} else {
			fs.writeFile(projectLocation, JSON.stringify(project));
		}
	}

	var saveProjectAs = document.getElementById("saveprojectas");

	saveProjectAs.onclick = saveAs;

  var newProject = document.getElementById("newproject");

  newProject.onclick = () => {
    project = {"name":"Untitled", "sources":{}, "notecards":{}};
    document.getElementById("currentproject").innerHTML = project.name;
  }

  var editName = document.getElementById("editname");

  editName.onclick = () => {
    project.name = document.getElementById("newname").value;
    document.getElementById("currentproject").innerHTML = project.name;
  }
}

function randomId() {
  var str = "";
	do {
		for(var i = 0; i < 3; i++) {
			str += Math.floor(Math.random() * 10);
		}
	}
	while((str in project.sources) || (str in project.notecards))
  return str;
}

function saveAs() {
	var filePath = dialog.showSaveDialog({filters:[
		{name:"JSON Project", extensions:["json"]}
	]});
	if(filePath != undefined) {
		fs.writeFile(filePath, JSON.stringify(project));
		projectLocation = filePath;
	}
}
