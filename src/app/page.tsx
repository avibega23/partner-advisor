import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { SignInButton } from "./components/ui";

export default async function Page() {
    const session = await getServerSession(authOption);

    if (session) {
        redirect("/chat");
    }

    return (
        <div>
            <div>Welcome To This Shitty Partner Advisor</div>
            <SignInButton/>
        </div>
    );
}
