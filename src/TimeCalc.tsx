import { useEffect, useRef, useState } from 'react';
import './TimeCalc.css';
import peggy from './peggy/time-arithmetics'

type Result = {
  formula: string,
  result: string,
}

const result2Time = (result: number) => {
  return `${Math.floor(result/3600)}h${Math.floor(result/60)%60}m${result%60}s`;
}

export function TimeCalc() {
  const [formula, setFormula] = useState('')
  const [error, setError] = useState('');
  const [history, setHistory] = useState<Result[]>([]);
  let initialize = true;

  useEffect(() => {
    if (initialize) {
      initialize = false;

      const data = localStorage.getItem("history");
      if (data && data !== "[]") {
        setHistory(JSON.parse(data));
      } else {
        setHistory([{ formula: "(1h10m - 2m10s) * 2", result: "2h15m40s" }]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const calc = () => {
    console.log({formula});
    try {
      const result: number = peggy.parse(formula);
      setHistory([{ formula, result: result2Time(result) }, ...history]);
    }
    catch (e) {
      console.log(e);
      setError(String(e));
    }
  }

  const deleteHistory = (index: number) => {
    setHistory(history.filter((_, i) => index !== i));
  }

  return (
    <div className="App">
      <h1>時間計算</h1>
      <div className="App-formula" >
        <input className="App-formula-input" placeholder="(1h10m - 2m10s) * 2" value={formula}
          onChange={(e) => { setFormula(e.target.value); setError('') }}
        />
        <button className="App-formula-button" onClick={calc}>計算</button>
      </div>
      <p className="App-error">{error}</p>
      <div>
        <h2>Results</h2>
        <p>※ ボタンクリックでコピー</p>
        {history.map(({formula, result}, i) => (
          <div key={history.length - i} className="App-history">
            <button className="App-history-delete" onClick={() => deleteHistory(i)}>削除</button>
            <button className="App-history-button" onClick={() => setFormula(formula)}>{ formula }</button>
            =
            <button className="App-history-button" onClick={() => setFormula(result)}>{ result }</button>
          </div>
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
