import { useState,useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";

function App() {
  const [task, setTask] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [theme,setTheme] = useState("light");

  //f12 -> application -> local storage -> ขวาบนข้างฟันเฟืองเพื่อดู key
  useEffect(()=>{
    localStorage.setItem("data",JSON.stringify(task));
  },[task])

  function deleteTask(id) {
    // const result = task.filter((item)=>item.id!==id);
    // setTask(result);

    //ใช้แบบด้านล่างเลยก็ได้ ประหยัดบรรทัด
    setTask(task.filter((item) => item.id !== id)); //filter return เป็น array ก้อนใหม่อยู่แล้ว เลยไม่ต้องสร้างตัวแปรใหม่เพื่อสร้าง arr ก้อนใหม่
    //เอาทุก id ที่ไม่ใช่(ไม่เท่ากับ) id ที่ส่งมา
  }

  const [priority, setPriority] = useState("second");
  const [title, setTitle] = useState("");
  const addTask = (e) => {
    e.preventDefault();
    if (!title) {
      alert("โปรดกรอกข้อมูล");
    } else if (editId) {
      //update
      //map เพื่อดึงก้อน obj ที่มี id ที่ต้องการมาแก้ไขค่า
      const updateTask = task.map((item) => {//task ที่เอามา map ค่าจะเหมือนเดิม แต่การ map จะ return arr ก้อนใหม่เข้า updateTask
        if (item.id === editId) {
          return { ...item, title: title, priority:priority }; //title ใหม่ จะไปทับของเดิม
        }
        return item;
        //เหตุผลที่ใส่ return item; ด้านบน เพราะ เช่น ส่ง id แรกเข้ามา ถ้าไม่ตรงเงื่อนไข if, จะทำการ return กลับเข้า variable updateTask เป็นค่าเดิม, แต่ถ้าไม่ใส่ return item; จะ return เข้า variable updateTask เป็น undefined
        //ถ้าไม่ใส่ return item; ค่าที่รับเข้ามาที่ไม่ตรงกับเงื่อนไข if จะถูก return เข้า variable updateTask เป็น undefined, เราใส่ return item; เพื่อรองรับหากไม่ตรงกับเงื่อนไข if ให้มาทำบรรทัดนี้ คือการ return ค่าเดิมที่รับเข้ามา ไปสู่ variable updateTask
        //เช่น map เลข 1-7 เงื่อนไข if คือ ถ้าเป็นเลข 5 จะเปลี่ยนให้เป็น 777, การทำงานพอรับค่าเลข 1-4 เข้ามา ไม่ตรงเงื่อนไข ถ้ามี return item; จะ return เลขเดิมไปเข้า variable updateTask พอเลข 5 เข้าเงื่อนไข ก็จะ return เป็น 777 เลข 6-7 ไม่เข้าเงื่อนไข ก็จะ return เลขเดิมออกไป
        //จากด้านบน ถ้าหากไม่มี return item; เลข 1-4 และ 6-7 ที่ไม่เข้าเงื่อนไข if จะถูก return เข้า variable updateTask เป็น undefined แต่เลข 5 ที่เข้าเงื่อนไข จะ return ออกไปเป็น 777
        //หากไม่มี return item; จะได้ผลลัพธ์เป็น [undefined,undefined,undefined,undefined,777,undefined,undefined]
        //map รับเข้า ส่งออกจะเท่ากัน
      });
      setTask(updateTask);
      setTitle('');
      setPriority('second');
      setEditId(null);
    } else {
      //add
      const newData = {
        id: Math.floor(Math.random() * 1000),
        title: title,
        priority: priority,
      };
      setTask([...task, newData]);
      setTitle("");
    }
  };

  const [editId, setEditId] = useState(null);
  function editTask(id) {
    setEditId(id);
    const edit = task.find((item) => item.id === id);
    setTitle(edit.title);
  }

  const addFormObj = {
    title,
    setTitle,
    addTask,
    priority,
    setPriority,
    editId,
  };
  return (
    <div className={"app "+theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm {...addFormObj} />
        <section>
          {task.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;


/*
const a = [1,2,3,4,5,6,7]

const bcn = a.map((item)=>{
  if(item===7){
    item = 777
    return item;
  }
  return item
})

console.log(bcn)
//1,2,3,,5,6,777
*/