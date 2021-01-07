import React, { useState } from "react"

export const ProductContext = React.createContext()

export const ProductProvider = (props) => {
    const [products, setProducts] = useState([{user:{user:{first_name: ""}}, category:{label:""}}])  
    const [product, setProduct] = useState({user:{user:{}}})

    const getProducts = () => {
        return fetch("http://localhost:8000/products" , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
            .then(setProducts)
    }

    const getProductById = (id) => {
        return fetch(`http://localhost:8000/products/${id}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",
            }
          })
            .then(res => res.json())
    }

    const getProductByUser = (userId) => {
        return fetch(`http://localhost:8000/products?user_id=${userId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",   
            }
           
          })
            .then(res => res.json())
    }

    const getProductByGroup = (groupId) => {
        return fetch(`http://localhost:8000/products?category_id=${groupId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            //.then(setProducts)
    }

    const getProductByFamily = (familyId) => {
        return fetch(`http://localhost:8000/products?category_id=${familyId}` , {
            headers: {
              Authorization: `Token ${localStorage.getItem("scentsible_user_id")}`,
              "Content-Type": "application/json",   
            }
          })
            .then(res => res.json())
            //.then(setProducts)
    }

    const addProduct = product => {
        return fetch("http://localhost:8000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
              },
            body: JSON.stringify(product)
        })
           .then(res => res.json())     
    }

    const updateProduct = product => {
        return fetch(`http://localhost:8000/products/${product.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`
            },
            body: JSON.stringify(product)
        })
            .then(getProducts)
    }

    const deleteProduct = (productId) => {
        return fetch(`http://localhost:8000/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("scentsible_user_id")}`,
            },
        body: JSON.stringify(productId)
        })
            .then(getProducts)
    }


    return (
        <ProductContext.Provider value={{
            product, setProduct, products, addProduct, getProducts, setProducts,
            getProductById, updateProduct, getProductByUser, getProductByGroup, getProductByFamily, 
            deleteProduct   
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}