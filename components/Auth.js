import { supabase } from "../db/config/supabase"
import Link from 'next/link'


export default function Auth() {



  async function handleOAuthLogin() {
    let { error } = await supabase.auth.signIn({
      provider: 'github'
    })
    if (error) console.log('Error: ', error.message)
  }

  return (
    <div className='header'>
      <Link href='/'>
        <a className='logo'>BUG JUICE</a>
      </Link>
      <br />
      <button onClick={handleOAuthLogin}>Sign In With GitHub </button>
    </div>

  )
}