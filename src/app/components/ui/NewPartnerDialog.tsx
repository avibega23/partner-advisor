import { useState } from "react";
import axios from "axios";
import { IPartner } from "@/types/partner.types";
import { usePartners } from "@/hooks/usePartner";

export const NewPartnerDialog = () => {
    const [text, setText] = useState<string>("");
    const {addPartner} = usePartners();

    const partnerHandler = (partner: IPartner) => {
        addPartner(partner);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text === "") return;
        axios
            .post("/api/partners/", {
                name: text,
            })
            .then((response) => {
                if(!response.data.success)
                {
                    alert("Partner Name Already Exists");
                    return;
                }
                else{
                    partnerHandler(response.data.data);
                }
            });
        setText("");
    };
    return (
        <form onSubmit={handleSubmit} className="flex h-full">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Partner Name.."
            />

            <button type="submit">S</button>
        </form>
    );
};
