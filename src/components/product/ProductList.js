import React, { useContext, useEffect, useState, useRef} from "react"
import { Link, useHistory } from "react-router-dom"
import { ProductContext } from "./ProductProvider"
import { ProductreviewContext } from "../productreview/ProductreviewProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline' // delete icon (trash can)
import HighlightOffIcon from '@material-ui/icons/HighlightOff' //delete icon ("x")

export const ProductList = ({ props }) => {
    
    const { products, getProducts, deleteProduct, getProductsByGroup, getProductsByFamily } = useContext(ProductContext)
    const { productreviews, getProductreviews, deleteProductreview } = useContext(ProductreviewContext)
    const { getFamilies, selectedFamilyId } = useContext(FamilyContext)
    const { getGroups, selectedGroupId } = useContext(GroupContext)
    
    const history = useHistory()
    const [ arrayOfProducts, setArrayOfProducts ] = useState([])

    useEffect(() => {
        getProducts()
        getGroups()
        getFamilies()
        getProductreviews()
    }, [])
    
    
    // Upon changes to products, gets products and re-sets array of products to refresh ProductList
    useEffect(() => {
        setArrayOfProducts(subset)
    }, [products])
    
    // Upon changes to productreviews, gets products and re-sets array of products to refresh ProductList
    useEffect(() => {
        getProducts()
        setArrayOfProducts(subset)
    }, [productreviews])
    

    // When a user selects a filter option, resets arrayOfProducts to refresh ProductList 
    const subset = 
        selectedGroupId === 0 && selectedFamilyId === 0
        ? products 
        : selectedGroupId !== 0 && selectedFamilyId === 0
            ? products.filter(p => p.group_id === selectedGroupId)
            : selectedGroupId === 0 && selectedFamilyId !== 0
                ? products.filter(p => p.family_id === selectedFamilyId)
                : products.filter(p => p.group_id === selectedGroupId && p.family_id === selectedFamilyId)

    useEffect(() => {
        setArrayOfProducts(subset)
    }, [selectedGroupId])

    useEffect(() => {
        setArrayOfProducts(subset)
    }, [selectedFamilyId])

    
    const renderList = (arrayOfProducts) => {
        return (
            arrayOfProducts.map(product => {
                let arrayOfReviews = []
                arrayOfReviews = productreviews.filter(pr => pr.product_id === product.id )

                const ratingCount = arrayOfReviews.length

                let ratingSum = 0
                arrayOfReviews.forEach(review => {ratingSum += review.rating_id})

                let avgRating = ""
                ratingCount !== 0
                ? (avgRating = (ratingSum/ratingCount).toFixed(1))
                : (avgRating = " Not Rated ")

                const myRating = parseInt(product.currentuser_rating)

                return (<>
                    <div className="container__card">
                        <div className="container__productInfo">                            
                            <div className="container__productText" key={`product--${product.id}`}>

                                <section className="container__productDetail">                                
                                    <div className="product__brand">{product.brand.name}</div>
                                    <div className="product__name">{product.name}</div>
                                    <div className="product__group">{product.group.name}</div>
                                    <div className="product__family">{product.family.name}</div>
                                </section>
                                <br></br>

                                <section className="container__ratings">      
                                    <article className="container__avgRating">
                                        <div className="product__ratingTitle"> Avg Rating: </div>
                                        <div className="product__ratingValue"> {avgRating} </div>
                                    </article>

                                    <article className="container__myRating">
                                        <div className="product__ratingTitle"> My Rating: </div> 
                                        <div className="product__ratingValue">                                        
                                            {product.currentuser_productreview_id === null
                                                ? (<Button 
                                                        className="button--addProductreview" 
                                                        as={Link} 
                                                        onClick={() => {history.push({ pathname: `/productreviews/create/${product.id}` })}}
                                                        color="secondary"
                                                        size="small"
                                                        startIcon={<AddIcon />}
                                                    > Rate 
                                                    </Button>)
                                                : (
                                                    <a                                                 
                                                        href="" 
                                                        onClick={() => {history.push({ pathname: `/productreviews/edit/${product.currentuser_productreview_id}` })}} 
                                                    >
                                                        {myRating.toFixed(1)}
                                                    </a>
                                                )
                                            }

                                            {product.currentuser_productreview_id === null
                                            ? ""
                                            : ( 
                                                <Button 
                                                    className="button--DeleteRating" 
                                                    as={Link} 
                                                    onClick={() => {deleteProductreview(`${product.currentuser_productreview_id}`)}}
                                                    color="primary" 
                                                    size="small"
                                                    startIcon={<DeleteOutlineIcon />}
                                                > 
                                                </Button> 
                                                )
                                            }
                                        </div>

                                    </article>
                                </section>


                            </div>

                            <div className="container__productImage">                                
                                <img 
                                    className="product__imgURL" 
                                    src={
                                        product.group_id === 1
                                        ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690729/scentsible/hairdryer_outline_iconixar_ytovm0.png"
                                        : (product.group_id === 2
                                            ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690741/scentsible/skincare_outline_iconixar_afwtte.png"
                                            : (product.group_id === 3
                                                ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690748/scentsible/makeup_outline_iconixar_upirkv.png"
                                                : ""
                                                )    
                                            )                
                                        }
                                    alt="product">                            
                                </img>
                            </div>
                        </div>


                        <div className="container__productButtons">                                
                            {product.currentuser_created === true
                            ? (<>
                                    <Button 
                                        className="button--editProduct" 
                                        as={Link} 
                                        onClick={() => {history.push({ pathname: `/products/edit/${product.id}` })}}
                                        variant="text"
                                        // color="primary"
                                        size="small" 
                                        startIcon={<EditOutlinedIcon />}
                                        > 
                                        {/* Edit Product  */}
                                    </Button>
                                    <Button 
                                        className="button--deleteProduct" 
                                        as={Link} 
                                        onClick={() => {deleteProduct(`${product.id}`)}}
                                        variant="text" 
                                        // color="primary"
                                        size="small" 
                                        startIcon={<HighlightOffIcon />}
                                        > 
                                        {/* Delete Product  */}
                                    </Button>
                                </>
                                )
                            : ""}
                        </div>

                    </div>
                    <br></br>
                </>)
            })
        )
    }
    
    
    return (
        <div className="container__productList">
            {products !== []
            ? renderList(arrayOfProducts)
            : ""}
        </div>
    )
}