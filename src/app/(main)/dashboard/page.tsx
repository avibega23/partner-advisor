"use-client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";


const Page = () => {

   

    

    return (<div className="w-full h-screen bg-[#292929] flex items-center justify-center">
        <main className="w-[1200px] h-[400px] flex gap-[30px] flex-col">

            <header className="text-white"> 
                <h1 className="text-[48px] font-bold ">WELCOME <span className="text-[#FF049B]">AVI !</span></h1>
            </header>

            <div className="text-white text-[24px] flex flex-col gap-[30px] font-bold">
                <p>We’ll ask you some few questions about you and your lifestyle, how you behave with others ,what type of partners do you prefer etc:</p>

                <p>Click next to begin</p>
            </div>

            <div>
                <button className="px-[60px] border-[#FF049B] border-[2px] py-[16px] bg-[#FF049B] rounded-lg text-[15px] font-bold cursor-pointer hover:bg-[#292929] hover:border-[#FF049B] hover:border-[2px] hover:text-white duration-500">Next</button>
            </div>

        </main>
    </div>)
}


export default Page;