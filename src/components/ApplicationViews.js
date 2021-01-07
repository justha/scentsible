import React from "react"
import { Route } from "react-router-dom"
import { BrandProvider } from "./brand/BrandProvider"
import { FamilyProvider } from "./family/FamilyProvider"
import { GroupProvider } from "./group/GroupProvider"
import { RatingProvider } from "./rating/RatingProvider"
import { ProductProvider } from "./product/ProductProvider"
import { ProductForm } from "./product/ProductForm"


export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
            </Route>

            {/* <ProductProvider>
                <BrandProvider>
                    <FamilyProvider>
                        <GroupProvider>
                            <RatingProvider>
                                <Route exact path="/products/create" 
                                    render={(props) => <ProductForm {...props} />}
                                />
                                <Route exact path="/products/edit/:productId(\d+)" 
                                    render={(props) => <ProductForm {...props} />}
                                />
                                <Route exact path="/myproducts" 
                                    render={(props) => <UsersProducts {...props} />}
                                />
                                <Route path="/products/:productId(\d+)"
                                    render={(props) => <ProductDetails {...props} />}
                                />                                
                            </RatingProvider>
                        </GroupProvider>
                    </FamilyProvider>
                </BrandProvider>
            </ProductProvider> */}

        </>
    )
}