import React from 'react';
interface appointmentProps{
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

  
const AppointmentRow: React.FC<appointmentProps> = ({ 
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
    Island
 }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-wrap gap-4">
      <div className="w-full md:w-1/3">
        <p className="font-bold">Appointment ID:</p>
        <p>{apptid}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Patient ID:</p>
        <p>{pxid}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Doctor ID:</p>
        <p>{doctorid}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Clinic ID:</p>
        <p>{clinicid}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Type:</p>
        <p>{type}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Virtual:</p>
        <p>{virtual}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Status:</p>
        <p>{status}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Queue Date:</p>
        <p>{QueueDate?.toString()}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Start Time:</p>
        <p>{StartTime?.toString()}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">End Time:</p>
        <p>{EndTime?.toString()}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Region Name:</p>
        <p>{RegionName}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Province:</p>
        <p>{Province}</p>
      </div>
      <div className="w-full md:w-1/3">
        <p className="font-bold">Island:</p>
        <p>{Island}</p>
      </div>
    </div>
  );
};

export default AppointmentRow;
