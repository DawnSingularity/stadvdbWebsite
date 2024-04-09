export const dynamic = "force-dynamic"


import Image from "next/image";
import { PrismaClient } from '@prisma/client';
import Container from "./components/Container";
import CheckConnection from "../app/components/CheckConnection"




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
  
  return (
    <Container>
      this is the master node luzon

      this is the slave 1 node 
      
      this is the slave 2

    </Container>
  );
}
