import './App.css';
import '@twa-dev/sdk';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

function App() {
    const { connected } = useTonConnect();
    const { value, address, sendIncrement, sendDecrement } = useCounterContract();

    return (
        <div className='App'>
            <div className='Container'>
                <TonConnectButton />

                <div className='Card'>
                    <b>Counter Address</b>
                    <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
                </div>

                <div className='Card'>
                    <b>Counter Value</b>
                    <div>{value ?? 'Loading...'}</div>
                </div>

                <div className='button-increment'>
                    <a
                        className={`Button ${connected ? 'Active' : 'Disabled'}`}
                        onClick={() => {
                            sendIncrement();
                        }}
                    >
                        Increment
                    </a>
                </div>

                <div className='button-decrement'>
                    <a
                        className={`Button ${connected ? 'Active' : 'Disabled'}`}
                        onClick={() => {
                            sendDecrement();
                        }}
                    >
                        Decrement
                    </a>
                </div>
            </div>
        </div>
    );
}

export default App