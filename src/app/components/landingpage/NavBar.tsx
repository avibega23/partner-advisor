import Link from "next/link";
import { SignInButton } from "../ui";

const NavBar = () => {
  return (
      <div className="z-1 flex w-full items-center justify-between py-4 md:py-6">
          <Link
              href="/"
              className="cursor-pointer text-base font-extrabold tracking-wide text-pallete-6 transition-all hover:opacity-80 md:text-xl"
          >
              <span className="text-white">PARTNER</span> ADVISOR
          </Link>
          <SignInButton size="sm" />
      </div>
  );
};
export default NavBar