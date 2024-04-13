"use server";

import { CharacterSetType, generateRandomString } from "ts-randomstring/lib";

import { db } from "@/lib/db";
import { LinkReturnType } from "@/types/types";

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

export async function createLink(url: string): Promise<LinkReturnType> {
    // Step 1
    const code = createUniqueLink();

    // Step 2
    try {
        const checkCode = await db.link.findFirst({
            where: {
                longLink: url,
            },
            select: {
                shortLink: true,
                longLink: true,
            },
        });

        // Step 3
        if (checkCode && checkCode.longLink === url) {
            return { code: checkCode.shortLink };
        } else {
            // Step 4
            const { shortLink } = await db.link.create({
                data: {
                    shortLink: code,
                    longLink: url,
                },
            });

            return { code: shortLink };
        }
    } catch (err) {
        return { error: "Something went wrong! Please try again later." };
    }
}
