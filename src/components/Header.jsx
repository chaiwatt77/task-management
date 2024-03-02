//npm install react-icons --save
import "./Header.css";
import {FaSun, FaMoon} from "react-icons/fa";

export default function Header(props) {
  const {theme,setTheme} = props;

  const changeTheme = () =>{
    if(theme === "light"){
      setTheme("dark");
    }else{
      setTheme("light")
    }
  }
  return (
    <header>
      <div className="logo">
        <span>Task Management</span>
      </div>
      <div className="theme-container">
        <span className="icon" onClick={changeTheme}>{theme === "light" ? "LIGHT":"DARK"}</span>
        <span className="icon" onClick={changeTheme}>{theme === "light" ? <FaSun />:<FaMoon />}</span>
      </div>
    </header>
  );
}
