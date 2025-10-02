"use client";

import { motion } from "framer-motion";
import { Typewriter } from "motion-plus/react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="margin-left-500 w-full h-screen bg-[#292929] flex items-center justify-center">
      <main className="w-[1200px] h-[400px] flex  flex-col gap-[30px]">
        <motion.header
          className="text-white"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <h1 className="text-[48px] font-bold ">
            WELCOME <span className="text-[#FF049B]">AVI !</span>
          </h1>
        </motion.header>

        <motion.div
          className="text-white text-[24px] flex flex-col gap-[30px] "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            delay: 1.5,
            ease: "easeOut",
          }}
        >
          <Typewriter>
            We’ll ask you some few questions about you and your lifestyle, how
            you behave with others,what type of partners do you prefer etc:
          </Typewriter>

          <p>Click next to begin</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            duration: 1,
            delay: 1.5,
            ease: "easeOut",
          }}
        >
          <Link href="./../profileData">
            <button
              className="px-[60px] border-[#FF049B] border-[2px] py-[16px] bg-[#FF049B] rounded-lg text-[15px] font-bold cursor-pointer hover:bg-[#292929] hover:border-[#FF049B] hover:border-[2px] hover:text-white duration-500"
            >
              Next
            </button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default Page;
