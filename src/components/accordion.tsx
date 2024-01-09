'use client'

import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Props {
    title: string,
    children: any,
}

export function Accordion({ title, children }: Props) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    const handleOutsideClick = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex flex-col w-full h-fit rounded-md border" ref={ref}>
            <button className={`
                flex items-center justify-between 
                px-4 h-16 rounded-md 
                ${show && 'bg-gray-100'}
                hover:bg-gray-50 
                transition-colors font-medium
            `}
                onClick={() => setShow(!show)}
            >
                {title}
                {show ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            <div className={`
                ${show ? 'h-auto p-4' : 'h-0 overflow-hidden'}
                flex flex-col gap-4
            `}>
                {children}
            </div>
        </div>
    )
}