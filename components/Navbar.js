import Image from "next/image";
import PropTypes from "prop-types";
const NavBar = (props) => {
  const { logOut } = props
  return (
    <div>
      <nav className="flex shadow-xl navbar place-content-between bg-base-100">
        <Image className="flex-none" height={80} width={80} src="/2.png" alt="" />
        <p className="flex-grow text-4xl normal-case">Bug Juice</p>
        <button className="flex-none mr-0 btn btn-ghost" onClick={logOut}>
          Sign Out
        </button>
      </nav>
    </div>
  )
}


NavBar.propTypes = {
  logOut: PropTypes.func
};


export default NavBar