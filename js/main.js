const form = document.getElementById('item_form')
const itemInput = document.getElementById('item_input')
const submitBtn = document.getElementById('submit_btn')
const clearBtn = document.getElementById('clear_btn')
const itemList = document.getElementById('item_list')
const itemFilter = document.getElementById('filter')




// EVENT LISTENERS //
// submitBtn.addEventListener('click', (e) => validateInput(e))
itemFilter.addEventListener('input', (e) => filterItems(e))
form.addEventListener('submit', (e) => submitForm(e))
itemList.addEventListener('click', (e) => deleteItem(e))
itemList.addEventListener('click', (e) => updateItem(e))
clearBtn.addEventListener('click', deleteAllItems)


// FUNCTIONS //

// Display UI
function displayUI()
{
    filter.classList.remove('none')
    clearBtn.classList.remove('none')
    itemList.style.display = 'flex'
    itemInput.value = ''
}

// Hide UI
function hideUI()
{
    filter.classList.add('none')
    clearBtn.classList.add('none')
    itemList.style.display = 'none'
    itemInput.value = ''
}

// Submit Form
function submitForm(e)
{
    e.preventDefault()
    validateInput()
}

// Add Item
function addItem()
{
    // Create Item
    const item = createItem('item')
    item.textContent = itemInput.value

    // Create Text
    // const text = createText('text')

    // Create Delete Button
    const deleteButton = createDeleteButton('fa-solid fa-xmark text-red')

    itemList.append(item)
    item.append(deleteButton)
}

// Validate Input
function validateInput(e)
{
    if (itemInput.value.trim() !== '')
    {

        addItem()
        displayUI()
    }
    else if (itemInput.value === '' || itemInput.value === ' ')
    {
        itemInput.style.border = '2px solid red'

        setTimeout(() =>
        {
            itemInput.style.border = null
        }, 2000)
    }
}

// Create Item
function createItem(itemClasses)
{
    const item = document.createElement('li')
    item.className = itemClasses
    return item
}

// Create Text
// function createText(textClasses)
// {
//     const text = document.createElement('h4')
//     text.className = textClasses
//     return text
// }

// Create Delete Button
function createDeleteButton(deleteButtonClasses)
{
    const deleteButton = document.createElement('i')
    deleteButton.className = deleteButtonClasses
    return deleteButton
}

// Delete Item
function deleteItem(e)
{
    if (e.target.matches('.fa-solid.fa-xmark'))   
    {
        const isDeleting = confirm('Are you sure you want to delete this item?')

        if (!isDeleting)
        {
            return
        }

        if (e.target.closest('.item') === itemList.lastChild)
        {
            hideUI()
        }

        e.target.closest('.item').remove()
    }

}

// Delete All Items
function deleteAllItems()
{
    const isDeletingAllNotes = confirm('Are you sure you want to delete all items? This cannot be undone.')

    if (!isDeletingAllNotes)
    {
        return
    }

    while (itemList.firstChild)
    {
        itemList.removeChild(itemList.firstChild)
        hideUI()
    }
}




// Filter Items

function filterItems(e)
{
    const items = [...document.querySelectorAll('.item')]
    const text = e.target.value.toLowerCase()

    items.forEach(item =>
    {
        if (item.textContent.toLowerCase().includes(text))
        {
            item.style.display = 'block';
        } else
        {
            item.style.display = 'none';
        }
    });
}