import GameComponent from '../../components/GameComponent/GameComponent';

import {config, scenes} from '../../games/game2/config';

export default function Game2Page() {
    return (
        <div>
            <h1>Game 2</h1>
            <p>Now this one is more of a game! Avoid red boxes and collect coins. I think the best score I get was 80? You can probably do better!</p>
            <GameComponent gameConfig={config} sceneList={scenes}></GameComponent>
        </div>
    )
}