"use client";

import { ElementRef, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Link, Sparkles } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";

import { isValid } from "@/lib/check-url";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Shortener = () => {
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [shortUrl, setShortUrl] = useState("");
    const { pending } = useFormStatus();
    const [copiedText, copy] = useCopyToClipboard();
    const inputRef = useRef<ElementRef<"input">>(null);

    const handleCopy = async () => {
        const text = inputRef?.current?.value!;
        await copy(text);
    };

    const handleSubmit = (formData: FormData) => {
        const url = formData.get("long-url") as string;
        const validUrl = isValid(url);

        if (validUrl) {
            setIsValidUrl(true);
            // TODO: Call the API to shorten the URL
        } else {
            setIsValidUrl(false);
        }
    };

    return (
        <div className="sm:mt-18 flex justify-center items-center p-4 w-full h-[100vh] bg-[#8EAEC4] text-slate-600">
            <div className="relative w-96 h-96 p-8 flex flex-col flex-wrap justify-between items-start max-sm:h-[32rem] shadow-lg shadow-slate-900 rounded-lg bg-white">
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
                    />
                    {isValidUrl ? null : (
                        <p className="text-xs text-red-500">
                            Please enter a valid URL
                        </p>
                    )}
                    <Button disabled={pending} type="submit" variant="default">
                        Shorten
                    </Button>
                </form>
                <p className="text-sm font-bold flex items-center gap-2">
                    <Sparkles />
                    Your SwiftURL is:{" "}
                    <span className="font-normal">{shortUrl}</span>
                    <Button onClick={handleCopy}>
                        {copiedText ? "Copied!" : "Copy to clipboard"}
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default Shortener;
