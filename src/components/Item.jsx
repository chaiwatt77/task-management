//npm install react-icons --save
import { BsTrash } from "react-icons/bs"
import { BiEdit } from "react-icons/bi"

import "./Item.css"
export default function Item(props){
    const {data:data,deleteTask,editTask} = props;
    return (
        <div className={`list-item ${data.priority}`}>
            <p className="title">{data.title}</p>
            <div className="button-container">
                <BsTrash className="btn" onClick={()=>{deleteTask(data.id)}}/>
                <BiEdit className="btn" onClick={()=>editTask(props.data.id)}/>
            </div>
        </div>
        
    )
}