import Image from "next/image";
import PropTypes from "prop-types";
const NavBar = (props) => {
  const { logOut, userImg } = props

  return (
    <div>
      <nav className="flex w-screen shadow-xl navbar place-content-between bg-base-100">
        <Image className="flex-none" height={60} width={60} src="/2.png" alt="" />
        <p className="flex-grow text-4xl normal-case">Bug Juice</p>
        <div className="flex flex-col avatar">
          <div className="w-10 mx-2 rounded-full">
            <Image src={`${userImg}`} alt="" height={80} width={80} />
          </div>
        </div>
        <button className="flex-none mr-0 btn btn-ghost" onClick={logOut}>
          Sign Out
        </button>
      </nav>
    </div>
  )
}


NavBar.propTypes = {
  logOut: PropTypes.func,
  userImg: PropTypes.string
};


export default NavBar