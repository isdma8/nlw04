import '../styles/global.scss';

import {ChallengesProvider} from '../contexts/ChallengesContext';
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';

//Todos os elementos dentro do provider vao ter acesso ao contexto que criamos, toda a aplicação tem o meu app entoa toda a app tem acesso
//recebe um value que é o que é que eu quero enviar de informação

function MyApp({ Component, pageProps }) {

  return (
        <Component {...pageProps} />
  )
}

export default MyApp
