//Module to handle all Family data manipulation
import React, { useState } from "react"

export const FamilyContext = React.createContext()

export const FamilyProvider = (props) => {
  const [families, setFamilies] = useState([])

  const getFamilies = () => {
    return fetch("http://localhost:8000/families", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setFamilies)
  }

  return (
    <FamilyContext.Provider value={{
        families, getFamilies
      }}
    >
      {props.children}
    </FamilyContext.Provider>
  )
}
