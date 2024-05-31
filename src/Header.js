import { useEffect, useState } from "react";
import { isLogin } from "./atoms";
import { useAtom } from "jotai";

function Header() {
  const [login, setLogin] = useAtom(isLogin);
  useEffect(()=>{
    let token = localStorage.getItem('session')
    if(token) setLogin(true)
  },[])
  function deletesession(){
    localStorage.removeItem('session')
  }
  return (
    <div>
      {" "}
      <h1 className="header">Book Buddy</h1>
      <nav className="navbar">
        <a href="/books">See All Books</a>
        {login && <a href="/account">My Account</a>}
        {login ? <a onClick={e=>{deletesession()}} href="/login">Logout</a> : <a href="/login">Login</a>}
      </nav>
    </div>
  );
}

export default Header;
