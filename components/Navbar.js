import Image from "next/image";
import PropTypes from "prop-types";
const NavBar = (props) => {
  const { logoStyle, logOut } = props
  return (
    <div>
      <nav className="flex shadow-xl navbar place-content-between bg-base-100">
        <Image className="flex-none" style={logoStyle} src="2.png" alt="" />
        <p className="flex-grow text-4xl normal-case">Bug Juice</p>
        <button className="flex-none mr-0 btn btn-ghost" onClick={logOut}>
          Sign Out
        </button>
      </nav>
    </div>
  )
}

NavBar.propTypes = {
  logoStyle: PropTypes.object,
  logOut: PropTypes.func
};


export default NavBar