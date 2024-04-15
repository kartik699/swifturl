"use server";

import { db } from "@/lib/db";
import { LinkReturnType } from "@/types/types";

export async function redirectTo(code: string): Promise<LinkReturnType> {
    try {
        // throw new Error("Not implemented");
        // Find the link in the database using the short link code
        const link = await db.link.findFirst({
            where: {
                shortLink: code,
            },
            select: {
                longLink: true,
            },
        });

        // If the link is not found, return an error
        if (!link) {
            return { error: "Link not found!" };
        } else {
            return { link: link.longLink };
        }
    } catch (err) {
        return { error: "Something went wrong! Please try again later." };
    }
}
