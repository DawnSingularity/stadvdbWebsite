import { PrismaClient } from "@prisma/client";

export interface IdParams{
    apptid?: string;
}


export default async function getAppointmentById(
    params: IdParams
){

try {
    const {apptid} = params;
    const query: any = {}
    if(apptid){
        query.apptid = apptid;
    }
    console.log(query);

    let client1 = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_Luzon } } })
    let appointments = await client1.$transaction([
        client1.appointments.findMany({
            take: 10, // Specify the number of records to retrieve
            where: query
        })
    ],{
        isolationLevel: "ReadCommitted"
    })
    return appointments[0];
} catch (error: any) {
    throw new Error(error);
}
}