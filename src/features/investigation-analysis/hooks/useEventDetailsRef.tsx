import { useRef, useEffect } from "react";

export const useEventDetailsRef = (setEventDetailsHTML: (html: string) => void,
  dependencies: unknown[]) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!ref.current) {
        console.error("Component was not rendered");
        return;
    }

    setEventDetailsHTML(ref.current.outerHTML);
        }, dependencies);

    return ref;
};