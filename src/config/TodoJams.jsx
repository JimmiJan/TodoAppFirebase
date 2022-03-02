import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from './firebase'
const TodoJams = () => {
    const [input,setinput]= useState("")
    const [todo, setTodo]= useState([])
    const [refresh,setrefresh] =useState(false)
   
    useEffect(async ()=>{
        const dbref = collection(db,"Todos")
        const data = await getDocs(dbref)
        let getData =[]
        data.forEach((doc)=>{
            getData.push({key:doc.id , data:doc.data().todo})
        })
        
        setTodo(getData)
    }, [refresh])

    const Add =async ()=>{
        const dbref = collection(db,"Todos")
        // console.log(dbref)
        console.log(input)

        try {
            const data = await addDoc(dbref, {
                todo:input
            })
               setrefresh(!refresh)      
            console.log(data)
            
        } catch (error) {
            console.log(error)
        }
        setinput(" ")
    }


    const add= async (key)=>{
        console.log(key)
        const dbref = doc(db,"Todos", key)
        const update = prompt("New Todo")
        const obj ={
            todo:update
        }
        try {
            const data = await setDoc(dbref,obj)
            console.log(data)
            setrefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    }
    const del =async (key)=>{
        const dbref = doc(db,"Todos",key)

        try {
            const datares = await deleteDoc(dbref)
            console.log(datares)
            setrefresh(!refresh)
        } catch (error) {
             console.log(error)
        }
    }
  return (
    <div>
        <h1>
            Todo App
        </h1>
        <div>
            <input type="text" value={input} placeholder='Enter Name' onChange={(e)=>setinput(e.target.value)} />
            <div>
                <button onClick={Add}>Add</button>
                <button>Delete</button>
            </div>
            <div>
                
                {todo.map((val,index)=>{
                    return(
                        <ul key={index}>
                            <li>{val.todo}</li>
                            <button onClick={()=>add(val.key)}>Edit</button>
                            <button  onClick={()=>del(val.key)} >Dlete</button>

                        </ul>
                    )
                }
                
                )}
            </div>
        </div>
      
    </div>
  )
}

export default TodoJams
