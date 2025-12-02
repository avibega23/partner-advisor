import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "./components/landingpage/NavBar";
import { SignInButton } from "./components/ui";

export default async function Page() {
    const session = await getServerSession(authOption);

    if (session) {
        redirect("/chat");
    }

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden bg-black">
            {/*This is the pattern and the radial gradient made on the top of the page*/}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(51,34,34,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(51,51,51,0.2)_1px,transparent_1px)] bg-size-[12px_12px]" />
            <div className="pointer-events-none absolute inset-0 translate-y-[-4%] bg-[radial-gradient(100%_60%_at_top,#ff27bb_0%,rgba(0,0,0,0)_25%)]"></div>

            {/* Main Page */}
            <div className="flex w-full flex-col gap-2 z-1">
                {/*Hero Section*/}
                <div className="flex w-full flex-col items-center px-64">
                    <NavBar />
                    <div className="flex flex-col items-center justify-center gap-8 py-64">
                        <div className="flex flex-col items-center font-bold text-7xl gap-4">
                            <span className="flex gap-6">
                                <span>GPT</span>
                                <span className="text-pallete-6">WRAPPER</span>
                            </span>
                            <span>FOR COUPLES</span>
                        </div>
                        <SignInButton size="md"/>
                    </div>
                </div>
            </div>
        </div>
    );
}
