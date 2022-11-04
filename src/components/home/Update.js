import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
  const storedUser = useLoaderData();
  const [user, setUser] = useState(storedUser);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/users/${storedUser._id}`,{
      method: 'PUT',
      headers: {
        'content-type' : 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then((res) =>res.json())
    .then(data=> {
      if(data.modifiedCount > 0){
        alert('user updated')
        console.log(data);
      }
    })
    // console.log(user);
  };

  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
    console.log(newUser);
  };
  return (
    <div>
      <h2>this is Update : {storedUser.name}</h2>
      <form onSubmit={handleUpdateUser}>
        <input
          onChange={handleInputChange}
          defaultValue={storedUser.name}
          type="text"
          name="name"
          id=""
          placeholder="Input your name"
          required
        />
        <br />
        <br />
        <input
          onChange={handleInputChange}
          type="text"
          defaultValue={storedUser.address}
          name="address"
          id=""
          placeholder="Input your address"
          required
        />
        <br />
        <br />
        <input
          onChange={handleInputChange}
          defaultValue={storedUser.email}
          type="email"
          name="email"
          id=""
          placeholder="Input your email"
          required
        />{' '}
        <br />
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default Update;
