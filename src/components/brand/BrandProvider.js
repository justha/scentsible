//Module to handle all Brand data manipulation
import React, { useState } from "react"

export const BrandContext = React.createContext()

export const BrandProvider = (props) => {
  const [brands, setBrands] = useState([])

  const getBrands = () => {
    return fetch("http://localhost:8000/brands", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setBrands)
  }

  return (
    <BrandContext.Provider value={{
        brands, getBrands
      }}
    >
      {props.children}
    </BrandContext.Provider>
  )
}
