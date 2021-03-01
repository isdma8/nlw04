import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.scss';

export function ExperienceBar(){

    const {currentExperience, experienceToNextLevel}= useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    //podia ser div mas semanticamente como é o elemento mais acima usamos header

    //Aqui colocamos estilo inline porque é um valor que irá variar consoante o utilizador avança niveis
    return(
        <header className={styles.experienceBar}> 
            <span>0 xp</span>
            <div>
                    <div style={{width: `${percentToNextLevel}%` }}></div>  

                    <span className={styles.currentExperience}style={{left: `${percentToNextLevel}%` /*deslocar da esquerda para direita em 50%*/}}>
                        {currentExperience} xp
                    </span>
            </div>
            <span>{experienceToNextLevel} xp</span>

        </header>
    );
}
