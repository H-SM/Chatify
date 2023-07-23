"use client";
import Modal from "@/app/components/Modal";
import Image from "next/image";

 

interface ImageModalProps { 
    src?: string | null,
    isOpen?: boolean,
    onClose: () => void,
}

const ImageModal : React.FC<ImageModalProps> = ({
    src, 
    isOpen,
    onClose
}) => { 
    if(!src) {
        return null;
    }
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="
            w-80
            h-80">
                <a href={src} target= "_blank" >
                <Image
                    alt="img" 
                    src={src}
                    className="object-cover" 
                    fill
                    // onClick={}
                /> 
                </a>
            </div>
        </Modal>
    )
}   

export default ImageModal;
