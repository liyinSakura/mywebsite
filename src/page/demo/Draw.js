// const socket = require('socket.io')('http://localhost:8000');
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import App from '../containers/App';

const socket = io.connect(process.env.SOCKET_URL);
socket.on('message', msg => console.log(msg));
const DOMNode = document.getElementById('renderTarget');

export default () => {

    return (

            <SocketProvider socket={socket}>
                <App/>
            </SocketProvider>

    );

}