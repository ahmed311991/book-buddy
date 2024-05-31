import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink } from "./constants";
import { useParams } from "react-router-dom";

function BookPage() {
  const [book, setBook] = useState();
  const { id } = useParams();
  const [isLogin, setIsLogin] = useState();
  useEffect(() => {
    let token = localStorage.getItem("session");
    if (token) setIsLogin(true);
    axios.get(`${apiLink}books/${id}`).then((res) => {
      console.log(res.data.book);
      setBook(res.data.book);
    });
  }, []);
  return (
    <div className="book-info">
      <h2>{book && book.title}</h2>
      <div style={{ width: "90%" }}>
        <img className="book-info-image" src={book && book.coverimage}></img>
        <p>{book && book.description}</p>
      </div>
      {isLogin ? (
        <p>Currently checked out</p>
      ) : (
        <p>
          <a href="/login">Login</a> to check out this book
        </p>
      )}
    </div>
  );
}
export default BookPage;
