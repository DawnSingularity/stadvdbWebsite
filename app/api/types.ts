export interface DBSchema{
    apptid: string;
    pxid?: string | null;
    doctorid?: string | null;
    clinicid?: string | null;
    type?: string | null;
    virtual?: string | null;
    status?: string | null;
    QueueDate?: Date | null;
    StartTime?: Date | null;
    EndTime?: Date | null;
    RegionName?: string | null;
    Province?: string | null;
    Island: string;
}