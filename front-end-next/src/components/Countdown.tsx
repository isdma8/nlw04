import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.scss';

import { CountdownContext } from '../contexts/CountdownContext';



export function Countdown() {

    const {
        seconds, 
        minutes, 
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext);


    //maneira como dados sao visualizados

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //nos vamos dividir por exemplo 25 em '2' e '5' com o split mas como podemos ter apenas '5' nao podemos dividir entao usamos o padstart que verifica se a nossa string tem 2 caracteres e se nao tiver colocar um 0 mas à esquerda e por isso ser o padstart
    //o split devolve array entao podemos desestruturar esse array

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    


    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>

            </div>

            {hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) :
                (
                    <>
                        {isActive ? (

                            <button type="button"
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                onClick={resetCountdown}

                            >
                                Abandonar um ciclo
                            </button>
                        ) :
                            (
                                <button type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountdown}

                                >
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )
            }



        </div>
    );
}