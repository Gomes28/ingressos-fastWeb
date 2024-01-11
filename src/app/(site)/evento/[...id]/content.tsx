'use client'

import { useState } from "react";

export function ContentEvent({content}: {content: string}) {
    const [show, setShow] = useState(false);

    function createMarkup(content: string) {
        return { __html: content };
    }

    return (
        <div className="mt-6 flex flex-col items-start relative">
            <h4 className="font-semibold text-xl text-gray-3">Descrição do evento</h4>
            <div className="flex flex-col relative w-full">
                <div className={`content-notice my-6 ${!show && 'h-[148px]'} overflow-hidden`} dangerouslySetInnerHTML={createMarkup(content)} />
                {!show && <div className="h-28 absolute z-50 bottom-0 left-0 right-0" style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.80) 50%, rgba(255, 255, 255, 1) 100%)' }}></div>}
            </div>
            <button className="text-base font-semibold text-primary border border-primary px-6 h-10 rounded-md hover:shadow-md transition-all" onClick={() => setShow(!show)}>{show ? 'Ver menos' : 'Ver mais'}</button>
        </div>
    )
}