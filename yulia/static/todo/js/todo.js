/*
    KEY COMPONENTS:
    "activeItem" = null until an edit button is clicked. Will contain object of item we are editing
    "list_snapshot" = Will contain previous state of list. Used for removing extra rows on list update
    
    PROCESS:
    1 - Fetch Data and build rows "buildList()"
    2 - Create Item on form submit
    3 - Edit Item click - Prefill form and change submit URL
    4 - Delete Item - Send item id to delete URL
    5 - Cross out completed task - Event handle updated item

    NOTES:
    -- Add event handlers to "edit", "delete", "title"
    -- Render with strike through items completed
    -- Remove extra data on re-render
    -- CSRF Token
*/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name
                 + '=')) {
                cookieValue = decodeURIComponent(cookie.
                    substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken')
var activeItem = null
var list_snapshot = []

buildList()


function buildList(){
    var wrapper = document.getElementById('list-wrapper')
    //wrapper.innerHTML = ''
    var url = '/api/todo/task-list/'
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        console.log('Data:', data)
        var list = data
        for (var i in list){
            try{
                document.getElementById(`data-row-${i}`).remove()
            }catch(err){
            }
            var title = `<span class="title">${list[i].title}</span>`
            if (list[i].completed == true){
                var title = `<strike class="title">${list[i].title}</strike>`
            }
            var item = `
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                        ${title}
                    </div>
                    <div style="flex:1">
                    <i class="bi bi-pencil-square edit"></i>
                    </div>
                    <div style="flex:1">
                    <i class="bi bi-trash delete"></i>
                    </div>
                </div>
            `

            // var item = `
            // <li class="list-group-item d-flex justify-content-between align-items-center" id="data-row-${i}">
            //     <span>${title}</span>
            //     <i class="far fa-trash-alt delete"></i>
            // </li>`
            wrapper.innerHTML += item
        }
        if (list_snapshot.length > list.length){
            for (var i = list.length; i < list_snapshot.length; i++){
                document.getElementById(`data-row-${i}`).remove()
            }
        }
        list_snapshot = list
        for (var i in list){
            var editBtn = document.getElementsByClassName('edit')[i]
            var deleteBtn = document.getElementsByClassName('delete')[i]
            var title = document.getElementsByClassName('title')[i]


            editBtn.addEventListener('click', (function(item){
                return function(){
                    editItem(item)
                }
            })(list[i]))

            deleteBtn.addEventListener('click', (function(item){
                return function(){
                    deleteItem(item)
                }
            })(list[i]))
            title.addEventListener('click', (function(item){
                return function(){
                    changeStatus(item)
                }
            })(list[i]))
        }
    })

}

var cancelBtn = document.getElementById('cancel')
cancelBtn.addEventListener('click', function(e){
    e.preventDefault()
    activeItem = null
    document.getElementById('form').reset()
    document.getElementById('submit').value = 'Добавить'

})

var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e){
    e.preventDefault()
    console.log("Form submitted")
    var url = '/api/todo/task-create/'
    if (activeItem != null){
        var url = `/api/todo/task-update/${activeItem.id}/` 
        activeItem = null
        document.getElementById('submit').value = 'Добавить'
    }
    var title = document.getElementById('title').value

    fetch(url, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'title':title})
    }).then(function(response){
        buildList()
        document.getElementById('form').reset()
    })
})

function editItem(item){
    console.log('Item clicked:', item)
    activeItem = item
    document.getElementById('title').value = activeItem.title
    document.getElementById('submit').value = 'Изменить'

}

function deleteItem(item){
    console.log('Delete clicked')
    fetch(`/api/todo/task-delete/${item.id}/`, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken
        }
    }).then((response) => {
        buildList()
    })
}

function changeStatus(item){
    console.log('Change task status')

    item.completed = !item.completed
    fetch(`/api/todo/task-update/${item.id}/`, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify({'completed':item.completed})
    }).then((response) => {
        buildList()
    })
}
