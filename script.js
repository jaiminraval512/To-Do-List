const input = document.querySelector('.inp');
const btn = document.querySelector('button');
const container = document.querySelector('.container');
const filter_btn = document.querySelectorAll('.filter-btn')
const search = document.querySelector('.search');
let errorrr =document.createElement('h1');
errorrr.className='errormsg'
errorrr.textContent='no task found'    
container.append(errorrr)
errorrr.style.display='none';
    



search.addEventListener('input',()=>{
    const task =document.querySelectorAll('.task');
    const value =search.value.toLowerCase();
    
         

    task.forEach((tasks)=>{
         const text = tasks.querySelector('h2').textContent.toLowerCase();
    if(text.includes(value)){
        if(text===""){
            tasks.style.display='none'
        }
        else{
              errorrr.style.display='none'
            tasks.style.display='flex'
        }
        
    }   
  
    else{

         
         errorrr.style.display='block';
        tasks.style.display='none';
        
           
        
    }
    })

})





function settask() {
    let task_list = [];
    let status = [];
    document.querySelectorAll('.task h2').forEach((elem) => {
        task_list.push(elem.textContent);
    });
    document.querySelectorAll('label').forEach((elem) => {
        status.push(elem.textContent);
    })
    localStorage.setItem('tasks', JSON.stringify(task_list));
    localStorage.setItem('status', JSON.stringify(status));
}



function createTask(text, statuss = "Pending") {



    const task = document.createElement('div');
    const title = document.createElement('h2');
    const cancel = document.createElement('button');
    const edit = document.createElement('button');
    const status = document.createElement('input');
    const label = document.createElement('label');
    label.textContent = "Mark As Completed"
    task.dataset.status = "Pending";
    const checkboxgroup = document.createElement('div');
    checkboxgroup.append(label, status);

    label.style.backgroundColor = "transparent";
    label.addEventListener('click', () => {
        let newlabel = document.createElement('label');
        label.textContent = "task is completed ✅";
        task.dataset.status = 'Complated';
        newlabel.textContent = label.textContent;
        checkboxgroup.replaceChild(newlabel, label);
        newlabel.style.backgroundColor = 'transparent';
        edit.style.display = 'none';
        status.style.display = 'none';
        settask();
    })





    status.type = "checkbox"
    const group = document.createElement('div');
    if (statuss === "task is completed ✅") {
        status.checked = true;
        label.textContent = "task is completed ✅";
        status.style.display = 'none';
        edit.disabled = true;
        edit.style.display = 'none';
        task.dataset.status = "Complated";
    }



    group.append(checkboxgroup, edit, cancel);
    edit.textContent = 'edit';
    cancel.textContent = "delete";
    status.addEventListener('change', () => {
        if (status.checked == true) {
            let newlabel = document.createElement('label');
            label.textContent = "task is completed ✅";
            task.dataset.status = "Complated";
            newlabel.textContent = label.textContent;
            checkboxgroup.replaceChild(newlabel, label);
            newlabel.style.backgroundColor = 'transparent';
            edit.style.display = 'none';
            status.style.display = 'none';
            settask();

        }
    })






    title.textContent = text;
    task.className = "task";
    task.append(title, group);


    container.append(task);
    input.value = "";
    settask();
    cancel.addEventListener('click', () => {
        task.remove();
        settask();
    });

    if (title.textContent === '') {
        task.style.display = "none";
    }
    edit.addEventListener('click', () => {
        if (edit.textContent === "edit") {
            const newtitle = task.querySelector('h2');
            const newinpt = document.createElement('input');
            newinpt.className = 'inpp';
            newinpt.value = newtitle.textContent;
            task.replaceChild(newinpt, newtitle);
            newinpt.focus();
            edit.textContent = "save"

        }
        else {
            const newtitle = document.createElement('h2');
            newtitle.textContent = task.querySelector('input').value;
            task.replaceChild(newtitle, task.querySelector('input'));
            edit.textContent = "edit";
            settask();

        }



    })




}

filter_btn.forEach((elem) => {
    elem.addEventListener('click', () => {
        const filter = elem.textContent.trim();

        const task = document.querySelectorAll('.task');

        task.forEach((task) => {
            const status = task.dataset.status;
            if (filter === 'All') {

                const title = task.querySelector('h2');
                if (title.textContent.trim() ==='') {
                    task.style.display = 'none';
                }
                else {
                    task.style.display = 'flex';
                }
            }
            else if (filter === 'Complated') {
                if (status === 'Complated') {
                    task.style.display = 'flex'


                }
                else {
                    task.style.display = 'none'
                }
            }
            else if (filter === 'Pending') {
                
                if (status === 'Pending') {
                    const title = task.querySelector('h2');
                    if (title.textContent.trim()==='') {
                        task.style.display = 'none';
                    }
                    else {
                        task.style.display = 'flex';
                    }
                }
                else {
                    task.style.display = 'none'
                }
            }

        })
    });
});

btn.addEventListener('click', () => {

    createTask(input.value);
    settask();
});
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const status = JSON.parse(localStorage.getItem('status'));
    console.log(status);


    tasks.forEach((task, index) => {
        createTask(task, status[index]);
    });


}



loadTasks();

