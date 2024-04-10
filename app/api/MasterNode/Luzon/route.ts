import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import CheckConnection from "@/app/components/CheckConnection";

/*
export async function GET() {
  const appointments = await Client_MLuzon.appointments.findMany({
    take: 5, // Specify the number of records to retrieve
  });
  return appointments;
}
*/

export async function POST (
    request: Request
){
    const prisma = new PrismaClient();
    const body = await request.json();
    const {
        pxid,
        doctorid,
        clinicid,
        type,
        virtual,
        status,
        QueueDate,
        StartTime,
        EndTime,
        RegionName,
        Province,
        Island,
        isolationLevel,
        disableMainNode,
        disableSlaveNode1,
        disableSlaveNode2
    } = body;
    const formattedQueueDate = new Date(QueueDate).toISOString();
    const formattedStartTime = new Date(StartTime).toISOString();
    const formattedEndTime = new Date(EndTime).toISOString();
    body.disableMainNode = parseInt(body.disableMainNode);
    body.disableSlaveNode1 = parseInt(body.disableSlaveNode1);
    body.disableSlaveNode2 = parseInt(body.disableSlaveNode2);

    let appointment
    let isMaindown = await CheckConnection({url:process.env.DATABASE_URL_Master_Luzon, label:"master luzon"});
     //main is down 1 //main is active 0
    if(disableMainNode == 1){
        isMaindown = 1
        console.log("server is virtually down master" + disableMainNode)
    }
    console.log(body);

  //let slave_1_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon, label:'Slave 1 Luzon'});
  //let slave_1_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon_TempValues, label:'Slave 1 temp Luzon'});

  //let slave_2_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz, label:'Slave 2 Luzon'});
  //let slave_2_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz_TempValues, label:'Slave 2 temp Luzon'});

    if(!isMaindown){
        //main is up
        console.log("main is up")
        try {
            appointment = await prisma.$transaction([
                prisma.appointments.create({
                    data:{
                        pxid,
                        doctorid,
                        clinicid,
                        type,
                        virtual,
                        status,
                        QueueDate: formattedQueueDate,
                        StartTime: formattedStartTime,
                        EndTime: formattedEndTime,
                        RegionName,
                        Province,
                        Island
                    }
                })
            ],{
                isolationLevel
            }
            )
            
        } catch(error: any){
            throw new Error("something went wrong when inserting");
        }
        console.log("added data to main");
    }else{
        if(Island==='Luzon'){

            let isLuzonTempDown = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon_TempValues}); // 1 is down // 0 is up
            if(disableSlaveNode1 == 1){
                isLuzonTempDown = 1
                console.log("server is virtually down slave 1" + disableSlaveNode1)
                console.log("Luzon Temp db is down " + isLuzonTempDown)
            }
            console.log("luzon status" + isLuzonTempDown);
            if(!isLuzonTempDown){
                //it is not down
                console.log("luzon is up");
                try {
                    body.isolationLevel="ReadUncommitted"
                    let LuzonTempDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_Luzon_TempValues } } })
                    appointment = await LuzonTempDB.$transaction([
                        LuzonTempDB.appointments.create({
                            data:{
                                pxid,
                                doctorid,
                                clinicid,
                                type,
                                virtual,
                                status,
                                QueueDate: formattedQueueDate,
                                StartTime: formattedStartTime,
                                EndTime: formattedEndTime,
                                RegionName,
                                Province,
                                Island
                            }
                        })
                    ],{
                        isolationLevel
                    }
                    )
                    
                } catch(error: any){
                    throw new Error("something went wrong when inserting");
                }
                console.log("successfully added to temp luzon");

            }else{
                //Luzon is down check if vismiz is down

                //check if vismiz is down if it is gg
                console.log("both server are down");
                console.log("check if vismiz is up");
                let isVisMizTempDown = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz_TempValues});
                if(disableSlaveNode2 == 1){
                    isVisMizTempDown = 1
                }
                console.log("Status of vismiz " + isVisMizTempDown)

                if(!isVisMizTempDown){
                    
                    console.log("vismis is up")
                    //it is not down
                    try {
                        body.isolationLevel="ReadUncommitted"
                        let LuzonTempDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_VisMiz_TempValues } } })
                        appointment = await LuzonTempDB.$transaction([
                            LuzonTempDB.appointments.create({
                                data:{
                                    pxid,
                                    doctorid,
                                    clinicid,
                                    type,
                                    virtual,
                                    status,
                                    QueueDate: formattedQueueDate,
                                    StartTime: formattedStartTime,
                                    EndTime: formattedEndTime,
                                    RegionName,
                                    Province,
                                    Island
                                }
                            })
                        ],{
                            isolationLevel
                        }
                        )
                        
                    } catch(error: any){
                        throw new Error("something went wrong when inserting");
                    }
                    console.log("successfully added to temp vismis");
                }else{
                    //all 3 server is down
                    throw new Error("all server down please try again later");
                }

            }
        }else{
            //this is vizmiz temp
            let isVisMizTempDown = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz_TempValues});
            if(disableSlaveNode2 == 1){
                isVisMizTempDown = 1
            }
            console.log("VisMiz status " + isVisMizTempDown);
            if(!isVisMizTempDown){
                //it is not down
                console.log("vismiz is up second else statemnt");
                try {
                    body.isolationLevel="ReadUncommitted"
                    let LuzonTempDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_VisMiz_TempValues } } })
                    appointment = await LuzonTempDB.$transaction([
                        LuzonTempDB.appointments.create({
                            data:{
                                pxid,
                                doctorid,
                                clinicid,
                                type,
                                virtual,
                                status,
                                QueueDate: formattedQueueDate,
                                StartTime: formattedStartTime,
                                EndTime: formattedEndTime,
                                RegionName,
                                Province,
                                Island
                            }
                        })
                    ],{
                        isolationLevel
                    }
                    )
                    
                } catch(error: any){
                    throw new Error("something went wrong when inserting");
                }
                console.log("successfully added to temp vismis");

            }else{
                //both are down 
                console.log("3 servers is down gg");
            }
        }
    }
    
    
    return NextResponse.json(appointment);
    


    
}