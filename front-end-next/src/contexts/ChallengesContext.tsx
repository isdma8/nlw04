import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';



interface Challenge {
    type: 'body' | 'eye'; //é uma string mas como so temos la dentro um destes 2 tipos colocamos direto
    description: string;
    amount: number;
}

interface ChallengesContextData{
    level: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number; 
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{//type ou props é igual é so para tipar o children e nao ficar como any
    children: ReactNode; //aceita qualquer elemento filho
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData); //passo valor inicial do tipo que fizemos assim para quem chamar saber os tipos

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);//se nao existir uso 1
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1)* 4, 2);


    useEffect(() => {
        Notification.requestPermission();//permisão para mostrar notificações

    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currentExperience, challengesCompleted]);



    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length); //numero aliatorio entre 0 e 1 mas se multiplicar pelos que temos da o numero aleatorio dentro dos que temos e depois é so arredondar para baixo
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🔥', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount; //let vem de let it change, quer dizer que é uma variavel que pode receber um novo valor no futuro

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel; //o que fica para o nivel seguinte
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted+1);
    } 

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience,
                experienceToNextLevel, 
                challengesCompleted, 
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}