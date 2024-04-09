'use client';

import { useCallback } from "react";
import Container from "../Container";
import useOpenModal from "@/app/hooks/useOpenModal";


const Navbar = () => {
    const openModal = useOpenModal();
    const onPost = useCallback(()=>{
        openModal.onOpen();
    }, [openModal])
    return (
        <div className ="fixed w-full bg-white z-10 shadow-sm">
            <div className="
                py-4
                border-b-[1px]
            ">
            <Container>
                <div
                    onClick={onPost}
                    className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Insert stuff in to database
                </div>
                

                
            </Container>
            </div>
        </div>
    )
}
export default Navbar