//Module to handle all Note data manipulation
import React, { useState } from "react"

export const NoteContext = React.createContext()

export const NoteProvider = (props) => {
  const [notes, setNotes] = useState([])

  const getNotes = () => {
    return fetch("http://localhost:8000/notes", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setNotes)
  }

  return (
    <NoteContext.Provider value={{
        notes, getNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}
