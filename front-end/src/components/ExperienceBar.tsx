export function ExperienceBar(){

    //podia ser div mas semanticamente como é o elemento mais acima usamos header

    //Aqui colocamos estilo inline porque é um valor que irá variar consoante o utilizador avança niveis
    return(
        <header className="experience-bar"> 
            <span>8 xp</span>
            <div>
                    <div style={{width: '60%' }}></div>  

                    <span className="current-experience" style={{left: '50%' /*deslocar da esquerda para direita em 50%*/}}>
                        300 xp
                    </span>
            </div>
            <span>688 xp</span>

        </header>
    );
}
