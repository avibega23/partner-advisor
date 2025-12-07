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
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-giradient(to_bottom,#80808012_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[35px_35px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,39,187,0.3),rgba(255,255,255,0))]" />
            <div className="z-1 flex min-h-screen w-full flex-col items-center justify-between gap-2">
                <div className="flex w-full flex-col items-center px-6 md:px-12 lg:px-32 2xl:px-64">
                    <NavBar />
                    <div className="flex flex-col items-center justify-center gap-8 py-20 text-center md:py-32 2xl:py-64">
                        <div className="flex flex-col items-center gap-2 text-4xl font-bold md:gap-4 md:text-5xl lg:text-6xl 2xl:text-7xl">
                            <span className="flex flex-wrap justify-center gap-3 md:gap-6">
                                <span>GPT</span>
                                <span className="text-pallete-6">WRAPPER</span>
                            </span>
                            <span>FOR COUPLES</span>
                        </div>
                        <SignInButton size="md" />
                    </div>
                </div>

                <DashboardLanding />
                <div className="h-20 md:h-40"></div>

                <div className="flex w-full flex-col items-center justify-between gap-8 px-6 md:px-12 lg:flex-row lg:gap-4 lg:px-32 2xl:px-64">
                    <div className="group relative flex h-auto min-h-80 w-full max-w-sm flex-col items-center justify-center gap-6 rounded-2xl bg-[#181818] p-6 text-center shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_0px_20px_4px_#FF27BB] lg:h-80 lg:w-80">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] shadow-inner">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FF27BB"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Smart Matching
                            </h3>
                            <p className="text-sm text-gray-400">
                                Analyze compatibility using advanced psychology
                                models to find where you and your partner truly
                                align.
                            </p>
                        </div>
                    </div>
                    <div className="group relative flex h-auto min-h-80 w-full max-w-sm flex-col items-center justify-center gap-6 rounded-2xl bg-[#181818] p-6 text-center shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_0px_20px_4px_#FF27BB] lg:h-80 lg:w-80">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] shadow-inner">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FF27BB"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                AI Advisor Chat
                            </h3>
                            <p className="text-sm text-gray-400">
                                Get instant, unbiased advice for conflicts or
                                conversation starters powered by our
                                Gemini-integrated AI.
                            </p>
                        </div>
                    </div>
                    <div className="group relative flex h-auto min-h-80 w-full max-w-sm flex-col items-center justify-center gap-6 rounded-2xl bg-[#181818] p-6 text-center shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0px_0px_20px_4px_#FF27BB] lg:h-80 lg:w-80">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a] shadow-inner">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="#FF27BB"
                                className="h-10 w-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-bold text-white">
                                Date Planner
                            </h3>
                            <p className="text-sm text-gray-400">
                                Never run out of ideas. Generate custom date
                                nights and gift ideas based on your
                                partner&apos;s unique personality.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-20 md:h-40"></div>

                <div className="relative w-full border-t border-[#FF27BB]/20 bg-[#181818] shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_0px_0px_0px_rgba(255,255,255,0.35)]">
                    <div className="absolute top-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FF27BB] to-transparent opacity-50 blur-[2px]"></div>
                    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:gap-0 md:px-12">
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
                                <Heart />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
