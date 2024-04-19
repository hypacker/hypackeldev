let fileHandle;
let SciptFinderTAB = [];
var ScriptFinderTabCOUNT = 1;

function CreateProject(){
    var projectNameInput = document.getElementById("projectNameCreation");
    var projectDirectory = document.getElementById("ProjectDirectory")

    var newProjectButton = document.createElement("button");
    newProjectButton.textContent = projectNameInput.value;
    projectDirectory.appendChild(newProjectButton)

    var zip = new JSZip();
    zip.file("index.html", "type your html here");
    zip.file("index.css", "type your css here\n");
    zip.file("main.js", "type your js here\n");
    zip.generateAsync({type:"blob"}).then(function(content) {
    saveAs(content, newProjectButton.value);
  });
}

async function OpenFile() {
    [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile();
    SciptFinderTAB[ScriptFinderTabCOUNT] = await fileData.text();
    textarea.innerText = SciptFinderTAB[ScriptFinderTabCOUNT];

    var selectScript = document.createElement("button");
    selectScript.textContent = fileData.name;

    selectScript.setAttribute("data-index", ScriptFinderTabCOUNT);

    selectScript.onclick = scriptFinderOpen;
    ScriptFinder.appendChild(selectScript);

    ScriptFinderTabCOUNT += 1;
}


async function SaveFile(){
    let stream = await fileHandle.createWritable();
    await stream.write(textarea.innerText);
    await stream.close();
}


async function CreateNewFile(){
    fileHandle = await window.showSaveFilePicker();
    SaveFile();
}

function scriptFinderOpen(event) {
    const index = event.target.getAttribute("data-index");
    textarea.innerText = SciptFinderTAB[index];
    
}

var popit = true;
window.onbeforeunload = function() { 
     if(popit == true) {
          popit = false;
          return "Are you sure you want to leave?"; 
     }
}