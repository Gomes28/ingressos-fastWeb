import { Accordion } from "@/components/accordion";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const faq = [
    {
        pergunta: "Como faço para comprar ingressos em seu site?",
        resposta: "Para comprar ingressos, basta navegar até a página do evento desejado e seguir as instruções de compra. Selecione a quantidade desejada de ingressos e prossiga para o pagamento."
    },
    {
        pergunta: "Quais métodos de pagamento são aceitos?",
        resposta: "Aceitamos várias formas de pagamento, incluindo cartão de crédito, débito e PayPal. Certifique-se de selecionar a opção desejada durante o processo de checkout."
    },
    {
        pergunta: "Posso cancelar ou reembolsar meu ingresso?",
        resposta: "A política de cancelamento e reembolso pode variar de acordo com o evento. Recomendamos verificar os termos e condições específicos do evento antes de realizar a compra. Em caso de dúvidas, entre em contato com nosso suporte."
    },
    {
        pergunta: "Como faço para receber meus ingressos após a compra?",
        resposta: "Após a conclusão da compra, você receberá uma confirmação por e-mail, juntamente com os detalhes do ingresso. Você também pode acessar seus ingressos diretamente em sua conta no nosso site."
    },
    {
        pergunta: "O que fazer se eu perder meu ingresso?",
        resposta: "Não se preocupe! Você pode acessar sua conta no nosso site e baixar novamente seus ingressos. Além disso, recomendamos entrar em contato com nosso suporte para obter assistência adicional."
    },
    {
        pergunta: "Posso transferir meus ingressos para outra pessoa?",
        resposta: "Em alguns casos, é possível transferir ingressos para outra pessoa. Verifique os termos e condições específicos do evento ou entre em contato com nosso suporte para obter mais informações sobre a política de transferência de ingressos."
    },
];

export default function HelpCenter() {
    return (
        <div className="flex flex-col gap-8">
            <div className="h-[200px] w-full relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/80 px-3">
                    <div className="text-white h-full flex flex-col justify-between w-full max-w-8xl mx-auto py-6">
                        <ul className="text-sm flex items-center gap-4">
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                                <FiChevronRight />
                            </li>
                            <li>
                                <Link href={'/meus-pedidos'}>Central de Ajuda</Link>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-2 max-w-3xl">
                            <h1 className="text-3xl font-semibold">Central de Ajuda para Compra de Ingressos</h1>
                            <p>Encontre Respostas para Suas Dúvidas sobre Nossos Eventos e Ingressos</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-8xl mx-auto pb-6">
                {faq.map((item, index) => (
                    <Accordion title={item.pergunta} key={index}>
                        <p>{item.resposta}</p>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}