import React, { useState } from 'react';

const AddUser = () => {
  const [user, setUser] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.acknowledged){
          alert('User added successfully');
          event.target.reset();
        }
      });
  };

  const handleBlur = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newUser = { ...user };
    newUser[field] = value;
    setUser(newUser);
    console.log(field);
  };

  return (
    <div>
      <h2>Please Enter a User</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleBlur}
          type="text"
          name="name"
          id=""
          placeholder="Input your name"
          required
        />
        <br />
        <br />
        <input
          onChange={handleBlur}
          type="text"
          name="address"
          id=""
          placeholder="Input your address"
          required
        />
        <br />
        <br />
        <input
          onChange={handleBlur}
          type="email"
          name="email"
          id=""
          placeholder="Input your email"
          required
        />{' '}
        <br />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
