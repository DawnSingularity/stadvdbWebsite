'use client';

import React from 'react';
import Input from './inputs/input'; // Import your Input component
import { useRouter } from 'next/navigation';
import{
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import axios from "axios";
import {toast} from "react-hot-toast";
import { useMemo, useState } from "react";
import Modal from "./modals/Modal";
import useOpenModal from '../hooks/useOpenModal';
import CheckConnection from './CheckConnection';


const InputAppointments = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  const openModal = useOpenModal();


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState:{
        errors,
    },
    reset
} = useForm<FieldValues>({
    defaultValues:{
        pxid:'',
        doctorid:'',
        clinicid:'',
        type:'',
        virtual:'',
        status:'',
        QueueDate:'',
        StartTime:'',
        EndTime:'',
        RegionName:'',
        Province:'',
        Island:'',
        isolationLevel:'',
        disableMainNode:'',
        disableSlaveNode1:'',
        disableSlaveNode2:''
    }
})

const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    if(false){
        return;
    }
    setIsLoading(true);
    if(data.disableMainNode > 1){
        data.disableMainNode=0
    }
    if(data.disableSlaveNode1 > 1){
        data.disableSlaveNode1=0
    }
    if(data.disableSlaveNode2 > 1){
        data.disableSlaveNode2=0
    }



    axios.post('/api/MasterNode/Luzon', data)
    .then(()=>{
        toast.success("Added your post")
        router.refresh();
        reset();
        openModal.onClose();
    })
    .catch((error: any)=>{
        toast.error(error);
    })
    .finally(()=>{
        setIsLoading(false);
    })
}   


    let bodyContent=(
        <div className="flex flex-col gap-8">
            <Input 
                id="disableMainNode"
                label="disableMainNode"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="number"
                
            />

            <Input 
                id="disableSlaveNode1"
                label="disableSlaveNode1"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="number"
            />

            <Input 
                id="disableSlaveNode2"
                label="disableSlaveNode2"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="number"
            />
            <select
                id="isolationLevel"
                disabled={isLoading}
                {...register("isolationLevel", { required: true })} // Register the select input with react-hook-form
                className="p-2 border rounded-md" // Add any additional styles as needed
                required
            >
                <option value="" disabled selected>Select an isolationLevel</option>
                <option value="ReadUncommitted">ReadUncommitted</option>

                <option value="ReadCommitted">ReadCommitted</option>
                <option value="RepeatableRead">RepeatableRead</option>
                <option value="Serializable">Serializable</option>
            </select>

            <Input 
                id="pxid"
                label="pxid"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="doctorid"
                label="doctorid"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />


            <Input 
                id="clinicid"
                label="clinicid"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />


            <Input 
                id="type"
                label="type"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            

            <Input 
                id="virtual"
                label="virtual"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="status"
                label="status"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="QueueDate"
                label="QueueDate"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="datetime-local"
            />

            <Input 
                id="StartTime"
                label="StartTime"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="datetime-local"
            />

            <Input 
                id="EndTime"
                label="EndTime"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="datetime-local"
            />


            <Input 
                id="RegionName"
                label="RegionName"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Input 
                id="Province"
                label="Province"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <select 
                id="province"
                disabled={isLoading}
                {...register("Island", { required: true })} // Register the select input with react-hook-form
                className="p-2 border rounded-md"
                required
            >
                <option value="" disabled selected>Select a province</option>
                <option value="National Capital Region (NCR)" selected>National Capital Region (NCR)</option>
                <option value="Ilocos Region (Region I)">Ilocos Region (Region I)</option>
                <option value="Cordillera Administrative Region (CAR)">Cordillera Administrative Region (CAR)</option>
                <option value="Cagayan Valley (Region II)">Cagayan Valley (Region II)</option>
                <option value="Central Luzon (Region III)">Central Luzon (Region III)</option>
                <option value="CALABARZON (Region IV-A)">CALABARZON (Region IV-A)</option>
                <option value="MIMAROPA (Region IV-B)">MIMAROPA (Region IV-B)</option>
                <option value="Bicol Region (Region V)">Bicol Region (Region V)</option>
                <option value="Western Visayas (Region VI)">Western Visayas (Region VI)</option>
                <option value="Central Visayas (Region VII)">Central Visayas (Region VII)</option>
                <option value="Eastern Visayas (Region VIII)">Eastern Visayas (Region VIII)</option>
                <option value="Zamboanga Peninsula (Region IX)">Zamboanga Peninsula (Region IX)</option>
                <option value="Northern Mindanao (Region X)">Northern Mindanao (Region X)</option>
                <option value="Davao Region (Region XI)">Davao Region (Region XI)</option>
                <option value="SOCCSKSARGEN (Region XII)">SOCCSKSARGEN (Region XII)</option>
                <option value="CARAGA (Region XIII)">CARAGA (Region XIII)</option>
            </select>



            <select
                id="Island"
                disabled={isLoading}
                {...register("Island", { required: true })} // Register the select input with react-hook-form
                className="p-2 border rounded-md" // Add any additional styles as needed
                required
            >
                <option value="" disabled selected>Select an island</option>
                <option value="Luzon">Luzon</option>
                <option value="Visayas">Visayas</option>
                <option value="Mindanao">Mindanao</option>
            </select>
        </div>
    )
  return (
    <Modal 
        isOpen={openModal.isOpen}
        onClose={openModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title ="Input to appointment"
        actionLabel='Submit'
        body={bodyContent}
    />
  );
};

export default InputAppointments;
