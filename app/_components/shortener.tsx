"use client";

import { toast } from "sonner";
import copy from "clipboard-copy";
import { useFormStatus } from "react-dom";
import { Link, Sparkles } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

import { isValid } from "@/lib/check-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { correctUrl } from "@/lib/correct-url";
import { Button } from "@/components/ui/button";
import { createLink } from "@/actions/create-link";

const Shortener = () => {
    const [isCopied, setIsCopied] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [shortUrl, setShortUrl] = useState("");

    const { pending } = useFormStatus();

    const spanRef = useRef<ElementRef<"span">>(null);

    const handleCopy = async () => {
        const text = spanRef?.current?.textContent!;
        await copy(text);
        setIsCopied(true);
    };

    const handleSubmit = async (formData: FormData) => {
        const url = formData.get("long-url") as string;
        const validUrl = isValid(url);

        if (validUrl) {
            setIsValidUrl(true);
            setIsDone(false);
            setIsCopied(false);
            // clear copied text
            isCopied && copy("");

            const correctedUrl = correctUrl(url);

            const { error, code } = await createLink(correctedUrl);

            if (error) {
                toast.error(error);
                return;
            }

            setShortUrl(`${window.location.origin}/${code}`);
            setIsDone(true);

            toast.success("Link shortened successfully!");
        } else {
            setIsValidUrl(false);
        }
    };

    return (
        <div className="sm:mt-18 flex justify-center items-center p-4 w-full h-[100vh] bg-[#8EAEC4] text-slate-600">
            <div className="relative w-96 h-96 p-5 flex flex-col flex-wrap justify-between items-start max-sm:h-[32rem] shadow-lg shadow-slate-900 rounded-lg bg-white">
                <form
                    className="flex-col flex gap-4 p-2 flex-wrap w-full"
                    action={handleSubmit}
                >
                    <Label
                        htmlFor="long-url"
                        className="w-full flex items-center font-bold text-md"
                    >
                        <Link className="w-5 h-5 mr-2" />
                        Enter the long URL
                    </Label>
                    <Input
                        className="text-[#283132]"
                        placeholder="URL goes here..."
                        id="long-url"
                        name="long-url"
                    />
                    {isValidUrl ? null : (
                        <p className="text-xs text-red-500">
                            Please enter a valid URL
                        </p>
                    )}
                    <Button disabled={pending} variant="default">
                        Shorten
                    </Button>
                </form>
                <div className="text-sm font-bold flex flex-col items-center gap-2">
                    <div className="flex max-sm:text-xs">
                        <Sparkles />
                        Your SwiftURL is:&nbsp;{" "}
                        <span ref={spanRef} className="font-normal text-wrap">
                            {shortUrl}
                        </span>
                    </div>
                    {isDone && (
                        <Button
                            onClick={handleCopy}
                            size={"sm"}
                            className="text-sm"
                        >
                            {isCopied ? "Copied!" : "Copy to clipboard"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shortener;
