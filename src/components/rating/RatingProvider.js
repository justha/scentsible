//Module to handle all Rating data manipulation
import React, { useState } from "react"

export const RatingContext = React.createContext()

export const RatingProvider = (props) => {
  const [ratings, setRatings] = useState([])

  const getRatings = () => {
    return fetch("http://localhost:8000/ratings", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setRatings)
  }

  return (
    <RatingContext.Provider value={{
        ratings, getRatings
      }}
    >
      {props.children}
    </RatingContext.Provider>
  )
}
