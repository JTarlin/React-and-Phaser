import GameComponent from '../../components/GameComponent/GameComponent';

import config from '../../games/game2/config';

export default function Game2Page() {
    return (
        <div>
            <h1>Game 2</h1>
            <GameComponent gameConfig={config}></GameComponent>
        </div>
    )
}