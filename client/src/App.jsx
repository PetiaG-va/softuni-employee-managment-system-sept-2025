import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import CreateUserModal from "./components/CreateUserModal.jsx";

import { useState } from "react";

export default function App() {
  const [showCreateUser, setShowCreateUser] = useState(false);

  const addUserClickHandler = () => {
    setShowCreateUser(true);
  };

  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };
  
  const addUserSubmitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const {country, city, street, streetNumber, ...userData} = Object.fromEntries(formData);
    userData.address = {
      country, 
      city, 
      street, 
      streetNumber
    }

    userData.createAt = new Date().toISOString();
    userData.updateAt = new Date().toISOString();

    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'apllication/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        
      })
  };

  return (
    <div>
      <Header />
      <main className="main">

        <section className="card users-container">
          <Search />

          <UserList />

          <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

          <Pagination />

        </section>

        {showCreateUser && 
          <CreateUserModal 
            onClose={closeUserModalHandler} 
            onSubmit={addUserSubmitHandler}
        />}

      </main>
      <Footer />
    </div>
  )
}
