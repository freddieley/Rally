

export type Party =  {
    id: string;
    
    // essentials
    hostUserId: string;
    name: string;
    location: string;
    startTime: string;

    // optionals
    endTime?: string;
    capacity?: number;  // defaults to no limit

    // party access configurations
    accessType: "public" | "approval" | "code" | "private";     // default "approval"
    captureAccess: "participants" | "anyone";                   // default "participants"
}