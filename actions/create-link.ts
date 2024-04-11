"use server";

import { db } from "@/lib/db";
import { CharacterSetType, generateRandomString } from "ts-randomstring/lib";
import { toast } from "sonner";

/*
Steps:
    Step 1: create unique link (randomly generate using ts-randomstring)
    Step 2: Check if the link already exists in the database
    Step 3: If the link already exists, return the link
    Step 4: If the link does not exist, create a new link and return it
*/

const createUniqueLink = () => {
    const uniqueCode = generateRandomString({
        length: 6,
        charSetType: CharacterSetType.Alphanumeric,
    });

    return uniqueCode;
};

export async function createLink(url: string): Promise<string> {
    // Step 1
    const code = createUniqueLink();

    // Step 2
    try {
        const checkCode = await db.link.findFirst({
            where: {
                shortLink: code,
            },
            select: {
                shortLink: true,
                longLink: true,
            },
        });

        // Step 3
        if (
            checkCode &&
            checkCode.shortLink === code &&
            checkCode.longLink !== url
        ) {
            //TODO: Handle this case
        }

        if (
            checkCode &&
            checkCode.shortLink === code &&
            checkCode.longLink === url
        ) {
            return code;
        }

        // Step 4
        await db.link.create({
            data: {
                shortLink: code,
                longLink: url,
            },
        });
    } catch (err) {
        toast.error("Something went wrong! Please try again later.");
    }

    return code;
}
