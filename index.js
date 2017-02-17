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
        refreshSources();
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

  var citation = document.getElementById("citation");
  var reference = document.getElementById("reference");
  var addSource = document.getElementById("addsource");
  function newSource(lis,cite,ref) {
    let source = document.createElement("li");
    lis.appendChild(source);
    source.innerHTML = cite;
    if(ref != "") {
      let link = document.createElement("a");
      link.href = ref;
      link.innerHTML = "Go"
      link.className = "button";
      source.appendChild(link);
    }
  }

  addsource.onclick = () => {
    if(reference.value != "" || citation.value != "") {
      newSource(document.getElementById("sourcelist"),citation.value,reference.value);
      project.sources[randomId()] = {"citation": citation.value, "reference": reference.value}
      reference.value = "";
      citation.value = "";
    }
  }

  function refreshSources() {
    var sourceList = document.getElementById("sourcelist");
    while(sourceList.hasChildNodes()) {
      sourceList.removeChild(sourceList.lastChild);
    }
    var source;
    for(source in project.sources) {
      newSource(sourceList, project.sources[source]["citation"], project.sources[source]["reference"]);
    }
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
