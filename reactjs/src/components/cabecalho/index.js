
import { Barra, ContainerCabecalho } from './styled'

import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom';

export default function Cabecalho() {

    const navigation = useHistory();

    const logoOff = () => {
        Cookies.remove('usuario-logado');
        navigation.push('/')
    }

    return (
        <ContainerCabecalho>
            <div className="cabecalho">
                <img src="/assets/images/logo-monkchat.png" alt="" />
                <Barra />
                <div className="titulo"> MonkChat </div>
            </div>
            <button onClick={logoOff} className="sair">Sair</button>
        </ContainerCabecalho>
    )
}
