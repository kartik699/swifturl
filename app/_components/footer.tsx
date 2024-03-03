"use client";

import { Heart } from "lucide-react";
import { NextFont } from "next/dist/compiled/@next/font";
import { Aclonica } from "next/font/google";

import { cn } from "@/lib/utils";

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
            Made with &nbsp; <Heart className="text-red-500 h-6 w-6 mb-0.5" />{" "}
            &nbsp; by Kartik
        </div>
    );
};

export default Footer;
