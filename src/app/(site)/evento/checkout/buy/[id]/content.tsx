'use client'

import { Accordion } from "@/components/accordion";
import { ButtonPrimary } from "@/components/buttons/button-primary"
import { Clock } from "@/components/clock";
import { useState } from "react";
import { FiCheck, FiCheckCircle, FiClock, FiCode, FiCodepen, FiCopy, FiHeadphones, FiSmartphone } from "react-icons/fi"
import { LuQrCode } from "react-icons/lu";

import QRCode from "react-qr-code"

export default function BuyContent({ params, buy }) {
    const [copy, setCopy] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const copyText = (value: string) => {
        setCopy(true);
        navigator.clipboard.writeText(value);
    }

    if (isExpired) {
        return (
            <div className="w-full max-w-8xl mx-auto py-8">
                <span className="px-8 py-2 rounded-md bg-gray-100 text-gray-700 font-medium">Esse meio de pagamento expirou.</span>
            </div>
        )
    }

    return (
        <div className="w-full max-w-8xl mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4">Pedido iniciado</h1>
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <span>Nº DO PEDIDO</span>
                    <strong>{params.id}</strong>
                </div>
                {buy.payment.status == 'pending' && <div className="flex gap-2 items-center text-primary font-medium">
                    <FiClock size={24} />
                    <span>Aguardando pagamento</span>
                </div>}
            </div>
            <div className="w-full p-4 bg-zinc-100 flex flex-col items-center gap-6 mt-8 rounded-lg">
                <h4 className="text-xl font-medium">Agora só falta concluir o Pix!</h4>
                <div className="p-4 bg-white w-full rounded-md flex gap-6">
                    <div className="w-[380px] h-fit border flex flex-col items-center justify-end gap-4 rounded-md p-4">
                        {isValid &&
                            <>
                                <QRCode value={buy.payment.pix.qr_code} />
                                <p className="text-sm flex w-full flex-1 break-all">{buy.payment.pix.qr_code}</p>
                            </>
                        }
                        <ButtonPrimary title={copy ? "Código copiado" : "Copiar código"} onClick={() => copyText(buy.payment.pix.qr_code)} Icon={copy ? FiCheck : FiCopy} full={true} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <strong>Como pagar?</strong>
                        <ul className="flex flex-col gap-4 mt-4">
                            <li className="flex gap-2 items-center">
                                <FiSmartphone size={24} />
                                <p>Abra o app do seu banco ou carteira digital e <strong>escolha pagar com Pix</strong></p>
                            </li>
                            <li className="flex gap-2 items-start">
                                <span className="mt-1">
                                    <LuQrCode size={24} />
                                </span>
                                <p>Selecione a opção <strong>pagar com QR Code e escaneie o código</strong> ao lado ou <strong>copie o código e selecione a opção Pix Copia e Cola..</strong></p>
                            </li>
                            <li className="flex gap-2 items-center">
                                <FiCheckCircle size={24} />
                                <p>Confirme as informações e finalize a compra</p>
                            </li>
                        </ul>
                        <div className="border-t mt-6 pt-4 flex justify-center">
                            <Clock
                                expiredAt={`${new Date(buy.payment.pix.expiration_date_qrcode).toLocaleDateString()} ${new Date(buy.payment.pix.expiration_date_qrcode).toLocaleTimeString()}`}
                                text="Após este tempo, o pix não será mais válido."
                                onFinish={() => setIsExpired(true)}
                                onStart={() => setIsValid(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
                <h4>Dúvidas frequentes sobre o Pix</h4>
                <Accordion title="Já realizei minha compra via Pix, por quê ainda está pendente?">
                    <div className="flex flex-col gap-4">
                        <p>Quando você efetua uma compra via Pix, tem 15 minutos para finalizar o pagamento e, durante esse período, seu pedido fica pendente enquanto aguardamos a confirmação do pagamento por parte do banco. Essa confirmação pode demorar alguns minutos.</p>
                        <p>Caso o banco não nos confirme o recebimento, o pedido é automaticamente cancelado e encaminharemos uma mensagem para te avisar sobre o status. Os ingressos selecionados por você não ficam mai</p>
                    </div>
                </Accordion>
                <Accordion title="Como faço para reemitir o QR Code do Pix?">
                    <p><strong>No momento, não é possível reemitir o QR Code do Pix.</strong> Para gerar um novo código, é preciso que você faça uma nova compra.</p>
                </Accordion>
            </div>
        </div>
    )
}