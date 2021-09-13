import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingBar from 'react-top-loading-bar'
 
import { ContainerConteudo } from './conteudo.styled'
import { ChatButton, ChatInput, ChatTextArea } from '../../components/outros/inputs'

import { useState, useRef } from 'react';

import Cookies from 'js-cookie'

import Api from '../../service/api';
import { useHistory } from 'react-router-dom';

const api = new Api();

function lerUsuarioLogado(navigation){
    let logado = Cookies.get('usuario-logado');
    if(logado == null){
        navigation.push('/');
        return null;
    }

    let usuarioLogado = JSON.parse(logado);
    return usuarioLogado;   
}

export default function Conteudo() {
    const navigation = useHistory();
    let usuarioLogado = lerUsuarioLogado(navigation) || {};

    const [idAlterar, setIdAlterar] = useState(0);
    const [chat, setChat] = useState([]);
    const [sala, setSala] = useState('');
    const [usu, setUsu] = useState(usuarioLogado.nm_usuario);
    const [msg, setMsg] = useState('');

    const loading = useRef(null);

    const validarResposta = (resp) => {
        if (!resp.erro)
            return true;
        toast.error(`${resp.erro}`);
        return false;
    }

    const carregarMensagens = async () => {
        loading.current.continuousStart();

        const mensagens = await api.listarMensagens(sala);
        if (validarResposta(mensagens))
            setChat(mensagens);

        loading.current.complete();
    }

    const enviarMensagem = async (event) => {
        if(event.type === "keypress" && (!event.ctrlKey || event.charCode !== 13))
            return;
        
        if(idAlterar > 0){
            const resp =  api.alterarMensagem(idAlterar, msg);
            if (!validarResposta(resp)) 
                return;
                    
            toast.success('🚀 Mensagem alterada!'); 
            await carregarMensagens();  
            setIdAlterar(0);
            setMsg('');    
        } else {
            const resp = await api.inserirMensagem(sala, usu, msg);
            if (!validarResposta(resp)) 
                return;
        
            toast.success('🚀 Mensagem enviada!');
            setMsg('');
        }
        
        await carregarMensagens(); 
    }

    const inserirUsuario = async () => {
        const resp = await api.inserirUsuario(usu);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('🚀 Usuário cadastrado!');
        await carregarMensagens();
    }

    const inserirSala = async () => {
        const resp = await api.inserirSala(sala);
        if (!validarResposta(resp)) 
            return;
        
        toast.dark('🚀 Sala cadastrada!');
        await carregarMensagens();
    }

    const remover = async (item) => {
        if(item.tb_usuario.nm_usuario !== usu){
            toast.error('Voçê não pode deletar mensagens de outro usuario!!')   
        } else{
            const r = await api.removerMensagem(item.id_chat);
            if(!validarResposta(r))
                return;

            toast.success("🚀 Mensagem Deletada!!");
            await carregarMensagens();
        }     
    }

    const alterar = async (item) => {
        if(item.tb_usuario.nm_usuario !== usu)
            toast.error('Voçê não pode alterar mensagens de outro usuario!!')
        else{
            setMsg(item.ds_mensagem);
            setIdAlterar(item.id_chat);
        } 
    }

    const alerta = () => {
        toast.warning('Em breve...')
    }
    
    return (
        <ContainerConteudo>
            <ToastContainer />
            <LoadingBar color="red" ref={loading} />
            <div className="container-form">
                <div className="box-sala">
                    <div>
                        <div className="label">Sala</div>
                        <ChatInput style={{ cursor: "text" }} value={sala} onChange={e => setSala(e.target.value)} />
                    </div>
                    <div>
                        <div className="label">Nick</div>
                        <ChatInput style={{ cursor: "text" }} value={usu} readOnly={true} />
                    </div>
                    <div>
                        <ChatButton onClick={inserirSala}> Criar </ChatButton>
                        <ChatButton onClick={carregarMensagens}> Entrar </ChatButton>
                    </div>
                </div>
                <div className="box-mensagem">
                    <div className="label">Mensagem</div>
                    <ChatTextArea style={{ cursor: "text" }} value={msg} onChange={e => setMsg(e.target.value)} onKeyPress={enviarMensagem} />
                    <ChatButton onClick={enviarMensagem} className="btn-enviar"> Enviar </ChatButton>
                </div>
            </div>
            
            <div className="container-chat">
                
                <img onClick={carregarMensagens}
                   className="chat-atualizar"
                         src="/assets/images/atualizar.png" alt="" />
                
                <div className="chat">
                    {chat.map(x =>
                        <div key={x.id_chat}>
                            <div className="chat-message">
                                <div className="chat-ban"> <img alt ="" onClick={alerta} src="/assets/images/removerUser.png" /> </div>
                                <div className="chat-alterar"> <img alt="" onClick={() => alterar(x)} src="/assets/images/editar.svg"/> </div>
                                <div className="chat-remover"> <img alt="" onClick={() => remover(x)} src="/assets/images/delete.svg"/> </div>
                                <div>({new Date(x.dt_mensagem.replace('z', '')).toLocaleTimeString()})</div>
                                <div><b>{x.tb_usuario.nm_usuario}</b> fala para <b>Todos</b>:</div>
                                <div> {x.ds_mensagem} </div>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </ContainerConteudo>
    )
}