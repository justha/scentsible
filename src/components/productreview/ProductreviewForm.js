import React, { useContext, useEffect, useState } from "react"
import { ProductreviewContext } from "./ProductreviewProvider"
import { RatingContext } from "../rating/RatingProvider"
import "./Productreview.css"
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'



export const ProductreviewForm = (props) => {
    const { ratings, getRatings } = useContext(RatingContext)
    const { addProductreview, getProductreviewById, updateProductreview } = useContext(ProductreviewContext) 
    const { selectedRating, setSelectedRating } = useState(0)

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
        
        if (editMode) {
            getProductreviewById(productreviewId).then(setProdreviewObj)
        }
    }, [])
    
    
    //Updates prodreviewObj state variable EVERY time an input fields changes;
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
            <h2 className="productreviewForm__title">
                {editMode 
                ? "Edit Your Product Review" 
                : "Rate This Product"}
            </h2>

            <FormControl component="fieldset">
                <FormLabel component="legend">Scent Strength</FormLabel>

                <RadioGroup value={prodreviewObj.rating_id} onChange={handleControlledInputChange}> 
                    {ratings.map(rating => {
                        return (
                            <FormControlLabel
                                name="rating_id"
                                value={rating.id} 
                                control={
                                    <Radio size="small" />
                                    }
                                label={`${rating.weight}-${rating.name}`}
                            />)
                    })}
                </RadioGroup>
            </FormControl>


            <TextField type="text" name="review" className="form-control" autoFocus 
                label="Product Review"
                // placeholder="Comments"
                defaultValue={prodreviewObj.review}
                onChange={handleControlledInputChange}
                fullWidth
                multiline
                rows={2}
                InputLabelProps={{shrink: true,}}
                variant="filled"
            />



            {editMode 
            ? (
                <div>                    
                <Button 
                    className="button--updateProductreview"
                    type="submit"
                    onClick={clickEvent => {
                        clickEvent.preventDefault()  // Prevents form from being submitted

                        const revisedProductreview = {
                            id: prodreviewObj.id,
                            review_date: prodreviewObj.review_date,
                            review: prodreviewObj.review,
                            rating_id: parseInt(prodreviewObj.rating_id),
                            product_id: parseInt(prodreviewObj.product_id)
                        }
                        
                        updateProductreview(revisedProductreview)  // Sends PUT request to API
                        .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                    }}
                    variant="outlined"
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
                                product_id: productId
                            }
                                                       
                            addProductreview(newProductreview)  // Sends POST request to API
                            .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                        }}
                        variant="outlined"
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