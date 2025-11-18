import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Search from "./components/Search.jsx";
import UserList from "./components/UserList.jsx";
import Pagination from "./components/Pagination.jsx";
import UserSaveModal from "./components/UserSaveModal.jsx";

import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then(response => response.json())
      .then(result => {
        setUsers(Object.values(result));
      })
      .catch((err) => alert(err.message));
  }, [refresh]);

  const forceRefresh = () => {
    setRefresh(state => !state);
  }

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
    userData.createdAt = new Date().toISOString();
    userData.updatedAt = new Date().toISOString();

    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(() => {
        closeUserModalHandler();
        forceRefresh();
      })
      .catch(err => alert(err.messge))
      
  };

  return (
    <div>
      <Header />
      <main className="main">

        <section className="card users-container">
          <Search />

          <UserList users={users} forceRefresh={forceRefresh} />

          <button className="btn-add btn" onClick={addUserClickHandler}>Add new user</button>

          <Pagination />

        </section>

        {showCreateUser &&
          <UserSaveModal
            onClose={closeUserModalHandler}
            onSubmit={addUserSubmitHandler}
          />}

      </main>
      <Footer />
    </div>
  )
}
