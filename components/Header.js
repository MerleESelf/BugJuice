import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'


export default function Header() {

  const { data: session } = useSession();

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }
  return (
    <div className='header'>
      <Link href='/'>
        <a className='logo'>BUG JUICE</a>
      </Link>
      <br />
      {session && <a href="#" onClick={handleSignout} className="btn-signin">Sign out</a>}
      {!session && <a href="#" onClick={handleSignin} className="btn-signin">Sign in</a>}
    </div>

  )
}