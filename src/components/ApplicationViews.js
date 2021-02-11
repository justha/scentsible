import React from "react"
import { Route } from "react-router-dom"
import { BrandProvider } from "./brand/BrandProvider"
import { FamilyProvider } from "./family/FamilyProvider"
import { GroupProvider } from "./group/GroupProvider"
import { Homepage } from "./home/Homepage"
import { RatingProvider } from "./rating/RatingProvider"
import { ProductProvider } from "./product/ProductProvider"
import { ProductFilters } from "./filter/ProductFilters"
import { ProductForm } from "./product/ProductForm"
import { ProductList } from "./product/ProductList"
import { ProductreviewProvider } from "./productreview/ProductreviewProvider"
import { ProductreviewForm } from "./productreview/ProductreviewForm"
import { ProductreviewList } from "./productreview/ProductreviewList"


export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
            </Route>

            <ProductreviewProvider>
                <ProductProvider>
                        <BrandProvider>
                            <FamilyProvider>
                                <GroupProvider>
                                    <RatingProvider>

                                        <Route exact path="/home" 
                                            render={(props) => <Homepage {...props} />}
                                        />

                                        <Route exact path="/products" 
                                            render={(props) => 
                                                <>
                                                <ProductFilters />
                                                <ProductList {...props} />
                                                </>
                                            }
                                        />

                                        <Route exact path="/products/create" 
                                            render={(props) => <ProductForm {...props} />}
                                        />

                                        <Route exact path="/products/edit/:productId(\d+)" 
                                            render={(props) => <ProductForm {...props} />}
                                        />
                                        
                                        {/* <Route path="/products/:productId(\d+)"
                                            render={(props) => <ProductDetail {...props} />}
                                        /> */}
                                        
                                        <Route exact path="/productreviews" 
                                            render={(props) => <ProductreviewList {...props} />}
                                        />

                                        <Route exact path="/productreviews/create/:productId(\d+)" 
                                            render={(props) => <ProductreviewForm {...props} />}
                                        />                        
                                        
                                        <Route exact path="/productreviews/edit/:productreviewId(\d+)" 
                                            render={(props) => <ProductreviewForm {...props} />}
                                        />                        
                                        
                                    </RatingProvider>
                                </GroupProvider>
                            </FamilyProvider>
                        </BrandProvider>
                </ProductProvider>
            </ProductreviewProvider>

        </>
    )
}