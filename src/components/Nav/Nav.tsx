import {Link} from 'react-router-dom';

function Nav() {
    return(
        <nav>
            <ul>
                <li>
                    <Link to='/' >Home</Link>
                </li>
                <li>
                    <Link to='/1' >Game 1</Link>
                </li>
                <li>
                    <Link to='/2' >Game 2</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;