import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import CheckConnection from "@/app/components/CheckConnection";
import toast from "react-hot-toast";

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
        apptid,
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



    if(apptid==''){
        console.log(apptid)
        console.log("apptid is nothing");
    }else{
        console.log(apptid)
        console.log("it has something")
    }
  //let slave_1_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon, label:'Slave 1 Luzon'});
  //let slave_1_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon_TempValues, label:'Slave 1 temp Luzon'});

  //let slave_2_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz, label:'Slave 2 Luzon'});
  //let slave_2_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz_TempValues, label:'Slave 2 temp Luzon'});

    if(!isMaindown){
        //main is up
        console.log("main is up")
        if(Island==='Luzon'){
            console.log("luzon");
            let mainLuzon = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_Luzon } } })
            try {
                if(apptid==''){
                    appointment = await mainLuzon.$transaction([
                        mainLuzon.appointments.create({
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
                }else{
                    console.log("update");
                    console.log(apptid);
                        appointment = await mainLuzon.$transaction([
                            mainLuzon.appointments.update({
                                where:{
                                    apptid
                                },
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
                    
                }
                
                
            } catch(error: any){
                throw new Error(error);
            }
            console.log("added data to main");
        }else{

            try {
                let mainVisMiz = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_VisMiz } } })

                if(apptid==''){
                    appointment = await mainVisMiz.$transaction([
                        mainVisMiz.appointments.create({
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
                }else{
    
                        appointment = await mainVisMiz.$transaction([
                            mainVisMiz.appointments.update({
                                where:{
                                    apptid
                                },
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
                    
                }
                
                
            } catch(error: any){
                throw new Error(error);
            }
            console.log("added data to main");
        }
        
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

                    if(apptid==''){
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
                    }else{
                        appointment = await LuzonTempDB.$transaction([
                            LuzonTempDB.appointments.update({
                                where:{
                                    apptid
                                },
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
                        })
                    }
                    
                    
                } catch(error: any){
                    throw new Error(error);
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
                        let VisMizTempDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_VisMiz_TempValues } } })
                        if(apptid==''){
                        appointment = await VisMizTempDB.$transaction([
                            VisMizTempDB.appointments.create({
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
                        })

                        }else{
                                appointment = await VisMizTempDB.$transaction([
                                    VisMizTempDB.appointments.update({
                                        where:{
                                            apptid
                                        },
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
                                })
                        }
                        
                        
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
                    let VisMizTempDB = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_VisMiz_TempValues } } })
                    if(apptid==''){
                        appointment = await VisMizTempDB.$transaction([
                            VisMizTempDB.appointments.create({
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
                        })
                    }else{
                            appointment = await VisMizTempDB.$transaction([
                                VisMizTempDB.appointments.update({
                                    where:{
                                        apptid
                                    },
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
                            })
                    }
                    
                    
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