const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  let form = document.createElement('form')
  let content = document.createElement('textarea')
  content.cols = 100
  let button = document.createElement('button')
  button.innerHTML = "Save"
  button.type = "click"
  list.append(content)
  list.append(button)
  button.addEventListener('click', function() {
    let li = document.createElement('li')
    li.style = 'border:solid; padding:10px'
    li.innerHTML = content.value
    let img = document.createElement("img")
    img.src = 'img.jpg'
    let butt = document.createElement('button')
    butt.type = 'click'
    butt.innerHTML = 'Delete'
    butt.name = 'ok'
    let items = Number(itemCountSpan.innerHTML) + 1
    let uncheck = Number(itemCountSpan.innerHTML) + 1
    itemCountSpan.innerHTML = items
    uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1
    img.id = '1'
    img.style = 'width: 5%; padding-right : 10px; padding-left: 10px'
    console.log(uncheck)
    img.addEventListener('click' , function(){
      if (img.id === '1')
      {
        img.id = '2'
        img.src = 'img2.jpg'
        uncheck = uncheck - 1
        uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
      
        
      }

      else 
      {
        img.id = '1'
        img.src = 'img.jpg'
        console.log(uncheck)
        uncheck = uncheck + 1
        uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) + 1
        
      }

    })
    li.append(img)
    li.append(butt)
    list.append(li)
    list.removeChild(button)
    list.removeChild(content)
    butt.addEventListener('click', function(){
      list.removeChild(li)
      if (img.id === '1')
      {
        uncheckedCountSpan.innerHTML = Number(uncheckedCountSpan.innerHTML) - 1
      }
      itemCountSpan.innerHTML = Number(itemCountSpan.innerHTML) - 1

    })
    

  }
  
  )}
