
import React,{ useState} from 'react';

export const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if(!title || !desc )
    {
      alert("Title or Discription cannot be blank")
    }
    else{
    props.addTodo(title,desc);
    setTitle("");
    setDesc("");}
    
  }
  return (
    <div className = "container my-3 ">
        <div className="heading text-center" ><h3>ADD A TODO</h3></div>
        
        <form onSubmit = {submit}>
  <div className="row mb-3">
    <label htmlFor="title" className="col-sm-2 col-form-label">Todo Title</label>
    <div className="col-sm-10">
      <input type="text"value = {title} onChange={(e)=>{
        setTitle(e.target.value)
      }} className="form-control" id="title"/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="desc" className="col-sm-2 col-form-label">Todo Discription</label>
    <div className="col-sm-10">
      <input type="text" value = {desc} onChange={(e)=>{
        setDesc(e.target.value) }} className="form-control" id="desc"/>
    </div>
  </div>
  
  <button type="submit" className="btn  btn-sm btn-success">ADD TODO</button>
</form>
    </div>
  )
}
