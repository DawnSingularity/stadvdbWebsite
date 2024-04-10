export const dynamic = "force-dynamic"


import Image from "next/image";
import { PrismaClient } from '@prisma/client';
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
