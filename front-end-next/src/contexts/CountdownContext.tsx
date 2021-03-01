import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;


export function CountdownProvider({children}: CountdownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);

    const [isActive, setIsActive] = useState(false);

    const [hasFinished, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60); //arredonda valor para baixo para ficar sempre valor redondo

    const seconds = time % 60; //resto da divisao, ou seja resto que nao coube nos minutos

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout); //estou a cancelar a execução de um timeout ou setinterval se usa-se aqui para o terminar imediantamente quando carrego no botao
        setIsActive(false);
        sethasFinished(false);
        setTime(25 * 60); //voltar ao valor inicial
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000); //executar uma função depois de 1 segundo
        } else if (isActive && time == 0) {
            sethasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }

    }, [isActive, time])
    
    return (
        <CountdownContext.Provider 
            value={{
                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    );
}