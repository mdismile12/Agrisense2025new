import React from 'react'
import {Todoitems} from './Todoitems'

export const Todos = (props) => {
  return (
    <div className = "container">
            <h3 className ="text-center my10">Todos List</h3>
            {/* props.{todos} */}
            {props.todos.length===0?"NO LIST TO DISPLAY":
            props.todos.map((todo) =>{
              return (
                <>
              <Todoitems todo={todo} key={todo.sno}onDelete={props.onDelete}/><hr/>
              </>

              )
            })}
            
            


    </div>
  )
}
