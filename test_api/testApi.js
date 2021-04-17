
const title = 'First CRUD post';
const content = 'Content of first CRUD post';

const postValues = {
    title: title,
    content: content
}

//POST
fetch('http://localhost:3000/api/doc', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postValues)
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));



//GET 
let data;
try {
    data = await(await fetch('http://localhost:3000/api/doc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();
} catch (ex) {
    console.log(ex);
}


const { docs } = data;


//GET By ID
try {
    const { doc } = await(await fetch(`http://localhost:3000/api/doc/${docs[0]._id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })).json();

    console.log(doc);

} catch (ex) {
    console.log(ex);
}


//PUT 

fetch(`http://localhost:3000/api/doc/${docs[0]._id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postValues)
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));



//DELETE 
fetch(`http://localhost:3000/api/doc/${docs[1]._id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
