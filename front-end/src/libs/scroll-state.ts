
import { useEffect, useState } from "react";

export default function useScrollY() {
    let [y, setY] = useState<number>(0);
    useEffect(() => {
        if (!window) {
            return;
        }
        function handleY() {
            setY(window.scrollY);
        }
        window.addEventListener("scroll", handleY);
    }, [y]);

    return y;
}
