import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Todos = () => {
const [todos, setTodos] =useState([]);
const [newTodo, setNewTodo] =useState("");
const [page, setPage] =useState(1);
  const [totalCOunt, setTotalCOunt]= useState(0);
  const [limit, setLimit] = useState(5);

const saveInfo =() =>{

  fetch("http://localhost:8080/todos", {
    method:"POST",
    headers:{
      "content-type":"application/json",
    },
    body: JSON.stringify({
      value:newTodo,
      isCompleted:false,
    }),
  })

  .then((r) => r.json())
  .then((d) => {
    setTodos([...todos,d])
    setNewTodo("");
  });
};


useEffect (() =>{
    
const getTodo = async () =>{
  let r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`);
  setTodos(r.data);
  setTotalCOunt(Number(r.headers["x-total-count"]));
};
getTodo();
},[page, limit])
    
  return (
    <div>Todos
      <div>
        <input value={newTodo}
        onChange= {({target}) =>setNewTodo(target.value)} />
        <button onClick={saveInfo}>+</button>
        {
          todos.map((todo) =>(
            <div key={todo.id}>{todo.value}</div>
          ))
        }
      </div>
      <button disabled={page <=1} onClick={() => {
         if (page>1) {
          setPage(page-1)
        }}
      }
     >{"<"}</button>
      <select onChange={ (e) => setLimit(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <button
      disabled={totalCOunt < page*5 } 
      onClick={() => setPage(page+1)}>{">"}</button>
    </div>
  )
}

export default Todos