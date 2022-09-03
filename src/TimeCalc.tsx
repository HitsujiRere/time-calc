import { createRef, useState } from 'react';
import './TimeCalc.css';
import peggy from './peggy/arithmetics'

export function TimeCalc() {
  const [results, setResults] = useState<string[]>([]);

  const formulaRef = createRef<HTMLInputElement>();

  const calc = () => {
    const formula = formulaRef.current?.value ?? ''
    console.log({formula});
    const result: string = peggy.parse(formula);
    console.log({result});
    setResults([`${formula} = ${result}`, ...results]);
  }

  return (
    <div className="App">
      <div className="App-formula" >
        <input className="App-formula-input" placeholder="3 * ( 5 - 3 )" ref={formulaRef}></input>
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
