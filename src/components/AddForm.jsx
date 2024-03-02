import "./AddForm.css";

export default function AddForm(props) {
  const {title:title,setTitle,addTask,priority,setPriority,editId} = props;
  return (
    <>
      <h2>แบบฟอร์มจัดการงาน</h2>
      <form onSubmit={addTask}>
        <div className="form-control">
          <input type="text" className="text-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
          <select value={priority} onChange={(e)=>setPriority(e.target.value)}>
            <option>first</option>
            <option>second</option>
          </select>
          <button type="submit" className="submit-btn">
            {editId ? "update": "add" }
          </button>
        </div>
      </form>
    </>
  );
}
