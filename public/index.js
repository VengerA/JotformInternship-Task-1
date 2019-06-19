var tasks = [];
var i = 0;

takeText = function(){
            
    var text = document.getElementById("task").value;
    if (text == ""){
        return false
    }
    else {
        return text;
    }
}

function takeData(){
    var ref = firebase.database().ref('tasks');

    var data = {
        id : null,
        task: "",
        done: false
    }

    ref.once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            data.id = childSnapshot.key;
            data.task = childSnapshot.val().task;
            data.done = childSnapshot.val().done;
            addToList(data.task, data.done, data.id);
        })
    });
}

window.onload = function () {
    takeData();
}

function addToList(dataTask, dataDone, dataId){
    var section = document.getElementById("tasks");

    var div = document.createElement("div");
    div.id = dataId;
    div.className = "task";
    div.style.width = "400px";

    var button = document.createElement("input");
    button.className = "taskList";
    button.id = dataId + "1";
    button.type = "checkbox";
    button.className = "taskList";
    button.style.cssFloat = "left";
    button.style.width = "20px";
    button.checked = dataDone;
    div.appendChild(button);
    button.onclick = function(){markAsDone(dataId, !dataDone);};

    var p = document.createElement("p");
    p.className = "text";
    p.id = dataId + "2";
    p.innerText = dataTask;
    p.className = "text;"
    p.style.width = "200px";
    div.appendChild(p);
    p.onclick = function(){clickToEdit(dataId);};

    var input = document.createElement("input");
    input.className = "taskList";
    input.id = dataId + "3"
    input.type = "text";
    button.style.cssFloat = "left";
    input.style.width = "100px";
    input.style.display = "none";
    div.appendChild(input);
    input.value = dataTask;

    var button2 = document.createElement("button");
    button2.className = "taskList";
    button2.id = dataId + "4";
    button2.className = "taskList";
    button2.style.width = "70px";
    button2.style.display = "none";
    button2.innerText = "Save";
    div.appendChild(button2);
    button2.onclick = function() {saveEdit(dataId);};

    var delete1 = document.createElement("button");
    delete1.className = "taskList";
    delete1.id = dataId + "4";
    delete1.className = "taskList";
    delete1.style.width = "70px";
    delete1.innerText = "Delete";
    div.appendChild(delete1);
    delete1.onclick = function() {deleteSelected(dataId);};

    section.appendChild(div);

    var data = {};
    data.id = dataId;
    data.task = dataTask;
    data.done = dataDone;

    tasks.push(data);
    button.id = dataId;
    console.log(tasks);

}


putTask = function(){
    myContent = takeText();

    var ref = firebase.database().ref('tasks')
    var fireBaseRef = firebase.database().ref();

    if (myContent == ""){
        alert("Please fullfill the box");
    }
    else {
        var data2 = {
            task : myContent,
            done : false
        }

        var id = ref.push(data2).key;
        data2.id = id;
        
        addToList(data2.task, data2.done, data2.id);
    }
}

clickToEdit = function(id){
    var tag2 = document.getElementById(id + "2");
    var tag3 = document.getElementById(id + "3");
    var tag4 = document.getElementById(id + "4");

    tag2.style.display = "none";
    tag3.style.display = "inline";
    tag4.style.display = "inline";
}

saveEdit = function(id){
    var tag2 = document.getElementById(id + "2");
    var tag3 = document.getElementById(id + "3");
    var tag4 = document.getElementById(id + "4");

    text = tag3.value;
    tag2.innerText = text;

    tag2.style.display = "inline";
    tag3.style.display = "none";
    tag4.style.display = "none";

    firebase.database().ref('tasks/' + id).update({task: text});

    var x = tasks.find(x => x.id === id);
    x.task = text;

}

markAsDone = function(id, done){
    firebase.database().ref('tasks/' + id).update({done: done});
    var x = tasks.find(x => x.id === id);
    x.done = done;
}

deleteSelected = function(id){
    firebase.database().ref('tasks/' + id).remove();
    
    var a = document.getElementById(id);
    a.remove();
}

