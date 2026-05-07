const input = document.querySelector('.inp');
const btn = document.querySelector('button');
const container = document.querySelector('.container');




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

function createTask(text, statuss) {
    const task = document.createElement('div');
    const title = document.createElement('h2');
    const cancel = document.createElement('button');
    const edit = document.createElement('button');
    const status = document.createElement('input');
    const label = document.createElement('label');
    label.textContent = "Mark As Completed "
    const checkboxgroup = document.createElement('div');
    checkboxgroup.append(label, status);

    label.style.backgroundColor="transparent";
    label.addEventListener('click',()=>{
        let newlabel = document.createElement('label');
            label.textContent = "task is completed ✅";
            newlabel.textContent = label.textContent;
            checkboxgroup.replaceChild(newlabel, label);
            newlabel.style.backgroundColor='transparent';
            edit.style.display='none';
            status.style.display = 'none';
            settask();
    })
    

    status.type = "checkbox"
    const group = document.createElement('div');
    if (statuss === "task is completed ✅") {
        status.checked = true;
        label.textContent = "task is completed ✅";
        status.style.display = 'none';
        edit.disabled=true;
        edit.style.display='none';
    }

    group.append(checkboxgroup, edit, cancel);
    edit.textContent = 'edit';
    cancel.textContent = "delete";
    status.addEventListener('change', () => {
        if (status.checked == true) {
            let newlabel = document.createElement('label');
            label.textContent = "task is completed ✅";
            newlabel.textContent = label.textContent;
            checkboxgroup.replaceChild(newlabel, label);
            newlabel.style.backgroundColor='transparent';
            edit.style.display='none';
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

    if(title.textContent===''){
        task.style.display="none";
    }
    edit.addEventListener('click', () => {
        if (edit.textContent === "edit") {
            const newtitle = task.querySelector('h2');
            const newinpt = document.createElement('input');
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

