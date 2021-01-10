import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { ProductContext } from "./ProductProvider"


export const ProductList = ({ props }) => {
    
    const { products, getProducts, deleteProduct } = useContext(ProductContext)
    
    const history = useHistory()
    const [ arrayOfProducts, setArrayOfProducts ] = useState([]) 
    
    
    useEffect(() => {
        getProducts()
    }, [])
    
    
    useEffect(() => {
        setArrayOfProducts(products);
    }, [products])
    
    
    const renderList = (arrayOfProducts) => {
        return (
            arrayOfProducts.map(product => {
            return (   
                <>
                    <article className="container__card">                        
                        <section key={`product--${product.id}`} className="product">
                            <div className="product__brand">{product.brand.name}</div>
                            <div className="product__name">{product.name}</div>
                            <div className="product__family">{product.family.name}</div>
                            <div className="product__group">{product.group.name}</div>
                            {product.currentuser === true
                            ? (
                                <div>
                                    <button className="button--editProduct" as={Link} onClick={() => {history.push({ pathname: `/products/edit/${product.id}` })}}>
                                        ✐ Edit Product
                                    </button>
                
                                    <button className="button--deleteProduct" as={Link} onClick={() => {deleteProduct(`${product.id}`)}}> 
                                        Delete Product
                                    </button>
                                </div>
                                )
                            : ""}
                        </section>

                        <section className="container__ratings">      
                                              
                            <div>My Rating 
                                <button className="button--addProductreview" as={Link} onClick={() => {history.push({ pathname: `/productreviews/create/${product.id}` })}}>
                                    Rate
                                </button>
                                <button className="button--editProductreview" as={Link} onClick={() => {history.push({ pathname: `/productreviews/edit/${product.id}` })}}>
                                    Edit
                                </button>
                            </div>

                            <div>Avg Rating </div>

                        </section>

                    </article>
                    <br></br>
                </>             
            )
            })
        )
    }
    
    
    return (
        <>
            <div>            
                <header className="products__header"> 
                    <h2>All Products</h2> 

                    <button 
                        className="button--addProduct" 
                        as={Link} 
                        onClick={() => {history.push({ pathname: "/products/create" })}}
                    >
                        + New Product
                    </button>

                </header>
                            
                {products !== []
                ? renderList(arrayOfProducts)
                : ""}

            </div>
        </>
    )
}
  