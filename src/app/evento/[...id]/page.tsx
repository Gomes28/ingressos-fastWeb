'use client'

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TicketsTable } from "@/components/sections/tickets-table";
import { maskPrice } from "@/helpers/mask";
import { events } from "@/utils/events";
import { payments } from "@/utils/payments";
import Image from "next/image";
import { useState } from "react";
import { FiClock, FiLock, FiMapPin } from "react-icons/fi";
import { IoTicketOutline } from "react-icons/io5";

const content = `
<div class="raw style-scope event-page">
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">Bem-vinde à mistura do Festival de Verão Salvador!</strong></span><br class="style-scope event-page"><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Somos o maior festival do verão brasileiro. Acontecemos na Terra do dendê, onde pulsa a diversidade e onde o</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">carnaval é o maior do mundo! Por aqui, a intensidade é enorme e em 2024 vamos viver de novo esses</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">encontros no&nbsp;<strong class="style-scope event-page">Festival de Verão Salvador</strong>.</span><br class="style-scope event-page"><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">No line up, encontros com shows nunca vistos em nenhum outro palco no Brasil. Já o local, o Parque de</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Exposições. Os dias 27 e 28 de janeiro virão com muita experiência e musicalidade para brindar em alto estilo a</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">estação mais quente do ano.</span><br class="style-scope event-page"><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Te esperamos!<br class="style-scope event-page"><br class="style-scope event-page"></span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">Conheça as áreas do Festival de Verão Salvador 2024:<br class="style-scope event-page"><br class="style-scope event-page"></strong></span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">Arena</strong>&nbsp;-&nbsp;Aqui você pode vibrar com os encontros nos palcos Cais, Ponte e Rua, além de vivenciar ativações e experiências inesquecíveis:</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Roda Gigante vendo tudo do alto;</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Praça de Alimentação</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso Front Stage do palco Ponte e Palco Rua</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso passarela do Palco Cais, vendo seu artista de pertinho</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Ativações de marca com muita diversão</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">&nbsp;</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">Camarote Vip</strong>&nbsp;- Área exclusiva para quem deseja mais conforto, com vista privilegiada para o palco Cais, experiências exclusivas e mais:</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso à Arena</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Front Stage exclusivo Palco Cais</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso ao palco Ponte e Palco Rua (pela Arena)</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Banheiros Climatizados</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Praça de alimentação exclusiva</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Lounge Relax</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Palco Dj</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">FV Lounge By Elo</strong>&nbsp;- Essa é a área premium do Festival com serviços exclusivos:</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Front Stage dos palcos Cais e Ponte.</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso ao palco Rua (pela Arena)</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Sistema All Inclusive: assinado por chef renomado a ser divulgado em breve. Bebidas: whisky, gin premium, vodka, energético, tônica, cerveja, água e refrigerante</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Estacionamento e entrada exclusivos</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Acesso à Arena e Camarote Vip</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Palco DJ Camarote Vip</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Banheiros Climatizados</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">- Lounge Relax</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">&nbsp;</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><strong class="style-scope event-page">SERVIÇO</strong></span><br class="style-scope event-page"><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Festival de Verão Salvador 2024</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Quando: 27 e 28/01/2024</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Onde: Parque de Exposições de Salvador</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Classificação: 16 anos. Menores de 16 anos poderão ter acesso acompanhados pelos pais ou responsável legal.</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Abertura dos portões: 15h00</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Vendas On Line:&nbsp;<a href="http://www.sympla.com.br/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.sympla.com.br/&amp;source=gmail&amp;ust=1698441694077000&amp;usg=AOvVaw06Xlq72ZbnZdPj3QaTKGkO" class="style-scope event-page">Sympla</a></span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Vendas Físicas: Lojas South no Shopping da Bahia, Salvador Shopping, Shopping Center Lapa e Shopping Paralela.</span></p>
<p style="font-weight: 400;" class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">Meia-entrada: Além de estudantes, outros segmentos têm direito à meia-entrada, segundo a lei 12.933/2013. Em</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page">ambos os casos, é obrigatória a apresentação de documentos comprobatórios. Mais informações, acesse</span><br class="style-scope event-page"><span style="font-size: 14pt;" class="style-scope event-page"><a href="https://bileto.sympla.com.br/meia-entrada/bahia.html" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://bileto.sympla.com.br/meia-entrada/bahia.html&amp;source=gmail&amp;ust=1698441694077000&amp;usg=AOvVaw1qD-9yfYqzLzRGafdkfXoU" class="style-scope event-page">https://bileto.sympla.com.br/meia-entrada/bahia.html</a></span></p></div>
`

export default function EventPage({ params }: { params: { id: Array<string> } }) {
    const [show, setShow] = useState(false);
    const event = events.find(item => item.id == +params.id[params.id.length - 1]);

    function createMarkup(content: string) {
        return { __html: content };
    }

    return (
        <main className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col">
                <div className="h-[208px] lg:h-[400px] relative overflow-hidden mb-6 lg:mb-12">
                    {event?.image && <Image src={event.image} alt="" fill />}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-3xl"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0">
                        <div className="w-full max-w-8xl mx-auto h-full flex items-center justify-center">
                            {event?.image && <img src={event.image} alt="" className="h-full" />}
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-8xl mx-auto max-md:px-3 flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-3">{event?.name}</h2>
                    <div className="flex gap-4 mt-4">
                        <span className="flex mt-1 text-gray-4">
                            <FiClock />
                        </span>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-3">Sábado e Domingo às 15h00</span>
                            <span className="text-sm font-light text-gray-4">27 a 28 de Janeiro</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <span className="flex mt-1 text-gray-4">
                            <FiMapPin />
                        </span>
                        <span className="text-base font-medium text-gray-3">{event?.address}</span>
                    </div>
                    <div className="w-96 max-w-full border rounded-md mt-6">
                        <div className="flex gap-4 p-4">
                            <span className="mt-1">
                                <IoTicketOutline />
                            </span>
                            <div className="flex flex-col">
                                <span>Ingressos entre <strong>R$ 80,00 e R$ 1710,00</strong></span>
                                <span className="text-xs text-green-600 font-medium">Pague em até 12x ou no pix</span>
                            </div>
                        </div>
                        <a href="#tickets" className="h-12 w-full bg-secondary text-white font-semibold rounded-b-md flex items-center justify-center">Comprar Ingressos</a>
                    </div>
                    <div className="mt-6 flex flex-col items-start relative">
                        <h4 className="font-semibold text-xl text-gray-3">Descrição do evento</h4>
                        <div className="flex flex-col relative w-full">
                            <div className={`content-notice my-6 ${!show && 'h-[148px]'} overflow-hidden`} dangerouslySetInnerHTML={createMarkup(content)} />
                            {!show && <div className="h-28 absolute z-50 bottom-0 left-0 right-0" style={{ background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.80) 50%, rgba(255, 255, 255, 1) 100%)' }}></div>}
                        </div>
                        <button className="text-base font-semibold text-primary border border-primary px-6 h-10 rounded-md hover:shadow-md transition-all" onClick={() => setShow(!show)}>{show ? 'Ver menos' : 'Ver mais'}</button>
                    </div>
                </div>
                <TicketsTable tickets={event.tickets} event={event} />
            </div>
            <Footer />
        </main>
    )
}