'use client';

import Link from "next/link";
import clsx from "clsx";

interface MobileItemProps { 
    label : string, 
    icon: any,
    href: string,
    onClick?: () => void,
    active?: boolean,
}

const MobileItem : React.FC<MobileItemProps>= ({
    label,
    icon: Icon,
    href,
    onClick,
    active
}) => {

    const handleClick = ( ) => {
        if(onClick) {
            return onClick();
        }
    };
    return  (
        <Link href={href} onClick={handleClick} className={clsx(`
            group
            flex
            gap-x-3
            p-4
            w-full
            text-sm
            justify-center
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100
        `,
        active && 'bg-gray-100 text-black'
        )}>  
        <Icon className="h-6 w-6"/>
        </Link>
    );
}
export default MobileItem;