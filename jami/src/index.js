import React from 'react';
import { render } from 'react-dom'
import kuva from '../public/test.jpg'

const Home = () => <div>
    Jummijammi!
    <img style={{ width: '10em' }} src={kuva}></img>
</div>

const refresh = () => render(
    <Home/>,
    document.getElementById('jami'),
)

refresh()

if (module.hot) {
    module.hot.accept()
}