
import { PrismaClient } from '@prisma/client';


interface CheckConnectionProps{
    url?: string,
    label?: string
}
const CheckConnection = async({url, label}: CheckConnectionProps)=> {
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  try {
    await prisma.$connect();
    console.log(`${label} connected successfully.`);
    // Perform any additional checks or queries here if needed
  } catch (error: any) {
    console.error(`${label} connection failed: ${error.message}`);
    return 1;
  }
  return 0;
}

export default CheckConnection;