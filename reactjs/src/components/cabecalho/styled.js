
import styled from 'styled-components'

const Barra = styled.div`
    background: linear-gradient(180deg, #BA9D4C -10.17%, #F3D991 115.25%);
    width: 4px;
    height: 3em;
    margin: 0em 1em;
    border-radius: 1em;

    @media (max-width: 400px) {
        display: none;
    }
`


const ContainerCabecalho = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .cabecalho {
        display: flex;
        flex-direction: row;

        align-items: center;
        margin-bottom: 3em;
    }

    .cabecalho {
        display: flex;
        flex-direction: row;

        align-items: center;

    }

    .titulo {
        font: 700 2.2em Montserrat;
    }

    .sair {
        background-color: #50B4BF;
        color: white;

        padding: 0.8em;

        border: none;
        border-radius: 0.8em;
    }

    .sair:hover {
        background-color: #299ca8;
        cursor: pointer;
        box-shadow: 2px 2px black;
        transition: 0.5s;
    }


    @media (max-width: 400px) {
        flex-direction: column;
    }
`




export { Barra, ContainerCabecalho }