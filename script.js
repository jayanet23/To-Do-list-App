
const input = document.querySelector('.input')
const taskList = document.querySelector('.task-list');
const btnAdd = document.querySelector('.btn-add');


// document.addEventListener('DOMContentLoaded', getList());

// when click add btn
function updateUI() {
    getList();
    btnAdd.addEventListener('click', function () {
        if(input.value === '') {
            alert('please enter task!')
        } else {
            updateList(input);
            input.value = '';
            saveList();
        }
    })
}
updateUI();

// when user click enter
function whenEnter() {
    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            updateList(input);
            input.value = '';
        }
        saveList();
    })
}
whenEnter();

// update list one by one inner taskList
function updateList(input) {
    let list = document.createElement('div');
    list.className = 'list-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const p = document.createElement('p');
    p.innerHTML = input.value;

    const btnClose = document.createElement('a');
    btnClose.innerHTML = 'x';

    list.appendChild(checkbox);
    list.appendChild(p);
    list.appendChild(btnClose);
    taskList.appendChild(list);

    removeList(btnClose);
    pLinethrough(p, checkbox);
}


// to remove list when click a
function removeList(btnClose) {
    btnClose.addEventListener('click', function () {
        btnClose.parentElement.remove();
        saveList();
    })
}


// give line through in  when checkbox click
function pLinethrough(p, checkbox) {
    checkbox.addEventListener('change', function () {
        p.classList.toggle('line-through', checkbox.checked);
        saveList();
    })
}

// save all changes to localStorage
function saveList() {
    localStorage.setItem('list', taskList.innerHTML);
}


function getList() {
    const listSaved = localStorage.getItem('list');

    if (listSaved) {
        taskList.innerHTML = listSaved;
        document.querySelectorAll('.list-item').forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const p = item.querySelector('p');
            const btnClose = item.querySelector('a');

            removeList(btnClose);
            pLinethrough(p, checkbox);
        });
    }
}