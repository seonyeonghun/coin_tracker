import React, { Fragment, useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState("");
  const onChange = (e) => setMoney(e.target.value);  
  
  const onSubmit = (e) => {
    e.preventDefault();
    setMoney("");
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then(json => {
      //console.log(json);
      setCoins(json);
      setLoading(false);
    });
  })
  return (
    <Fragment>
      <div className='App'>
        <h1>the coins! (total: {loading ? 0 : coins.length})</h1>
        {loading ? <strong>loading...</strong> : null}
        <form onSubmit={onSubmit}>
          <input type="number" value={money} onChange={onChange} placeholder="how much you have by KRW?" />
          <button>change USD to KRW</button>
        </form>
        <ul>
          {coins.map(coin => <li key={coin.id}>{coin.name} ({coin.symbol}) : ${money ? coin.quotes.USD.price : coin.quotes.USD.price / money}</li>)}  
        </ul>
      </div>
    </Fragment>
  );
}

export default App;
