import React, { useContext, useEffect} from "react"
import { ProductContext } from "./ProductProvider"
import { Link } from "react-router-dom"

export const ProductList = ({ arrOfProducts }) => {

    const { products, getProducts} = useContext(ProductContext)

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <div>            
                <header className="products__header"> 
                    <h2>All Products</h2> 

                    <button
                    className="button--addProduct"
                    as={Link}
                    to={{ pathname: `products/create` }}
                    >
                        + New Product
                    </button>
                </header>

                {
                    products.map(product => {
                        return <article className="container__card">                        
                            <section key={`product--${product.id}`} className="product">
                            <div className="product__brand">{product.brand.name}</div>
                            <div className="product__name">{product.name}</div>
                            <div className="product__group">{product.group.name}</div>
                            <div className="product__family">{product.family.name}</div>
                            <div className="product__brand">{product.brand.name}</div>         
                            <br></br>
                            </section>
                        </article>
                    })
                }

            </div>
        </>
    )
}
  