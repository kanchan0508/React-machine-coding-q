import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(null);


  useEffect(()=>{
    if (isRunning && (hour > 0 || minute > 0 || second > 0)) {
      const timer = setInterval(() => {
        updateTimer();
      }, 1000);
      setCountdownTimer(timer);
      return () => clearInterval(timer); 
    } else if (!isRunning) {
      clearInterval(countdownTimer);
    }
  }, [isRunning, hour, minute, second]);

  const updateTimer = () =>{
     if(second > 60) {
      setMinute((prev)=> prev + 1)
      setSecond((prev) => prev - 59);
     }
     
    if (minute > 60) {
      setHour((prev) => prev + 1);
      setMinute((prev) => prev - 60);
    }

    if (hour === 0 && minute === 0 && second === 0) {
      resetTimer();
    } else if (second > 0) {
      setSecond((prev) => prev - 1);
    } else if (minute > 0 && second === 0) {
      setSecond(59);
      setMinute((prev) => prev - 1);
    } else if (hour > 0 && minute === 0) {
      setMinute(60);
      setHour((prev) => prev - 1);
    }
  };
  
  const startTimer = () => {
    if (hour === 0 && minute === 0 && second === 0) return;
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
  };

  return (
    <div className='w-full h-full  '>
      <div className='ml-[30%] mt-[15%]'>
        <h1 className='text-2xl ml-[16%]'>Countdown Timer</h1>
        <div className='flex justify-between w-[40%] mt-[5%] ml-10 text-lg'>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
        <div className='flex justify-between mt-[5%] w-[38%] text-xl ml-10'>
        <input
          type="number"
      className='w-10'
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <input
          type="number"
          className='w-10'
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
        />
        <input
          type="number"
    className='w-10'
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        />

        </div>
        <div className='flex justify-between w-[30%] mt-[5%] ml-[8%]'>
          <button className='w-[80%]  mr-5 rounded-lg p-2 text-white bg-green-700' onClick={startTimer} > {isRunning ? "Pause" : "Start"}</button>
          <button  className='w-[80%] mr-5 rounded-lg p-2 text-white bg-orange-700' onClick={resetTimer}>Reset</button>
        </div>
      </div>

    </div>
  )
}

export default App
