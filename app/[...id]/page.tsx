"use client";

import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { redirectTo } from "@/actions/redirect";

const Redirect = () => {
    const [link, setLink] = useState<string>("");

    const linkRef = useRef<HTMLAnchorElement>(null);

    // getting the code from url parameters
    const { id } = useParams<{ id: string }>();

    const code = id[0];

    // fetching the link from the server
    const getLink = async (code: string) => {
        const { link, error } = await redirectTo(code);

        if (error) {
            toast.error(error);
            return;
        }

        return link;
    };

    // setting the link and redirecting the user
    const setLinkAndRedirect = async () => {
        const url = await getLink(code);
        setLink(url!);

        // the link tag is clicked to redirect the user
        linkRef.current?.click();
    };

    // redirecting as soon as the page loads
    useEffect(() => {
        setLinkAndRedirect();
    }, [link]);

    if (link) {
        return (
            <>
                {/* a hidden link tag for redirecting the user to destination page */}
                <a hidden href={link} ref={linkRef} />
            </>
        );
    }

    return (
        <div className="w-full h-full mt-52 flex flex-col gap-2 justify-center items-center">
            <div className="text-5xl max-sm:text-2xl">
                Taking you to your destination
            </div>
            <div className="flex flex-col items-center justify-center">
                <div
                    style={{
                        width: "100%",
                        height: "0",
                        paddingBottom: "27%",
                        position: "relative",
                    }}
                >
                    <iframe
                        src="https://giphy.com/embed/ld8kkEla6obuolmtgC"
                        width="100%"
                        height="100%"
                        style={{
                            position: "absolute",
                            translate: "-50%",
                        }}
                        className="giphy-embed size-40"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Redirect;
