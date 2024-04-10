export const dynamic = "force-dynamic"


import Image from "next/image";
import { Prisma, PrismaClient } from '@prisma/client';
import Container from "./components/Container";
import CheckConnection from "../app/components/CheckConnection"
import ClientOnly from "./components/ClientOnly";

import AppointmentRow from "./components/AppointmentRow";


// Create a Prisma Client instance
export default async function Home() {


  /*
  let masterstatusLuzon = await CheckConnection({url:process.env.DATABASE_URL_Master_Luzon, label:"master luzon"});
  
  let masterstatusVisMiz = await CheckConnection({url:process.env.DATABASE_URL_Master_VisMiz, label:"master vismis"});


  let slave_1_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon, label:'Slave 1 Luzon'});
  let slave_1_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_Luzon_TempValues, label:'Slave 1 temp Luzon'});

  let slave_2_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz, label:'Slave 2 Luzon'});
  let slave_2_temp_status = await CheckConnection({url:process.env.DATABASE_URL_Slave_VisMiz_TempValues, label:'Slave 2 temp Luzon'});





  let client1 = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_VisMiz } } })
  let appointments = await client1.appointments.findMany({
    take: 1, // Specify the number of records to retrieve
  });
  //console.log("master vismis")
  //console.log(appointments);

  
  client1 = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_Luzon } } })
  appointments = await client1.appointments.findMany({
    take: 1, // Specify the number of records to retrieve
  });
  //console.log("slave Luzon")
  //console.log(appointments);
  */



  //transfer data from slave luzon to main luzon
  let slaveTrans = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_Luzon_TempValues } } })
  let tempAppointments = await slaveTrans.appointments.findFirst();
  if(tempAppointments){
    console.log("found data on luzon");
    let mainTrans = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_Luzon } } })
    try {
      let appointment = await mainTrans.$transaction([
        mainTrans.appointments.upsert({
          where:{
            apptid: tempAppointments.apptid,
          },
          update:{
            apptid: tempAppointments.apptid,
            pxid: tempAppointments.pxid,
            doctorid: tempAppointments.doctorid,
            clinicid: tempAppointments.clinicid,
            type: tempAppointments.type,
            virtual: tempAppointments.virtual,
            status: tempAppointments.status,
            QueueDate: tempAppointments.QueueDate,
            StartTime: tempAppointments.StartTime,
            EndTime: tempAppointments.EndTime,
            RegionName: tempAppointments.RegionName,
            Province: tempAppointments.Province,
            Island: tempAppointments.Island
          },
          create:{
               apptid: tempAppointments.apptid,
              pxid: tempAppointments.pxid,
              doctorid: tempAppointments.doctorid,
              clinicid: tempAppointments.clinicid,
              type: tempAppointments.type,
              virtual: tempAppointments.virtual,
              status: tempAppointments.status,
              QueueDate: tempAppointments.QueueDate,
              StartTime: tempAppointments.StartTime,
              EndTime: tempAppointments.EndTime,
              RegionName: tempAppointments.RegionName,
              Province: tempAppointments.Province,
              Island: tempAppointments.Island
          }
            
          }), 
      ],{
          isolationLevel: "ReadCommitted"
      })
    } catch (error) {
      console.log("something went wrong when inserting/updating the file luzon")
      return;
    }
    

    console.log("it will now do a delete to the temp table");
    console.log(tempAppointments.apptid);
    try {
      let deletedApp = await slaveTrans.appointments.delete({
        where: {
          apptid:tempAppointments.apptid
        }
      })
    } catch (error) {
    console.log("something went wrong when deleteting luzon");
      
    }
    

    console.log("successfully inserted data to main luzon");
  }











  //transfer data from temp vismiz to main vismiz
  //transfer data from slave luzon to main luzon
  slaveTrans = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Slave_VisMiz_TempValues } } })
  tempAppointments = await slaveTrans.appointments.findFirst();
  if(tempAppointments){
    console.log("found data on vismiz");
    let mainTrans = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_VisMiz } } })
    try {
      let appointment = await mainTrans.$transaction([
        mainTrans.appointments.upsert({
          where:{
            apptid: tempAppointments.apptid,
          },
          update:{
            apptid: tempAppointments.apptid,
            pxid: tempAppointments.pxid,
            doctorid: tempAppointments.doctorid,
            clinicid: tempAppointments.clinicid,
            type: tempAppointments.type,
            virtual: tempAppointments.virtual,
            status: tempAppointments.status,
            QueueDate: tempAppointments.QueueDate,
            StartTime: tempAppointments.StartTime,
            EndTime: tempAppointments.EndTime,
            RegionName: tempAppointments.RegionName,
            Province: tempAppointments.Province,
            Island: tempAppointments.Island
          },
          create:{
               apptid: tempAppointments.apptid,
              pxid: tempAppointments.pxid,
              doctorid: tempAppointments.doctorid,
              clinicid: tempAppointments.clinicid,
              type: tempAppointments.type,
              virtual: tempAppointments.virtual,
              status: tempAppointments.status,
              QueueDate: tempAppointments.QueueDate,
              StartTime: tempAppointments.StartTime,
              EndTime: tempAppointments.EndTime,
              RegionName: tempAppointments.RegionName,
              Province: tempAppointments.Province,
              Island: tempAppointments.Island
          }
            
          }), 
      ],{
          isolationLevel: "ReadCommitted"
      })
    } catch (error) {
      console.log("something went wrong when inserting/updating the file vismiz")
      return;
    }
    

    console.log("it will now do a delete to the temp table");
    console.log(tempAppointments.apptid);
    try {
      let deletedApp = await slaveTrans.appointments.delete({
        where: {
          apptid:tempAppointments.apptid
        }
      })
    } catch (error) {
    console.log("something went wrong when deleteting vismiz");
      
    }
    

    console.log("successfully inserted data to main vismiz");
  }






  let client1 = new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL_Master_VisMiz } } })
  let appointments = await client1.appointments.findMany({
    take: 10, // Specify the number of records to retrieve
    where:{
      NOT:{
        StartTime: null
      }
    }
  });


  
  return (
    <ClientOnly>
      <Container>
        <div className="appointments-container">
          {appointments.map((appointment) => (
            <AppointmentRow 
              key={appointment.apptid} 
              apptid={appointment.apptid} 
              pxid={appointment.pxid}  
              doctorid={appointment.doctorid}  
              clinicid={appointment.clinicid}  
              type={appointment.type}  
              virtual={appointment.virtual}  
              status={appointment.status}  
              QueueDate={appointment.QueueDate}  
              StartTime={appointment.StartTime}  
              EndTime={appointment.EndTime}  
              RegionName={appointment.RegionName}  
              Province={appointment.Province}  
              Island={appointment.Island}  
              
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
