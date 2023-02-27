import GameComponent from '../../components/GameComponent/GameComponent';

import {config, scenes} from '../../games/game2/config';

export default function Game2Page() {
    return (
        <div>
            <h1>Game 2</h1>
            <GameComponent gameConfig={config} sceneList={scenes}></GameComponent>
        </div>
    )
}