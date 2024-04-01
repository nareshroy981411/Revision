// Function to make a GET request to fetch items
function getItems() {
    fetch('http://localhost:3001/products')
        .then(response => response.json())
        .then(data => {
            document.getElementById('getOutput').innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Error fetching items:', error));
}

// Function to make a POST request to add an item
function postItem() {
    const itemName = document.getElementById('itemName').value;
    fetch('http://localhost:3001/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
    })
    .then(() => {
        alert('Item added successfully!');
        document.getElementById('itemName').value = '';
    })
    .catch(error => console.error('Error adding item:', error));
}

// Function to make a PUT request to update an item
function putItem() {
    const itemId = document.getElementById('itemId').value;
    const newName = document.getElementById('newName').value;
    fetch(`http://localhost:3001/products/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
    })
    .then(() => {
        alert('Item updated successfully!');
        document.getElementById('itemId').value = '';
        document.getElementById('newName').value = '';
    })
    .catch(error => console.error('Error updating item:', error));
}

// Function to make a DELETE request to delete an item
function deleteItem() {
    const deleteId = document.getElementById('deleteId').value;
    fetch(`http://localhost:3001/products/${deleteId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        return response.json();
    })
    .then(() => {
        alert('Item deleted successfully!');
        document.getElementById('deleteId').value = '';
    })
    .catch(error => console.error('Error deleting item:', error));
}
