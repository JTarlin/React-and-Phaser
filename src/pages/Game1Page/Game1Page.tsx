import GameComponent from '../../components/GameComponent/GameComponent';

import {config, scenes} from '../../games/game1/config';

export default function Game1Page() {
    return (
        <div>
            <h1>Game 1</h1>
            <p>What is this? Not really a game at the moment, just a test thing. Use the arrow keys to move it around.</p>
            <GameComponent gameConfig={config} sceneList={scenes}></GameComponent>
        </div>
    )
}