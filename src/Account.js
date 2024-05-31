import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "./constants";
import Book from "./Book";

function Account() {
  const [user, setUser] = useState();

  useEffect(() => {
    let token = localStorage.getItem("session");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.get(`${apiLink}users/me`).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      <h2>
        {" "}
        Welcome {user && user.firstname} {user && user.lastname}
      </h2>
      <p>{user && user.email}</p>
      <div className="books">
        {user && user.books.length != 0 ? (
          user.books.map((book, index) => <Book key={index} book={book}></Book>)
        ) : (
          <p>No books checked out!</p>
        )}
      </div>
    </div>
  );
}

export default Account;
