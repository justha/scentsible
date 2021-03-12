import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Product.css"
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'



export const ProductForm = (props) => {
    const { addProduct, getProductById, updateProduct } = useContext(ProductContext)
    const { brands, getBrands } = useContext(BrandContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)

    //Defines and sets current working prodObj state to default values, so that users can save new product without having to provide image_url (not required)
    const [prodObj, setProdObj] = useState({
        name: "",
        image_url: "",
        group_id: 0,
        brand_id: 0,
        family_id: 0,
    })
    const editMode = props.match.url.split("/")[2] === "edit" //Checks URL to determine if in editMode
    const productId = parseInt(props.match.params.productId)

    //Gets the following on initialization, so that the <select> element presents options to the user
    useEffect(() => {
        getGroups()
        getBrands()
        getFamilies()
        
        if (editMode) {
            getProductById(productId).then(setProdObj)
        }
    }, [])

    //Updates prodObj state variable every time the state of an input fields changes;
    //Note that 'name' and 'image_url' are text input fields, whereas the others are select drop-downs
    const handleControlledInputChange = (browserEvent) => {
        const newProduct = Object.assign({}, prodObj)

        browserEvent.target.name === "name" || browserEvent.target.name === "image_url"
        ? (newProduct[browserEvent.target.name] = browserEvent.target.value)
        : (newProduct[browserEvent.target.name] = parseInt(browserEvent.target.value))

        setProdObj(newProduct)
    }


    return (
        <>
            <h2 className="productForm__title">{editMode ? "Edit Existing Product" : "Add a New Product"}</h2>

            <form className="form--product">

                <TextField 
                    className="form-control"
                    select
                    label="Brand"
                    name="brand_id" 
                    value={prodObj.brand_id}
                    onChange={handleControlledInputChange}
                    // helperText="Select a brand"
                    // variant="filled"
                    fullWidth
                >
                    <MenuItem value="0">select</MenuItem>
                    
                    {brands.map(brand => {
                        return <MenuItem value={brand.id}>{brand.name}</MenuItem>
                    })}
                </TextField>
                
                <TextField 
                    className="form-control" 
                    name="name" 
                    label="Product Name"
                    value={prodObj.name}
                    onChange={handleControlledInputChange}
                    // helperText="Enter a product name"
                    // variant="filled"
                    fullWidth
                />
            
                <TextField 
                    className="form-control" 
                    select
                    label="Product Group"
                    name="group_id" 
                    value={prodObj.group_id}
                    onChange={handleControlledInputChange}
                    // helperText="Select a product group"
                    // variant="filled"
                    fullWidth
                >
                    <MenuItem value="0">select</MenuItem>

                    {groups.map(group => {
                        return <MenuItem value={group.id}>{group.name}</MenuItem>
                    })}
                </TextField>

                <br></br>

                <TextField 
                    className="form-control" 
                    select
                    label="Scent Family"
                    name="family_id" 
                    value={prodObj.family_id}
                    onChange={handleControlledInputChange}
                    // helperText="Select a scent family"
                    // variant="filled"
                    fullWidth
                >
                    <MenuItem value="0">select</MenuItem>
                    
                    {families.map(family => {
                        return <MenuItem value={family.id}>{family.name}</MenuItem>
                    })}
                </TextField>

                {/* <TextField 
                    className="form-control"
                    type="url"
                    name="image_url" 
                    label="Image URL"
                    value={prodObj.image_url}
                    onChange={handleControlledInputChange}
                    variant="filled"
                    fullWidth
                /> */}

                <br></br>
                <br></br>
                <br></br>
                

                {editMode 
                ? (
                    <Button 
                        className="button--updateProduct"
                        type="submit"
                        onClick={clickEvent => {
                            clickEvent.preventDefault()  // Prevents form from being submitted

                            const revisedProduct = {
                                id: prodObj.id,
                                name: prodObj.name,
                                image_url: prodObj.image_url,
                                group_id: parseInt(prodObj.group_id),
                                brand_id: parseInt(prodObj.brand_id),
                                family_id: parseInt(prodObj.family_id)}
                            
                            updateProduct(revisedProduct)  // Sends PUT request to API
                            .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                        }}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        startIcon={<SaveIcon />}
                    >
                    Update
                    </Button>
                )
                : (
                    <Button 
                        className="button--addProduct"
                        type="submit"
                        onClick={clickEvent => {
                            clickEvent.preventDefault()  // Prevents form from being submitted 

                            const newProduct = {
                                name: prodObj.name,
                                image_url: prodObj.image_url,
                                group_id: parseInt(prodObj.group_id),
                                brand_id: parseInt(prodObj.brand_id),
                                family_id: parseInt(prodObj.family_id)}
                            
                            addProduct(newProduct)  // Sends POST request to API
                            .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                        }}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    startIcon={<SaveIcon />}
                    >
                    Save
                    </Button>
                )
                }
                    
            </form>
        </>
    )
}