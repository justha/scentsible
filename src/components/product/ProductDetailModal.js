import React, { useContext, useEffect, useState} from "react"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import { ProductreviewContext } from "../productreview/ProductreviewProvider"


export const ProductDetailModal = ({ open, onClose }) => {
    const { product, getProductById, deleteProduct } = useContext(ProductContext)
    const { brands, getBrands } = useContext(BrandContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)
    const { productreviews, getProductreviews, deleteProductreview } = useContext(ProductreviewContext)
    // const productId = parseInt(props.match.params.productId)
    const productId = 1

    const [prodDetailObj, setProdDetailObj] = useState({
        // name: "",
        // image_url: "",
        // group_id: 0,
        // brand_id: 0,
        // family_id: 0,
    })

    useEffect(() => {
        getProductById(productId).then(setProdDetailObj)
        getGroups()
        getBrands()
        getFamilies()
        getProductreviews()
    }, [])

    console.log("prodDetailObj>>",prodDetailObj)

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
            <section key={`product--${prodDetailObj.id}`} className="product">
                {/* <div className="product__brand">{prodDetailObj.brand.name}</div> */}
                <div className="product__name">{prodDetailObj.name}</div>
                {/* <div className="product__family">{prodDetailObj.family.name}</div>
                <div className="product__group">{prodDetailObj.group.name}</div> */}
            </section>


            <section className="container__ratings">      
                <div className="container__rating">Avg Rating 
                    {ratingAvg}
                </div>

                <div className="container__rating">My Rating 
                    {prodDetailObj.currentuser_productreview_id === null
                        ? (<div> Not Rated Yet </div>)
                        : (<div className="product__userrating">{prodDetailObj.currentuser_rating}</div>)}
                </div>
            </section>

        </article>
        <br></br>
    </>)

    return (
        <>
        {open && (
            <dialog className="dialogbox__productdetails" onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
                <button primary margin="small" label="OK" onClick={onClose} />
            </dialog>
        )}
        </>
    )

}