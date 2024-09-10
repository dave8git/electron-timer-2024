import React from 'react';
import { render } from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60; 
    return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }


  const startTimer = (timeValue, status) => {
    setStatus(status);
    setTime(timeValue);
    const interval = setInterval(function () {
      setTime(prevTime => {
        if(prevTime === 1) {
          clearInterval(interval);
          if(status === 'work') {
            setStatus('rest');
            startTimer(10, 'rest');
          } else {
            setStatus('work');
            startTimer(20, 'work');
          }
          
        }
        return prevTime - 1;
      });
      
    }, 1000);
  } 
   

 
 
  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  }

  const stopApp = () => {
    window.close();
  }

  return (
    <div>
      <h1>Protect your eyes</h1>
      { status === 'off' && (<div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>)}
      {status === 'work' && (<img src="./images/work.png" />)}
      {status === 'rest' && (<img src="./images/rest.png" />)}
      {status !== 'off' && (<div className="timer">
        {formatTime(time)}
      </div>)}
      {status === 'off' && (<button className="btn" onClick={() => startTimer(1200, 'work')}>Start</button>)}
      {status !== 'off' && (<button className="btn" onClick={stopTimer}>Stop</button>)}
      <button className="btn btn-close" onClick={stopApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
