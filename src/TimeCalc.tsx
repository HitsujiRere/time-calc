import { createRef, useState } from 'react';
import './TimeCalc.css';
import peggy from './peggy/time-arithmetics'

export function TimeCalc() {
  const [results, setResults] = useState<string[]>([]);

  const formulaRef = createRef<HTMLInputElement>();

  const calc = () => {
    const formula = formulaRef.current?.value ?? ''
    console.log({formula});
    const result: number = peggy.parse(formula);
    console.log({result});
    setResults([`${formula} = ${Math.floor(result/3600)}h${Math.floor(result/60)%60}m${result%60}s`, ...results]);
  }

  return (
    <div className="App">
      <div className="App-formula" >
        <input className="App-formula-input" placeholder="(1h10m - 2m10s) * 2" ref={formulaRef}></input>
        <button className="App-formula-button" onClick={calc}>計算</button>
      </div>
      <div className="App-result">
        {results.map((result, i) => (
          <p key={results.length - i}>{result}</p>
        ))}
      </div>
    </div>
  );
}
