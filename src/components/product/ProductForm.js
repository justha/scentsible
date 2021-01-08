import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Product.css"


export const ProductForm = (props) => {
    const { addProduct, getProductById } = useContext(ProductContext)
    const { brands, getBrands } = useContext(BrandContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)

    const editMode = props.match.url.split("/")[2] === "edit" //Checks URL to determine if in editMode
    // const [prodObj, setProdObj] = useState({}) //defines and sets state of the prodObj
    const productId = parseInt(props.match.params.productId)

    //Gets on initialization so that the <select> element presents options to the user
    useEffect(() => {
        getGroups()
        getBrands()
        getFamilies()
        
        if (editMode) {
            getProductById(productId).then(setProdObj)}

    }, [])

    ////Defines and sets state of prodObj; Sets prodObj to the following default values
    const [prodObj, setProdObj] = useState({
        productName: "",
        imageURL: "",
        groupId: 0,
        brandId: 0,
        familyId: 0,
    })

    //Updates prodObj state variable every time the state of an input fields changes
    const handleControlledInputChange = (event) => {
        const newProduct = Object.assign({}, prodObj)

        {event.target.name === "groupId"
        ? (newProduct[event.target.name] = event.value)
        : (newProduct[event.target.name] = event.target.value)         
        }

        newProduct[event.target.name] = event.target.value

        setProdObj(newProduct)
    }

    return (
        <form className="form--product">
            <h2 className="productForm__title">{editMode ? "Edit Product" : "Add a New Product"}</h2>

            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="groupId">Product Group: </label> */}
                    <select name="groupId" className="form-control"
                        value={prodObj.groupId}
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
                    {/* <label htmlFor="brandId">Brand: </label> */}
                    <select name="brandId" className="form-control"
                        value={prodObj.brandId}
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
                    {/* <label htmlFor="productName">Product Name: </label> */}
                    <input type="text" name="productName" required autoFocus className="form-control"
                        placeholder="Product Name"
                        value={prodObj.productName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    {/* <label htmlFor="familyId">Scent Family: </label> */}
                    <select name="familyId" className="form-control"
                        value={prodObj.familyId}
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
                    {/* <label htmlFor="productName">Image URL </label> */}
                    <input type="text" name="imageURL" required autoFocus className="form-control"
                        placeholder="Image URL"
                        value={prodObj.imageURL}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            

            <button 
                className="button--addProduct"
                type="submit"
                onClick={clickEvent => {
                    // Prevents form from being submitted
                    clickEvent.preventDefault()

                    const newProduct = {
                        name: prodObj.productName,
                        image_url: prodObj.imageURL,
                        group_id: parseInt(prodObj.groupId),
                        brand_id: parseInt(prodObj.brandId),
                        family_id: parseInt(prodObj.familyId)}

                    
                    addProduct(newProduct)  // Sends POST request to API
                    .then(() => {props.history.push(`/products`)})  // Sends user back to ProductList
                }}
            >
            Save
            </button>
                
        </form>
    )
}