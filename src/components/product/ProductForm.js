import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Product.css"


export const ProductForm = (props) => {
    const { addProduct, getProductById, updateProduct } = useContext(ProductContext)
    const { brands, getBrands } = useContext(BrandContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)

    const [prodObj, setProdObj] = useState({})
    const editMode = props.match.url.split("/")[2] === "edit" //Checks URL to determine if in editMode
    const productId = parseInt(props.match.params.productId)

    //Defines and sets the state of the current working prodObj to the following default values
    // const [prodObj, setProdObj] = useState({
    //     name: "",
    //     image_url: "",
    //     group_id: 0,
    //     brand_id: 0,
    //     family_id: 0,
    // })

    //Gets the following on initialization, so that the <select> element presents options to the user
    useEffect(() => {
        getGroups()
        getBrands()
        getFamilies()
        
        if (editMode) {
            getProductById(productId).then(setProdObj)
        }
    }, [])

    //Updates prodObj state variable every time the state of an input fields changes
    const handleControlledInputChange = (browserEvent) => {
        const newProduct = Object.assign({}, prodObj)

        newProduct[browserEvent.target.name] = browserEvent.target.value 

        // browserEvent.target.name === "group_id" || browserEvent.target.name === "brand_id" || browserEvent.target.name === "family_id" 
        // ? (newProduct[browserEvent.target.name] = browserEvent.value)
        // : (newProduct[browserEvent.target.name] = browserEvent.target.value)

        setProdObj(newProduct)
    }

    return (
        <form className="form--product">
            <h2 className="productForm__title">{editMode ? "Edit Existing Product" : "Add a New Product"}</h2>

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="group_id">Product Group: </label> */}
                    <select name="group_id" className="form-control"
                        value={prodObj.group_id}
                        onChange={handleControlledInputChange}>
                        <option value="0">Product Group</option>
                            {groups.map(group => {
                                return <option value={group.id}>{group.name}</option>
                            })}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="brand_id">Brand: </label> */}
                    <select name="brand_id" className="form-control"
                        value={prodObj.brand_id}
                        onChange={handleControlledInputChange}>
                        <option value="0">Brand</option>
                        {
                            brands.map(brand => {
                                return <option value={brand.id}>{brand.name}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="name">Product Name: </label> */}
                    <input type="text" name="name" className="form-control" required autoFocus 
                        placeholder="Product Name"
                        defaultValue={prodObj.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="family_id">Scent Family: </label> */}
                    <select name="family_id" className="form-control"
                        value={prodObj.family_id}
                        onChange={handleControlledInputChange}>
                        <option value="0">Scent Family</option>
                        {
                            families.map(family => {
                            return <option value={family.id}>{family.name}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="image_url">Image URL </label> */}
                    <input type="text" name="image_url" className="form-control" required autoFocus 
                        placeholder="Image URL"
                        defaultValue={prodObj.image_url}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            

            {editMode 
            ? (
                <div>                    
                <button 
                    className="button--addProduct"
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
                >
                Update
                </button>
            </div>
            )
            : (
                <div>                    
                    <button 
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
                    >
                    Save
                    </button>
                </div>
            )
            }
                
        </form>
    )
}