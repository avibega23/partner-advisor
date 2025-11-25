import { createContext, useContext } from "react";
import { IPartner } from "@/types/partner.types";

type PartnerContextType = {
  addPartner: (partner: IPartner) => void;
};

export const PartnerContext = createContext<PartnerContextType | null>(null);

export const usePartners = () => {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error("usePartners must be used inside PartnerProvider");
  return ctx;
};
