import { createRef, useState } from 'react';
import './TimeCalc.css';
import peggy from './peggy/time-arithmetics'

export function TimeCalc() {
  const [error, setError] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const formulaRef = createRef<HTMLInputElement>();

  const calc = () => {
    const formula = formulaRef.current?.value ?? ''
    console.log({formula});
    try {
      const result: number = peggy.parse(formula);
      console.log({result});
      setResults([`${formula} = ${Math.floor(result/3600)}h${Math.floor(result/60)%60}m${result%60}s`, ...results]);
    }
    catch (e) {
      console.log(e);
      setError(String(e));
    }
  }

  return (
    <div className="App">
      <h1>時間計算</h1>
      <div className="App-formula" >
        <input className="App-formula-input" placeholder="(1h10m - 2m10s) * 2" ref={formulaRef} onChange={() => setError('')}></input>
        <button className="App-formula-button" onClick={calc}>計算</button>
      </div>
      <p className="App-error">{error}</p>
      <div className="App-result">
        {results.map((result, i) => (
          <p key={results.length - i}>{result}</p>
        ))}
      </div>
      <div>
        <h2>Tips</h2>
        <p>
          <span className="App-tips-var">[X]</span>h
          <span className="App-tips-var">[Y]</span>m
          <span className="App-tips-var">[Z]</span>s
          : X時間Y分Z秒
        </p>
      </div>
    </div>
  );
}
