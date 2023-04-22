let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let description = document.getElementById("textarea");
let errorMsg = document.getElementById("msg");
let add =document.getElementById("add");
let taskContainer = document.getElementById("task");

let tasks =[];

form.addEventListener("submit",(e) =>{
    e.preventDefault();
    formValidation();
})

let formValidation =() =>{
    console.log(textInput.value);
    if(textInput.value === ""){
            console.log("Failure");
            errorMsg.innerText ="Task cannot be blank";
    }else{
        console.log("success");
        errorMsg.innerText="";
        saveData(); 
        //save the data in local storage(our browser has small storage because we don't have backened);

        //close the modal
        add.setAttribute("data-bs-dismiss" ,"modal")
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss" ,"")
        })
    }
    
}

let saveData = () =>{
    tasks.push({
        title: textInput.value,
        date: dateInput.value,
        description: description.value
    });
   localStorage.setItem('tasks' ,JSON.stringify(tasks));
   showTasks();
  console.log(tasks);
}

let showTasks = () => {
    taskContainer.innerHTML = "";
    tasks.map((task, idx) => {
        console.log(task);
        return ( taskContainer.innerHTML += `  <div id=${idx}>
        <span class="fw-bold">${task.title}</span>
        <span class="small text-secondary">${task.date}</span>
        <p>${task.description}</p>
        <span class="options">
           
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="bi bi-pencil-square"></i>
            <i onclick="deleteTask(this)"    class="bi bi-trash"></i>
        </span>
    </div>`)
    })
    resetForm()
}

let resetForm= () => {
    textInput.value ="";
    dateInput.value="";
    description.value="";
}

let deleteTask =(e)  => {
    console.log(e.parentElement.parentElement);
    //this remove the element from the ui
    e.parentElement.parentElement.remove()
    //remove it from the task array
    tasks.splice(e.parentElement.e.parentElement.id,1)
    //update local storage
    localStorage.setItem("tasks" ,JSON.stringify(tasks));
    console.log(tasks);
}

let editTask =(e) =>{
    console.log(e.parentElement.parentElement);
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask.children);
    //setting the values
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value =selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
    
}
(() =>{
    //whenever page loads this function is called
    //fetching the data from localstorage
   console.log(JSON.parse(localStorage.getItem("tasks")) ||[]);
   console.log(tasks);
   //show the dask
   showTasks();
})()