// import { async } from '@firebase/util'
import { addDoc, collection, deleteDoc, deleteField, doc, getDocs, updateDoc, } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from "./firebase"

const TodoApp = () => {

    const [input, setinput] = useState("")
    const [todo, setTodo] = useState([])
    const [refresh, setrefresh] = useState(false)



    useEffect(async () => {
        const dbfref = collection(db, "Todos")
        const date = await getDocs(dbfref)
        let getTodo = []
        date.forEach((doc) => {
            // console.log(doc)
            getTodo.push({ key: doc.id, todo: doc.data().todo})
        })
        setTodo(getTodo)


    }, [refresh])



    //   for Add Button
    const Add = async () => {
        // console.log(input)
        const dbref = collection(db, "Todos")
        try {
            const upref = await addDoc(dbref, {
                Todo: input,
            })
            setrefresh(!refresh)
            // console.log(upref)
        } catch (error) {
            console.log(error)
        }

        setinput("")

    }


  const Update= async (key)=>{
      console.log(key)
      const dbfref = doc(db ,"Todos",key)
      const editvalue= prompt("Enter New Todo")
    const obj ={
        todo:editvalue
    }      
      try {
          const updateResponse  =await updateDoc(dbfref,obj)
          console.log(updateResponse)
          setrefresh(!refresh)
      } catch (error) {
          console.log(error)
      }
  }


 const Delete=async (key)=>{
    console.log(key)
    const dbfref = doc(db ,"Todos",key)
    // const editvalue= prompt("Enter New Todo")
//   const obj ={
//       todo:editvalue
//   }      
    try {
        const updateResponse  =await deleteDoc(dbfref)
        console.log(updateResponse)
        setrefresh(!refresh)
    } catch (error) {
        console.log(error)
    }
 }

const dlete= async ()=>{
    // console.log(todo)
    // setTodo([])
    // const dfref = await collection(db , "Todos" ).deleteField("Todos")
    // const obj = {
    //     todo: deleteField()
    // }
    // try {
    //     const Dele = await deleteDoc(dfref , obj )
    //     setrefresh (!refresh)
    // } catch (error) {
    //     console.log(error)
    // }
}


    return (
        <div>


            <div>
                <input type="text" value={input} placeholder='Add Todo' onChange={(e) => setinput(e.target.value)} />
                <div>
                    <button onClick={Add} className=''>Add</button>
                    <button onClick={dlete} >Delete</button>

                </div>
            </div>
            <div>
                {/* <ul>
                    {todo.map((val, index) => {
                        return val.todo !== "" ?(
                        <div key={index}>

                            <li> {val.todo} </li>
                            <div>
                                <button>Edit</button>
                                <button>Del</button>
                            </div>
                        </div> ) :null;

                    })}
                </ul> */}


                {/* <h1>{input}</h1> */}
                <div>
                    {todo.map((val, index, array) => {
                        return <ul key={index}>
                            <li>
                                {val.todo}
                            </li>
                            <div>
                            <button onClick={()=>Update(val.key)}>Edit</button>
                                <button onClick={()=>Delete(val.key)}>Del</button>
                            </div>
                        </ul>
                    })}
                </div>
            </div>




        </div>
    )
}

export default TodoApp
