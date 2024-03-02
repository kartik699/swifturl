"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { Aclonica } from "next/font/google";
import Image from "next/image";

const aclonica: NextFont = Aclonica({
    weight: ["400"],
    subsets: ["latin"],
});

const Navbar = () => {
    return (
        <div className="w-full h-16 bg-[#283132] fixed top-0 flex items-center justify-between p-4 gap-4 max-sm:justify-center">
            <div className="flex items-center">
                <Image src="/logo.svg" alt="logo" width={142} height={142} />
            </div>
            <div className="text-muted hidden sm:block">
                <h3 className={aclonica.className}>
                    Your lightweight URL Shortener
                </h3>
            </div>
        </div>
    );
};

export default Navbar;
