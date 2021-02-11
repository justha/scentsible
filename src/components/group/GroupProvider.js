//Module to handle all Group data manipulation
import React, { useState } from "react"

export const GroupContext = React.createContext()

export const GroupProvider = (props) => {
  const [groups, setGroups] = useState([])
  const [ selectedGroupId, setSelectedGroupId ] = useState(0)


  const getGroups = () => {
    return fetch("http://localhost:8000/groups", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setGroups)
  }

  return (
    <GroupContext.Provider value={{
        groups, getGroups,
        selectedGroupId, setSelectedGroupId
      }}
    >
      {props.children}
    </GroupContext.Provider>
  )
}
