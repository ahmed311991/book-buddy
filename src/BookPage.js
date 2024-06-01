import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { apiLink } from "./constants";
import axios from "axios";

function BookPage() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState(null);

  const checkoutBook = async () => {
    if (token === null) {
      return alert("No Token Available, Please login");
    }

    try {
      await axios.patch(
        `${apiLink}books/${id}`,
        { bookId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/account");
    } catch (error) {
      alert(JSON.stringify(error, null, 4));
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("session");
    if (token) {
      setToken(token);
      setIsLogin(true);
    }
    axios.get(`${apiLink}books/${id}`).then((res) => {
      console.log(res.data.book);
      setBook(res.data.book);
    });
  }, []);

  return (
    <div className="book-info">
      <h2>{book && book.title}</h2>
      <div style={{ width: "90%" }}>
        <img
          className="book-info-image"
          src={book && book.coverimage}
        ></img>
        <p>{book && book.description}</p>
      </div>
      {isLogin ? (
        <>
          {book?.available ? (
            <button onClick={checkoutBook}>Check out this book</button>
          ) : (
            <p>Currently checked out</p>
          )}
        </>
      ) : (
        <p>
          <a href="/login">Login</a> to check out this book
        </p>
      )}
    </div>
  );
}
export default BookPage;
