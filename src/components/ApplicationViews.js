import React from "react"
import { Route } from "react-router-dom"
import { BrandProvider } from "./brand/BrandProvider"
import { FamilyProvider } from "./family/FamilyProvider"
import { GroupProvider } from "./group/GroupProvider"
import { Homepage } from "./home/Homepage"
import { RatingProvider } from "./rating/RatingProvider"
import { ProductProvider } from "./product/ProductProvider"
import { ProductForm } from "./product/ProductForm"
import { ProductList } from "./product/ProductList"
import { ProductDetail } from "./product/ProductDetail"
import { ProductreviewProvider } from "./productreview/ProductreviewProvider"
import { ProductreviewForm } from "./productreview/ProductreviewForm"
import { ProductreviewList } from "./productreview/ProductreviewList"


export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
            </Route>

            <ProductProvider>
                {/* <ProductreviewProvider> */}
                    <BrandProvider>
                        <FamilyProvider>
                            <GroupProvider>
                                <RatingProvider>

                                    <Route exact path="/home" 
                                        render={(props) => <Homepage {...props} />}
                                    />

                                    <Route exact path="/products" 
                                        render={(props) => <ProductList {...props} />}
                                    />

                                    <Route exact path="/products/create" 
                                        render={(props) => <ProductForm {...props} />}
                                    />

                                    {/* <Route exact path="/products/edit/:productId(\d+)" 
                                        render={(props) => <ProductForm {...props} />}
                                    /> */}
                                    
                                    {/* <Route path="/products/:productId(\d+)"
                                        render={(props) => <ProductDetail {...props} />}
                                    /> */}
                                    
                                </RatingProvider>
                            </GroupProvider>
                        </FamilyProvider>
                    </BrandProvider>
                {/* </ProductreviewProvider> */}
            </ProductProvider>


            {/* <ProductreviewProvider>
                <ProductProvider>
                    <RatingProvider>

                        <Route exact path="/productreviews" 
                            render={(props) => <ProductreviewList {...props} />}
                        />
                        
                        <Route exact path="/productreviews/create" 
                            render={(props) => <ProductreviewForm {...props} />}
                        />                        
                        
                    </RatingProvider>
                </ProductProvider>                
            </ProductreviewProvider> */}

        </>
    )
}