import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"


export const ProductList = ({ props }) => {
    
    const { products, getProducts, deleteProduct } = useContext(ProductContext)
    const { brands, getBrands } = useContext(BrandContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)
    
    const history = useHistory()
    const [ arrayOfProducts, setArrayOfProducts ] = useState([]) 
    
    
    useEffect(() => {
        getProducts()
        .then(getGroups)
        .then(getBrands)
        .then(getFamilies)
    }, [])
    
    
    useEffect(() => {
        setArrayOfProducts(products);
    }, [products])
    
    
    const renderList = (arrayOfProducts) => {
        return (
            arrayOfProducts.map(product => {
            return <article className="container__card">                        
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
                            Delete
                        </button>
                    </div>
                    )
                : ""}
                <br></br>
                </section>
            </article>
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
  