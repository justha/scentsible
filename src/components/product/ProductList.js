import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { ProductContext } from "./ProductProvider"
import { ProductreviewContext } from "../productreview/ProductreviewProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"



export const ProductList = ({ props }) => {
    
    const { products, getProducts, deleteProduct, getProductsByGroup, getProductsByFamily } = useContext(ProductContext)
    const { productreviews, getProductreviews, deleteProductreview } = useContext(ProductreviewContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)
    
    const history = useHistory()
    const [ arrayOfProducts, setArrayOfProducts ] = useState([]) 
    
    
    useEffect(() => {
        getProducts()
        getGroups()
        getFamilies()
        getProductreviews()
    }, [])
    
    useEffect(() => {
        setArrayOfProducts(products);
    }, [products])
    
    //Upon changes to productreviews, gets products and re-sets array of products to refresh ProductList
    useEffect(() => {
        getProducts()
        setArrayOfProducts(products);
    }, [productreviews])

   
    const renderFilters = () => {
        return (
            <>
                <section> 
                    <div>View by Product Group</div>
                    <button className="button--filterGroup" as={Link} onClick={() => getProducts().then(setArrayOfProducts(products))} > ALL </button>
                    {groups.map(group => {return <button className="button--filterGroup" as={Link} value={group.id} 
                        onClick={(event) => {
                            const groupId = parseInt(event.target.value)
                            getProductsByGroup(groupId).then(setArrayOfProducts)}}
                        > {group.name} </button>})}
                </section>
                <br></br>

                <section> 
                    <div>View by Scent</div>
                    <button className="button--filterGroup" as={Link} onClick={() => getProducts().then(setArrayOfProducts(products))} > ALL </button>
                    {families.map(familiy => {return <button className="button--filterGroup" as={Link} value={familiy.id} 
                        onClick={(event) => {
                            const familyId = parseInt(event.target.value)
                            getProductsByFamily(familyId).then(setArrayOfProducts)}}
                        > {familiy.name} </button>})}
                </section>
            </>
        )
    }

    const renderList = (arrayOfProducts) => {
        return (
            arrayOfProducts.map(product => {
                let arrayOfReviews = []
                arrayOfReviews = productreviews.filter(pr => pr.product_id === product.id )

                const ratingCount = arrayOfReviews.length

                let ratingSum = 0
                arrayOfReviews.forEach(review => {ratingSum += review.rating_id})

                let ratingAvg = ""
                ratingCount !== 0
                ? (ratingAvg = ratingSum/ratingCount)
                : (ratingAvg = "Not Rated Yet")

                return (<>
                    <article className="container__card">                        
                        <section key={`product--${product.id}`} className="product">
                            <div className="product__brand">{product.brand.name}</div>
                            <div className="product__name">{product.name}</div>
                            <div className="product__family">{product.family.name}</div>
                            <div className="product__group">{product.group.name}</div>

                            {product.currentuser_created === true
                            ? (<div>
                                    <button className="button--editProduct" as={Link} onClick={() => {history.push({ pathname: `/products/edit/${product.id}` })}}> ✐ Edit Product </button>
                                    <button className="button--deleteProduct" as={Link} onClick={() => {deleteProduct(`${product.id}`)}}> Delete Product </button>
                                </div>)
                            : ""}
                        </section>


                        <section className="container__ratings">      
                            <div className="container__rating">Avg Rating 
                                {ratingAvg}
                            </div>

                            <div className="container__rating">My Rating 
                                {product.currentuser_productreview_id === null
                                    ? (<> <button className="button--addProductreview" as={Link} onClick={() => {history.push({ pathname: `/productreviews/create/${product.id}` })}}>Rate Now</button> </>)
                                    : (<> <div className="product__userrating">{product.currentuser_rating}</div>
                                        <button className="button--editProductreview" as={Link} onClick={() => {history.push({ pathname: `/productreviews/edit/${product.currentuser_productreview_id}` })}}> Edit Rating </button>
                                        <button className="button--deleteProductreview" as={Link} onClick={() => {deleteProductreview(`${product.currentuser_productreview_id}`)}}> Delete Rating </button> </>)}
                            </div>
                        </section>

                        <section>
                            <button className="button--viewProductDetail" onClick={() => {history.push({ pathname: `/products/${product.id}` })}}><small>🔍</small></button>
                        </section>

                    </article>
                    <br></br>
                </>)
            })
        )
    }
    
    
    return (
        <>
            <div>

                {products !== []
                ? renderFilters()
                : ""}

                <header className="products__header"> 
                    <h2>Products</h2> 

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
  