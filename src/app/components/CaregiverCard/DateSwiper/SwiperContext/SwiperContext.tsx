import { AvailabilityBlock } from "@/types/User";
import { createContext } from "react";


export type TSwiperSelected = {
    firstBlock: AvailabilityBlock | undefined,
    lastBlock: AvailabilityBlock | undefined,
    hoverBlock: AvailabilityBlock | undefined,
}

export type TSwiperContext = {
    selectedBlocks: TSwiperSelected;
    setSelectedBlocks: (selected: TSwiperSelected) => void;
}

const initialValues: TSwiperContext = {
    selectedBlocks: {
        firstBlock: undefined,
        lastBlock: undefined,
        hoverBlock: undefined
    },
    setSelectedBlocks: () => {},
}

export const SwiperContext = createContext(initialValues);