import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const users = useLoaderData();
  const [ displayUsers ,setDisplayUsers] =useState(users)
  const handleDelete = (user) => {
    const agree = window.confirm(`Are you sure about that ${user.name}`);
    console.log(agree);
    if (agree) {
      console.log(user._id);
      fetch(`http://localhost:5000/users/${user._id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.deletedCount > 0){
                alert('user deleted successfully')
                const remaining = displayUsers.filter(usr => usr._id !== user._id)
                setDisplayUsers(remaining)
            }
        });
    }
  };
  return (
    <div>
      <h2>this is Home {displayUsers.length}</h2>
      <div>
        {displayUsers.map((user) => (
          <p key={user._id}>
            {user.name} {user.email} 
            <Link to={`/update/${user._id}`}>
            <button>update</button>
            </Link>
            <button onClick={() => handleDelete(user)}>✖</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
