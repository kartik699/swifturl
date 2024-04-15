"use client";

import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Link, Sparkles } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import { ElementRef, useRef, useState } from "react";

import { correctUrl } from "@/lib/correct-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isValid } from "@/lib/check-url";
import { createLink } from "@/actions/create-link";

const Shortener = () => {
    const [isDone, setIsDone] = useState(false);
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [shortUrl, setShortUrl] = useState("");

    const { pending } = useFormStatus();

    const [copiedText, copy] = useCopyToClipboard();

    const spanRef = useRef<ElementRef<"span">>(null);

    const handleCopy = async () => {
        const text = spanRef?.current?.textContent!;
        await copy(text);
        navigator.clipboard.writeText(text);
    };

    const handleSubmit = async (formData: FormData) => {
        const url = formData.get("long-url") as string;
        // TODO: Debug "isValid" function
        const validUrl = isValid(url);

        if (validUrl) {
            setIsValidUrl(true);
            setIsDone(false);
            // clear copied text
            copiedText && copy("");

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
                    <div className="flex ">
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
                            {copiedText ? "Copied!" : "Copy to clipboard"}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shortener;
