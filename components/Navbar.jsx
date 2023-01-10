import Image from "next/image";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { ErrorModal } from "./ErrorModal";
import { useState } from "react";

const NavBar = () => {
  const [isErrorSignoutModalOpen, setIsErrorSignoutModalOpen] = useState(false)
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const logOut = async () => {
    try {
      await supabaseClient.auth.signOut()
      router.push("/login")
    } catch (error) {
      setIsErrorSignoutModalOpen(true)
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

  const userAvatarUrl = user.user_metadata.avatar_url;
  return (
    <div>
      <nav className="flex w-screen shadow-xl navbar place-content-between bg-base-100">
        <Image className="flex-none" height={60} width={60} src="/2.png" alt="" />
        <p className="flex-grow text-4xl normal-case">Bug Juice</p>
        <div className="flex flex-col avatar">
          <div className="w-10 mx-2 rounded-full">
            <Image src={userAvatarUrl} alt="" height={80} width={80} />
          </div>
        </div>
        <button className="flex-none mr-0 btn btn-ghost" onClick={logOut}>
          Sign Out
        </button>
      </nav>
      <ErrorModal isOpen={isErrorSignoutModalOpen} />
    </div>
  )
}


NavBar.propTypes = {
  logOut: PropTypes.func,
  userImg: PropTypes.string
};


export default NavBar