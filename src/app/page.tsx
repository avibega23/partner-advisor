import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NavBar from "./components/landingpage/NavBar";
import { DashboardLanding } from "./components/landingpage/DashboardLanding";
import { SignInButton } from "./components/ui";
import { Heart } from "./components/icons/Heart";

export default async function Page() {
    const session = await getServerSession(authOption);

    if (session) {
        redirect("/chat");
    }

    return (
        <div className="relative flex min-h-screen w-full overflow-hidden bg-black">
            {/*This is the pattern and the radial gradient made on the top of the page*/}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[35px_35px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,39,187,0.3),rgba(255,255,255,0))]" />
            {/* Main Page */}
            <div className="z-1 flex w-full min-h-screen flex-col items-center gap-2 justify-between">
                {/*Hero Section*/}
                <div className="flex w-full flex-col items-center px-64">
                    <NavBar />
                    <div className="flex flex-col items-center justify-center gap-8 py-64">
                        <div className="flex flex-col items-center gap-4 text-7xl font-bold">
                            <span className="flex gap-6">
                                <span>GPT</span>
                                <span className="text-pallete-6">WRAPPER</span>
                            </span>
                            <span>FOR COUPLES</span>
                        </div>
                        <SignInButton size="md" />
                    </div>
                </div>
                <DashboardLanding></DashboardLanding>
                <div className="h-40"></div>

                <div className="flex w-full items-center justify-between px-64">
                    {/* Box 1 */}
                    <div className="h-80 w-80 rounded-2xl bg-[#181818] shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)]"></div>

                    {/* Box 2 */}
                    <div className="h-80 w-80 rounded-2xl bg-[#181818] shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)]"></div>

                    {/* Box 3 */}
                    <div className="h-80 w-80 rounded-2xl bg-[#181818] shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)]"></div>
                </div>

                <div className="h-40"></div>

                {/* FOOTER SECTION */}
                <div className="relative w-full border-t border-[#FF27BB]/20 bg-[#181818] shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_0px_0px_0px_rgba(255,255,255,0.35)]">
                    <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FF27BB] to-transparent opacity-50 blur-[2px]"></div>

                    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-8 md:px-12">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold tracking-widest text-neutral-300">
                                PARTNER{" "}
                                <span className="text-[#FF27BB] drop-shadow-[0_0_5px_rgba(255,39,187,0.8)]">
                                    ADVISOR
                                </span>
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                            <span>made by</span>
                            <span className="group relative cursor-pointer text-white transition-colors hover:text-[#FF27BB]">
                                AVI
                                <span className="absolute -inset-2 -z-10 scale-75 rounded-full bg-[#FF27BB]/20 opacity-0 blur-md transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"></span>
                            </span>
                            <span>with</span>
                            <span className="group relative cursor-pointer text-white transition-colors hover:text-[#FF27BB]">
                                <Heart/>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
