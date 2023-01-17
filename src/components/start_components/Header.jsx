import {Link, NavLink} from "react-router-dom";
import nutrition from "/src/images/dino.png";

function Header(props) {

  //const getClass = ({isActive}) => (isActive ? "nav-active" : null)

  return (
      <header className="header">
          <Link to="/">
          <img className="logo" src={nutrition}/>
          </Link>
        <nav>
            <div style={{textAlign: "right", paddingRight: 15}}>
                {/*<NavLink to={"login"}>{props.loggedIn ? "Userpage": "Login / Sign Up"}</NavLink>*/}
                {props.loggedIn ? <NavLink onClick={props.logout} to={"/"}>Logout</NavLink> : <NavLink to={"login"}>Login / Sign Up</NavLink>}
            </div>
        </nav>
      </header>
  );
}

export default Header;