
import styled from 'styled-components'


const ContainerConteudo = styled.div`
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.12);
    

    padding: 3em 5em;

    .container-form {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding: 2em;
    }

    .box-sala {
        display: flex;
        flex-direction: column;
    }

    .box-sala > div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        margin: .2em;
    }

    .label {
        font-weight: 700;
        font-size: 1.2em;
        width: 4em;
    }


    .box-mensagem {
        display: flex;
        flex-direction: column;
    }

    .btn-enviar {
        align-self: flex-end;
    }



    .container-chat {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        padding: 0em 2em 2em 2em;
        height: 28em;
    }

    .chat-atualizar {
        width: 1em;
        align-self: flex-end;
        margin: .4em;
        cursor: pointer;
    }

    .chat-atualizar:hover {
        transform: rotate(360deg);
        transition: 0.5s;
    }

    .chat {
        display: flex;
        flex-direction: column;
        background: rgba(192, 65, 224, 0.19);
        border-radius: 3px;

        padding: 1.5em;
        height: 100%;

        overflow-y: auto;
    }

    .chat::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #3E006F;
    }

    .chat::-webkit-scrollbar
    {
        width: 7px;
        background-color: #3E006F;
        border-radius: 10px;
    }

    .chat::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #CBCBCB;
    }


    .chat-remover > img {
        cursor: pointer;
    }

    .chat-message {
        display: flex;
        flex-direction: row;

        align-items: center;

        font-size: .9em;
        margin: .4em .2em;
    }

    .chat-message > div {
        margin: 0em .2em;
    }


    @media (max-width: 400px) {
        flex-direction: column;
        padding: .2em;
        
        .container-form       { padding: 1em; justify-content: flex-start; }
        .container-form > div { margin-bottom: 2em; }
        .box-sala > div                 { justify-content: flex-start; }
        .box-sala > div:nth-of-type(3)  { flex-direction: column; }
        
        .chat            { overflow-y: unset; height: auto; }
        .container-chat  { height: auto; padding: 1em; }
        .chat-message    { flex-direction: column; margin: 1em 0em }
        
        input  { width: 100%; }
        button { width: 100%; border-radius: .3em; height: 2.5em; margin: .3em 0em; }
        
        .label { width: 4em; }
    }

`

export { ContainerConteudo }
