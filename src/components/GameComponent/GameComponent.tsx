import {useEffect} from 'react';

import './gameComponent.scss';

interface GameComponentProps {
    gameConfig: Phaser.Types.Core.GameConfig,
    sceneList: (typeof Phaser.Scene)[],
}

export default function GameComponent(props: GameComponentProps) {
    const config = props.gameConfig;

    //You could potentially include logic here to ensure the component only renders once the game has loaded, etc
    //I didn't do that though
    useEffect(() => {
        let game = new Phaser.Game(config);
        //add scenes to game
        props.sceneList.forEach((sceneClass) => {
            const sceneKey = sceneClass.name;
            game.scene.add(sceneKey, sceneClass);
        });
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