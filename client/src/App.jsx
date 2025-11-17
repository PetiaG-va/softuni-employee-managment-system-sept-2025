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
  }

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

        {showCreateUser && <CreateUserModal onClose={closeUserModalHandler} />}

      </main>
      <Footer />
    </div>
  )
}
