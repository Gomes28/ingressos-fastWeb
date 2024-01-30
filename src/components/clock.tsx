'use client'

import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

export function Clock({ expiredAt, text, onFinish, onStart }: {expiredAt, text?: string, onFinish?: () => void, onStart?: () => void}) {
    const [tempoRestante, setTempoRestante] = useState({
        minutos: 0,
        segundos: 0,
    });

    useEffect(() => {
        const [day, month, year, hours, minutes, seconds] = expiredAt.split(/[\s/:]/);
        const expirationDate = new Date(year < 2000 ? +`20${year}` : year, month - 1, day, hours, minutes, seconds);
        const currentDate = new Date();
        const timeDifference = expirationDate.getTime() - currentDate.getTime();
        const initialMinutes = Math.floor(timeDifference / (1000 * 60));
        const initialSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        if(initialMinutes < 0) {
            setTempoRestante({
                minutos: 0,
                segundos: 0
            });
            {onFinish && onFinish()}
        } else {
            {onStart && onStart()}
            setTempoRestante({
                minutos: initialMinutes,
                segundos: initialSeconds
            });
        }
    }, [expiredAt]);

    useEffect(() => {
        const interval = setInterval(() => {
            if ((tempoRestante.minutos === 0 && tempoRestante.segundos === 0) || tempoRestante.minutos < 0) {
                clearInterval(interval);
                onFinish();
            } else {
                setTempoRestante((prevState) => {
                    if (prevState.segundos === 0) {
                        return {
                            minutos: prevState.minutos - 1,
                            segundos: 59,
                        };
                    } else {
                        return {
                            ...prevState,
                            segundos: prevState.segundos - 1,
                        };
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [tempoRestante]);

    return (
        <div className="flex items-center justify-between bg-gray-100 px-3 rounded-md gap-4 h-16 mt-6">
            <div className="flex gap-4 items-center">
                <FiClock size={24} className="text-primary" />
                {tempoRestante && <div className="w-20 text-lg font-semibold"><span>{tempoRestante?.minutos < 10 ? '0' : ''}</span><span>{tempoRestante?.minutos}</span>:<span>{tempoRestante?.segundos < 10 ? '0' : ''}</span><span>{tempoRestante?.segundos}</span></div>}
            </div>
            <div className="flex-1 flex justify-end">
                <p className="text-xs">
                    {text ?? 'Após este tempo, os ingressos serão liberados para venda novamente.'}
                </p>
            </div>
        </div>
    );
}
