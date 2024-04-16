"use client";

import { Heart } from "lucide-react";
import { NextFont } from "next/dist/compiled/@next/font";
import { Aclonica } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const aclonica: NextFont = Aclonica({
    weight: ["400"],
    subsets: ["latin"],
});

const Footer = () => {
    return (
        <div
            className={cn(
                "fixed top-[95%] w-full h-10 bg-[#283132] text-muted flex items-center justify-center",
                aclonica.className
            )}
        >
            Powered by &nbsp;{" "}
            <Image
                src={"./next-js.svg"}
                height={22}
                width={22}
                alt="nextjs logo"
            />{" "}
            &nbsp; and &nbsp;{" "}
            <Image
                src={"./cockroachdb.svg"}
                height={22}
                width={22}
                alt="cockroachdb logo"
            />
        </div>
    );
};

export default Footer;
