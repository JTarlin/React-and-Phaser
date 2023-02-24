import GameComponent from '../../components/GameComponent/GameComponent';

import config from '../../games/game1/config';

export default function Game1Page() {
    return (
        <div>
            <h1>Game 1</h1>
            <GameComponent gameConfig={config}></GameComponent>
        </div>
    )
}