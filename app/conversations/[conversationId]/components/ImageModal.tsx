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

    const handleClick = () => {
        window.open(src!, '_blank');
    };

    if(!src) {
        return null;
    }
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="
            w-96
            h-96" 
            onClick={handleClick}
            >
                <Image
                    alt="img" 
                    src={src}
                    className="object-cover hover:scale-105 transition ease-in-out hover:cursor-pointer" 
                    fill
                /> 
              
            </div>
        </Modal>
    )
}   

export default ImageModal;
