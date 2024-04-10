'use client';

import { useCallback, useState } from "react";
import Container from "../Container";
import useOpenModal from "@/app/hooks/useOpenModal";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const [inputValue, setInputValue] = useState(""); 
    const handleSubmit = () => {
        // Navigate to the main page with the input value as a query parameter
        router.push(`/?apptid=${inputValue}`);
    };
    const openModal = useOpenModal();
    
    const onPost = useCallback(()=>{
        openModal.onOpen();
    }, [openModal])
    return (
        <div className ="w-full bg-white z-10 shadow-sm">
            <div className="
                py-4
                border-b-[1px]
            ">
            <Container>
                <div
                    onClick={onPost}
                    className="hidden md:block bg-blue-500 text-white text-sm font-semibold py-3 px-4 rounded-full hover:bg-blue-600 transition cursor-pointer"
                    >
                    Insert stuff into database
                </div>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Update the input value when changed
                        placeholder="Enter value..."
                        className="px-3 py-1 rounded border"
                    />
                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
                
                

                
            </Container>
            </div>
        </div>
    )
}
export default Navbar