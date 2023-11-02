import { useEffect, useRef, useState } from "react"

export const useGetScrollPosition = (minValue:number) => {
    let isMounted = useRef(true);
    let [effectApplied, setEffectApplied] = useState(false);

    useEffect(() => {
        isMounted.current = true;

        const onScroll = () => {
            if(!isMounted.current) return;

            if (window.scrollY >= minValue) {
                if(effectApplied) return;

                setEffectApplied(true);
            }

            if (window.scrollY < minValue && effectApplied) {
                setEffectApplied(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => {
            isMounted.current = false;
            window.removeEventListener("scroll", onScroll)
        };
    });

    return effectApplied;
}