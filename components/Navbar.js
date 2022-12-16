
const NavBar = (props) => {
  const { logoStyle, logOut } = props
  return (
    <div>
      <nav className="flex shadow-xl navbar place-content-between bg-base-100">
        <img className="flex-none" style={logoStyle} src="2.png" alt=""></img>
        <a className="flex-none text-4xl normal-case">Bug Juice</a>
        <button className="flex-none mx-10 btn btn-ghost" onClick={logOut}>
          Sign Out
        </button>
      </nav>
    </div>
  )
}

export default NavBar