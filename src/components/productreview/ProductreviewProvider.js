import React, { useState } from "react"

export const ProductreviewContext = React.createContext()

export const ProductreviewProvider = (props) => {  
    const [ productreviews, setProductreviews ] = useState([{user:{user:{first_name: ""}}, product:{name:""}}]) 
    const [ productreview, setProductreview ] = useState({user:{user:{}}})

    const getProductreviews = () => {
        return fetch("http://localhost:8000/productreviews" , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
            .then(setProductreviews)
    }

    const getProductreviewById = (id) => {
        return fetch(`http://localhost:8000/productreviews/${id}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
    }

    const getProductreviewsByUser = (userId) => {
        return fetch(`http://localhost:8000/productreviews?user_id=${userId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",   
            }
           
          })
            .then(res => res.json())
    }

    const getProductreviewsByProduct = (productId) => {
        return fetch(`http://localhost:8000/productreviews?product_id=${productId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
    }

    const addProductreview = productreview => {
        return fetch("http://localhost:8000/productreviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
              },
            body: JSON.stringify(productreview)
        })
           .then(res => res.json())     
    }

    const updateProductreview = productreview => {
        return fetch(`http://localhost:8000/productreviews/${productreview.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
            },
            body: JSON.stringify(productreview)
        })
            .then(getProductreviews)
    }

    const deleteProductreview = (productreviewId) => {
        return fetch(`http://localhost:8000/productreviews/${productreviewId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`,
            },
        body: JSON.stringify(productreviewId)
        })
            .then(getProductreviews)
    }


    return (
        <ProductreviewContext.Provider value={{
            productreview, setProductreview, productreviews, addProductreview, getProductreviews, setProductreviews,
            getProductreviewById, updateProductreview, getProductreviewsByUser, getProductreviewsByProduct, 
            deleteProductreview
        }}>
            {props.children}
        </ProductreviewContext.Provider>
    )  
}
