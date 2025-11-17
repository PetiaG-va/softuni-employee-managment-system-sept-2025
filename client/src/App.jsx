import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import CreateUserModal from "./components/CreateUserModal.jsx";

import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(result => {
        setUsers(Object.values(result));
      })
      .catch((err) => alert(err.message));
  }, []);



  const addUserClickHandler = () => {
    setShowCreateUser(true);
  };

  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };

  const addUserSubmitHandler = (event) => {
    // stop page refresh
    event.preventDefault();

    //get form data
    const formData = new FormData(event.target);

    // transform formData to userData
    const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);
    userData.address = {
      country,
      city,
      street,
      streetNumber
    }

    // create new user request
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

          <UserList users={users} />

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
