"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { redirectTo } from "@/actions/redirect";

const Redirect = () => {
    const [link, setLink] = useState<string>("");

    const linkRef = useRef<HTMLAnchorElement>(null);

    const { id } = useParams<{ id: string }>();

    const code = id[0];

    const getLink = async (code: string) => {
        const { link, error } = await redirectTo(code);

        if (error) {
            toast.error(error);
            return;
        }

        return link;
    };

    const setLinkAndRedirect = async () => {
        const url = await getLink(code);
        setLink(url!);

        linkRef.current?.click();
    };

    useEffect(() => {
        setLinkAndRedirect();
    }, []);

    if (link) {
        return (
            <>
                <a hidden href={link} ref={linkRef}></a>
            </>
        );
    }

    return <>{/* TODO: Create a beautiful redirecting page */}</>;
};

export default Redirect;
