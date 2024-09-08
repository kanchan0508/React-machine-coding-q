import { useState } from 'react';
import data from './data.json';

function App() {
  const [showIndex, setShowIndex] = useState(null); 

  const toggleAccordion = (index) => {
    setShowIndex(showIndex === index ? null : index);
  };
 
  return (

    <div className='w-[50%] ml-[25%] border'>
      <h1 className='text-black text-3xl ml-[15%] mb-5'>React Questions ans Answers</h1>
      {data.map((item, i) => (
        <div key={i} className='w-[90%] h-[20%] p-5 mt-4 border ml-[5%]  bg-zinc-300 shadow-md '>
          <h3 className='text-xl flex'><button className='mr-[10%] text-2xl text-red-600 w-7 h-7 bg-white rounded-full' onClick={() => toggleAccordion(i)} > {showIndex === i ? '-' : '+'}</button>{item.question}</h3>
          { showIndex === i && (
            <p>{item.answer}</p>
          )}
        </div>
      ))}
    </div>

  );
}

export default App;
