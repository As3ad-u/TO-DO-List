// setting up variables 
let input=document.querySelector('#add-task');
let AddButton=document.querySelector('.plus');
let tasksContainer=document.querySelector('.tasks-content');
let tasksCount=document.querySelector('.tasks-count span');
let tasksCompleted=document.querySelector('.tasks-completed span');
let deleteAllTasks=document.querySelector('.delete-all');
let finishedAllTasks=document.querySelector('.finished-all');
//focus on input 
function inputFocus(){
    input.focus();
}
window.onload=function(){
    inputFocus();
}

// add task

AddButton.addEventListener('click',function(){
    let checkTasks=document.querySelectorAll('.tasks-content .task-box .inside-task-box');
    //show if input is empty 
    if(input.value === ""){
        swal({  
            title: " Oops!",  
            text: " Something went wrong, you should enter your Task",  
            icon: "error",  
            button: "Ok",  
            });  
            
    }   
    
    else{
        let noTasksMessage=document.querySelector('.no-tasks-message');
    
        // check if there is no tasks and it if it exist remove no task message from html 
        if(document.body.contains(document.querySelector('.no-tasks-message'))){
            noTasksMessage.remove();
        }
        

        //create span Element 
        let mainSpan=document.createElement('Span');
        let insideSpan=document.createElement('Span');

        //create delete botton 

        let deleteBtn=document.createElement('span');

        // create  span text 
        let text = document.createTextNode(input.value);

        // create  Delete Btn text 
        let deleteText = document.createTextNode("Delete");

        //add text to span then add class to span
        insideSpan.appendChild(text);

        mainSpan.classList.add('task-box');
        insideSpan.classList.add('inside-task-box');
        // add text to delete btn 
        deleteBtn.appendChild(deleteText);
        deleteBtn.classList.add('delete');
        
        // add delete btn to main span 
        mainSpan.appendChild(insideSpan);

        mainSpan.appendChild(deleteBtn);

        //add task to container 

        tasksContainer.appendChild(mainSpan);
        localStorage.clear()
        localStorage.setItem('All Tasks',JSON.stringify(insideSpan.innerText));
        // make input empty after user create task 
        input.value="";
        inputFocus();
        calculateTasks();


        // for(let i=0;i<checkTasks.length;i++){
        //     if(input.value===checkTasks[i].innerText){
        //         swal({  
        //             title: " Oops!",  
        //             text: " Task was added before",  
        //             icon: "error",  
        //             button: "Ok",  
        //             }); 
                    
        //     }
        //     else{
        //         console.log(checkTasks[i]);
        //     }
        // }
            }
        })  

// delete and finished 
document.addEventListener('click',function(e){
    // delete task 
    if(e.target.className=='delete'){
        e.target.parentNode.remove();
        if (tasksContainer.childElementCount==0) {
            noTask();
        }
    }

    //finished task 
    if(e.target.classList.contains('inside-task-box')){
        // add toggle to tasks
        e.target.classList.toggle('finished');
    }
    calculateTasks();

})

//delete All Tasks
deleteAllTasks.addEventListener('click',function(){
    let AllTasks=document.querySelectorAll('.task-box');
    if(AllTasks.length>0){
        let i=0;
        for(i;i<AllTasks.length;i++){
            AllTasks[i].remove();
        }
        noTask();
        // deleteAllTasks.classList.add('disabled')
        // deleteAllTasks.classList.remove('disabled');
    }
    else{
        swal({  
            title: " Oops!",  
            text: " There Is No Tasks TO Remove",  
            icon: "error",  
            button: "Ok",  
            });  
    }
    calculateTasks();
    
})

//finished all tasks
finishedAllTasks.addEventListener('click',function(){
    let AllTasks=document.querySelectorAll('.inside-task-box');
    if(AllTasks.length>0){
        let i=0;
        for(i;i<AllTasks.length;i++){
            AllTasks[i].classList.add('finished');
        }
    }
    else{
        swal({  
            title: " Oops!",  
            text: " There Is No Tasks TO Finish",  
            icon: "error",  
            button: "Ok",  
            });  
    }
    calculateTasks();
})

//create no task span and message

let noTask=()=>{
        let noTasksSpan=document.createElement('span');
        const spanText=document.createTextNode('No Tasks to show')
        noTasksSpan.appendChild(spanText);
        noTasksSpan.classList.add('no-tasks-message');
        tasksContainer.append(noTasksSpan);
}

//function to calculate tasks 
function calculateTasks(){
    
    // calculate all tasks 
    tasksCount.innerHTML=document.querySelectorAll('.tasks-content .task-box').length;

    // calculate complete tasks 
    tasksCompleted.innerHTML=document.querySelectorAll('.tasks-content .finished').length; 
}
