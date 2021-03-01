import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import styles from '../styles/pages/Home.module.scss';

import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

import {GetServerSideProps} from 'next';
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted} 
    >
    <div className={styles.container}>
      <Head>
        <title>Inicio | move.it</title>
      </Head>

      <ExperienceBar />

    <CountdownProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />

          </div>

        </section>
        </CountdownProvider>

    </div>
    </ChallengesProvider>

  )
}


export const getServerSideProps: GetServerSideProps = async(ctx) => { // Tudo o que ta aqui executa no servidor Node e nao no Browser, tudo o que colocarmos em cima executa no browser
  //imaginemos que a apagina acima é um blog e tenho pedidos de requisição à API do titulo e descrição de cada post, os indexadores, crawlers, google etc
  //nao vao esperar que os dados sejam buscados e apresentados, eles vai indexar sem essa informação dai i NextJS vem resolver isso, aqui nos fazemos a requisição
  //e será mostrado acima apenas quando tudo estiver apresentavel SEO, faz a requisição e passa a atreaves das props para cima, o que acontece assim é
  //que o browser aguarda este pedido ao backend e so depois se interessa pelos dados apresentados acima
  //Os crawlers como por padrao ficam a aguardar as respostas dos servidores, entao so vai indexar a pagina acim quando aqui terminar
  //ctx contexto
  //GetServerSideProps tipo da função

  //chamada à API

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return{
    props: {//conveto todas para number porque vem como string
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}