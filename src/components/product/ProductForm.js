import React, { useContext, useEffect, useState } from "react"
import { ProductContext } from "./ProductProvider"
import { BrandContext } from "../brand/BrandProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"

export const ProductForm = (props) => {
    const { createProduct} = useContext(ProductContext)
    const { brands, getBrands} = useContext(BrandContext)
    const { families, getFamilies} = useContext(FamilyContext)
    const { groups, getGroups} = useContext(GroupContext)

    //Gets on initialization so that the <select> element presents options to the user
    useEffect(() => {
        getGroups()
        getBrands()
        getFamilies()
    }, [])

    //Sets currrentProduct to default values 
    const [currentProduct, setCurrentProduct] = useState({
        productName: "",
        imageURL: "",
        groupId: 0,
        brandId: 0,
        familyId: 1,
    })

    //Updates currrentProduct state variable every time the state of an input fields changes
    const handleControlledInputChange = (event) => {
        const newProductState = Object.assign({}, currentProduct)
        newProductState[event.target.name] = event.target.value
        setCurrentProduct(newProductState)
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">Add a New Product</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name: </label>
                    <input type="text" name="productName" required autoFocus className="form-control"
                        value={currentProduct.productName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="groupId">Product Group: </label>
                    <select name="groupId" className="form-control"
                        value={currentProduct.groupId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a product group...</option>
                        {
                            groups.map(group => {
                            return <option value={group.id}>{group.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="brandId">Brand: </label>
                    <select name="brandId" className="form-control"
                        value={currentProduct.brandId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a brand...</option>
                        {
                            brands.map(brand => {
                            return <option value={brand.id}>{brand.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="familyId">Scent Family: </label>
                    <select name="familyId" className="form-control"
                        value={currentProduct.familyId}
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a scent family...</option>
                        {
                            families.map(family => {
                            return <option value={family.id}>{family.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const product = {
                        name: currentProduct.productName,
                        image_url: currentProduct.imageURL,
                        group_id: parseInt(currentProduct.groupId),
                        brand_id: parseInt(currentProduct.brandId),
                        family_id: parseInt(currentProduct.familyId)
                    }

                    // Send POST request to your API
                    createProduct(product)
                }}
                className="button--createProduct">Save</button>
        </form>
    )
}