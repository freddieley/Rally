import { randomUUID } from "crypto";
import type { Party } from "../types";


type partyResult = {
    success: boolean;
    party?: Party;
    error?: string;
}

export async function createParty(
    name: string,
    hostUserId: string,
    location: string,
    startTime: string,
    accessType: "public" | "approval" | "code" | "private",
    captureAccess: "participants" | "anyone",
    endTime?: string,
    capacity?: number
): Promise<partyResult> {
    
    const newParty: Party = {
        id: `party_${randomUUID()}`,
        hostUserId: hostUserId,
        name: name,
        location: location,
        startTime: startTime,
        accessType: accessType,
        captureAccess: captureAccess,
        endTime: endTime,
        capacity: capacity
    }

    return {
        success: true,
        party: newParty
    }
}