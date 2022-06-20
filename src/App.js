import { useContext, useRef } from 'react';
import './App.css';
import { Context } from './Context';

const Form=()=>{
  const {state,dispatch}=useContext(Context)
  const RefInput = useRef();
  const HandleChange = (e) => {
    dispatch({ type: 'onChangeInput', payload: e.target.value });
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (state.value) {
      dispatch({
        type: 'addTolist',
        payload: { id: new Date().getTime(), text: state.value },
      });
    }
    dispatch({ type: 'onChangeInput', payload: null });
    RefInput.current.value = null;
  };

  return(
    <form onSubmit={HandleSubmit}>
    <input ref={RefInput} onChange={HandleChange}></input>
    <button>Add Todo </button>
  </form>

  )
}

const Iterator=()=>{
  const {state,dispatch}=useContext(Context)
  const removeItem = (id) => {
    dispatch({ type: 'removItem', payload: id });
  };
  return(
    <ul>
    {state.items.map((item, index) => {
      return (
        <div key={index}>
          <li style={{ display: 'inline', marginRight: '15px' }}>
            {item.text}
          </li>
          <button onClick={() => removeItem(item.id)}>X</button>
        </div>
      );
    })}
  </ul>
  )
}



function App() {

  return (
    <div className="App">
      <header className="App-header">
         <Form/>
        <br />
         <Iterator/>
      </header>
    </div>
  );
}
export default App;
