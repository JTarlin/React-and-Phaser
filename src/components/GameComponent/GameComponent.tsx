import {useEffect} from 'react';

interface GameComponentProps {
    gameConfig: Phaser.Types.Core.GameConfig,
}

export default function GameComponent(props: GameComponentProps) {
    const config = props.gameConfig;

    //You could potentially include logic here to ensure the component only renders once the game has loaded, etc
    //I didn't do that though
    useEffect(() => {
        let game = new Phaser.Game(config)
        // If you don't do this, you get duplicates of the canvas piling up.
        return () => {
          game.destroy(true)
        }
    },[])

    return (
        // Make sure to set the parent id in the config file of the phaser game!
        <div id='gameParent'/>
    )
}