import React, { useContext, useEffect, useState } from "react"
import { ProductreviewContext } from "./ProductreviewProvider"
import { RatingContext } from "../rating/RatingProvider"
import { ProductContext } from "../product/ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Productreview.css"
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'



export const ProductreviewForm = (props) => {
    const { product, getProductById } = useContext(ProductContext)
    const { ratings, getRatings } = useContext(RatingContext)
    const { addProductreview, getProductreviewById, updateProductreview } = useContext(ProductreviewContext) 

    //Defines and sets current working prodObj state to default values, so that users can save new products without having to provide review comments (not required)
    const [prodreviewObj, setProdreviewObj] = useState({
        review: "",
        review_date: "",
        rating_id: 0,
        product_id: 0,
    })
    const productId = parseInt(props.match.url.split("/")[3])
    const jsonDate = new Date(Date.now()).toJSON().slice(0, 10)

    const editMode = props.match.url.split("/")[2] === "edit" //Checks URL to determine if in editMode
    const productreviewId = parseInt(props.match.params.productreviewId)

    //Gets the following on initialization, so that the Ratings <select> element presents options to the user
    //Gets the following on initialization, so that product details are presented to the user
    useEffect(() => {
        getRatings()
        getProductById(productId)
        
        if (editMode) {
            getProductreviewById(productreviewId).then(setProdreviewObj)
        }
    }, [])
    
    
    //Updates prodreviewObj state variable every time the state of an input fields changes;
    //Note that 'name' and 'image_url' are text input fields, whereas the others are select drop-downs
    const handleControlledInputChange = (browserEvent) => {
        const newProductreview = Object.assign({}, prodreviewObj)
        
        browserEvent.target.name === "review" 
        ? (newProductreview[browserEvent.target.name] = browserEvent.target.value)
        : (newProductreview[browserEvent.target.name] = parseInt(browserEvent.target.value))
        
        setProdreviewObj(newProductreview)
    }

    return (
        <form className="form--productreview">
            <h2 className="productreviewForm__title">{editMode ? "Edit Your Product Review" : "Review This Product"}</h2>

            <section key={`product--${product.id}`} className="product">
                {/* <div className="product__brand">{product.brand.name}</div>
                <div className="product__name">{product.name}</div>
                <div className="product__family">{product.family.name}</div>
                <div className="product__group">{product.group.name}</div> */}
            </section>


            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="rating_id">Scent Strength Rating: </label> */}
                    <select name="rating_id" className="form-control"
                        value={prodreviewObj.rating_id}
                        onChange={handleControlledInputChange}>
                        <option value="0">Scent Strength</option>
                            {ratings.map(rating => {
                                return <option value={rating.id}>{rating.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>
         
            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="name">Product Review: </label> */}
                    <input type="text" name="review" className="form-control" autoFocus 
                        placeholder="Review Comments"
                        defaultValue={prodreviewObj.review}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            

            {editMode 
            ? (
                <div>                    
                <Button 
                    className="button--addProductreview"
                    type="submit"
                    onClick={clickEvent => {
                        clickEvent.preventDefault()  // Prevents form from being submitted

                        const revisedProductreview = {
                            id: prodreviewObj.id,
                            review_date: prodreviewObj.review_date,
                            review: prodreviewObj.review,
                            rating_id: parseInt(prodreviewObj.rating_id),
                            product_id: productId}
                        
                        updateProductreview(revisedProductreview)  // Sends PUT request to API
                        .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                    }}
                    variant="contained"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                >
                Update
                </Button>
            </div>
            )
            : (
                <div>                    
                    <Button 
                        className="button--addProductreview"
                        type="submit"
                        onClick={clickEvent => {
                            clickEvent.preventDefault()  // Prevents form from being submitted 

                            const newProductreview = {
                                review_date: jsonDate,
                                review: prodreviewObj.review,
                                rating_id: parseInt(prodreviewObj.rating_id),
                                product_id: productId}
                                                       
                            addProductreview(newProductreview)  // Sends POST request to API
                            .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                        }}
                        variant="contained"
                        color="primary"
                        size="medium"
                        startIcon={<SaveIcon />}
                    >
                    Save
                    </Button>
                </div>
            )
            }
                
        </form>
    )
}