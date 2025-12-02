import Link from "next/link";
import { SignInButton } from "../ui";

const NavBar = () => {
  return <div className="w-full py-6 flex justify-between z-1 items-center">
        <Link href="/" className="cursor-pointer text-pallete-6 font-extrabold tracking-wide hover:text-white transition-all">PARTNER ADVISOR </Link>
        <SignInButton size="sm"/>
  </div>
};
export default NavBar