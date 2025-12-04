import NewUser from "../icons/NewUser";
import { Button, partnerProps, Partner } from "../ui";

const partners: partnerProps[] = [
    {
        color: "ff27bb",
        name: "Avi",
    },
    {
        color: "ffffff",
        name: "My Crush",
    },
    {
        color: "FF27BB",
        name: "My Wife",
    },
    {
        color: "FFFFFF",
        name: "Second Wife",
    },
    {
        color: "FF27BB",
        name: "Secret Crush",
    },
    {
        color: "FFFFFF",
        name: "Neighbour",
    },
];
const DashboardLanding = () => {
    return (
        <div className="flex w-1/2 overflow-hidden rounded-2xl shadow-[0px_0px_8px_2px_#FF27BB,inset_0px_4px_7px_0px_rgba(0,0,0,0.35),inset_0px_-4px_7.5px_0px_rgba(255,255,255,0.35)]">
            <div className="flex min-w-64 flex-col justify-start gap-4 bg-[#181818] p-6">
                <div className="p-4 font-bold text-[#FF27BB]">
                    PARTNER ADVISOR
                </div>
                <div className="px-2 py-4">
                    <Button text="New Partner" startIcon={<NewUser />}>
                        {" "}
                    </Button>
                </div>
                <div className="px-2 py-5">
                    {partners.map((partner, index) => (
                        <Partner
                            color={partner.color}
                            name={partner.name}
                            key={index}
                        ></Partner>
                    ))}
                </div>
                <div className="p-4"></div>
            </div>
            <div className="flex w-full flex-col gap-6 bg-[#212121] p-6">
                <div className="flex w-full justify-end px-4 py-2">
                    <Button text="Logout"></Button>
                </div>
                <div className="flex h-full w-full flex-col gap-4 px-8 py-4">
                    <div className="flex h-full w-full flex-col items-end gap-4 px-4 py-2">
                        <div className="rounded-2xl bg-[#303030] px-6 py-4">
                            How Do I Impress My Crush??
                        </div>
                        <div className="w-full py-4">You Can't...</div>
                    </div>
                    <div className="w-full px-12">
                        <div className="rounded-2xl bg-[#303030] px-6 py-4">
                            Ask Message....
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { DashboardLanding };
