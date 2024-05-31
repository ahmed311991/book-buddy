import "./App.css";
import { useEffect, useState } from "react";
import { apiLink } from "./constants";
import axios from "axios";
import Book from "./Book";

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(`${apiLink}Books`).then((res) => {
      setBooks(res.data.books);
    });
  }, []);

  useEffect(()=>{
    if(books.length > 0 && search != ''){
      let newArray = books.filter(function(el){
        return el.title.toLowerCase().includes(search)
      })
      setBooks(newArray)
    }else{
      axios.get(`${apiLink}Books`).then((res) => {
        setBooks(res.data.books);
      });
    }
  },[search])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>
            <label>
              Search for a book here:
              <input className="search-input" value={search} onChange={e=>setSearch(e.target.value)}></input>
            </label>
            <div>OUR LIBRARY:</div>
          </h2>
        </div>
        <div className="books">
          {books.length != 0 ? books.map((book, index) => <Book key={index} book={book}></Book>) : <></>}
        </div>
      </header>
    </div>
  );
}

export default App;
