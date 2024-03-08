import { Link, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Shortener = () => {
    return (
        <div className="sm:mt-18 flex justify-center items-center p-4 w-full h-[100vh] bg-[#8EAEC4] text-slate-600">
            <div className="relative w-96 h-96 p-8 flex flex-col flex-wrap justify-between items-start max-sm:h-[32rem] shadow-lg shadow-slate-900 rounded-lg bg-white">
                <form className="flex-col flex gap-4 p-2 flex-wrap">
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
                    <Button variant="default">Shorten</Button>
                </form>
                <p className="text-sm font-bold flex items-center gap-2">
                    <Sparkles />
                    Your SwiftURL is: <span className="font-normal"></span>
                </p>
            </div>
        </div>
    );
};

export default Shortener;
