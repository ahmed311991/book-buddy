function Book(props) {
  return (
    <div className="bookcard">
      <a className="bookcard-content" href={"/books/" + props.book.id}>
        <h2>{props.book.title}</h2>
        <div style={{width:'90%'}}>
            <img className="book-image" src={props.book.coverimage}></img>
            <p>
                {props.book.description}
            </p>
        </div>
      </a>
    </div>
  );
}

export default Book;