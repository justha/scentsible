import React, { useContext, useEffect, useState, useRef} from "react"
import Modal from "react-modal"
import { Link, useHistory } from "react-router-dom"
import { ProductContext } from "./ProductProvider"
import { ProductreviewContext } from "../productreview/ProductreviewProvider"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
// import { ProductDetail } from "./ProductDetail"
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined' 
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline' // delete icon (trash can)
import HighlightOffIcon from '@material-ui/icons/HighlightOff' //delete icon ("x")
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined' //star icon

export const ProductList = ({ props }) => {
    
    const { products, getProducts, deleteProduct, getProductsByGroup, getProductsByFamily } = useContext(ProductContext)
    const { productreviews, getProductreviews, deleteProductreview } = useContext(ProductreviewContext)
    const { families, getFamilies } = useContext(FamilyContext)
    const { groups, getGroups } = useContext(GroupContext)
    
    const history = useHistory()
    const [ arrayOfProducts, setArrayOfProducts ] = useState([])
    const [ isOpen, setIsOpen ] = useState(false)  //for Modal

    const openModal = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        getProducts()
        getGroups()
        getFamilies()
        getProductreviews()
    }, [])
    
    useEffect(() => {
        setArrayOfProducts(products);
    }, [products])
    
    //Upon changes to productreviews, gets products and re-sets array of products to refresh ProductList
    useEffect(() => {
        getProducts()
        setArrayOfProducts(products);
    }, [productreviews])

   
    const renderFilters = () => {
        return (
            <>
                <section className="container--productFilters">                    
                    <article className="container--filterSet"> 
                        <h3 className="filter__title">View by Product Type</h3>
                        <button className="button--filterProductGroup" as={Link} onClick={() => getProducts().then(setArrayOfProducts(products))} > ALL </button>
                        {groups.map(group => {return <button className="button--filterProductGroup" as={Link} value={group.id} 
                            onClick={(event) => {
                                const groupId = parseInt(event.target.value)
                                getProductsByGroup(groupId).then(setArrayOfProducts)}}
                            > {group.name} </button>})}
                    </article>

                    <article className="container--filterSet"> 
                        <h3 className="filter__title">View by Scent Type</h3>
                        <button className="button--filterScentFamily" as={Link} onClick={() => getProducts().then(setArrayOfProducts(products))} > ALL </button>
                        {families.map(familiy => {return <button className="button--filterScentFamily" as={Link} value={familiy.id} 
                            onClick={(event) => {
                                const familyId = parseInt(event.target.value)
                                getProductsByFamily(familyId).then(setArrayOfProducts)}}
                            > {familiy.name} </button>})}
                    </article>
                </section>
            </>
        )
    }

    const renderList = (arrayOfProducts) => {
        return (
            arrayOfProducts.map(product => {
                let arrayOfReviews = []
                arrayOfReviews = productreviews.filter(pr => pr.product_id === product.id )

                const ratingCount = arrayOfReviews.length

                let ratingSum = 0
                arrayOfReviews.forEach(review => {ratingSum += review.rating_id})

                let avgRating = ""
                ratingCount !== 0
                ? (avgRating = (ratingSum/ratingCount).toFixed(1))
                : (avgRating = " Not Rated ")

                const myRating = parseInt(product.currentuser_rating)

                return (<>
                    <div className="container__card">    

                        <div className="container__productInfo" key={`product--${product.id}`}>

                            <section className="container__productText">                                
                                <div className="product__brand">{product.brand.name}</div>
                                <div className="product__name">{product.name}</div>
                                <div className="product__group">{product.group.name}</div>
                                <div className="product__family">{product.family.name}</div>
                            </section>

                            <br></br>

                            <section className="container__ratings">      
                                <article className="container__avgRating">
                                    <div className="product__ratingTitle"> Avg Rating: </div>
                                    <div className="product__ratingValue"> {avgRating} </div>
                                </article>

                                <article className="container__myRating">
                                    <div className="product__ratingTitle"> My Rating: </div> 
                                    {product.currentuser_productreview_id === null
                                        ? (<Button 
                                                className="button--addProductreview" 
                                                as={Link} 
                                                onClick={() => {history.push({ pathname: `/productreviews/create/${product.id}` })}}
                                                color="primary"
                                                size="small"
                                                startIcon={<AddIcon />}
                                            > Rate 
                                            </Button>)
                                        : (
                                            <a 
                                                href="" 
                                                onClick={() => {history.push({ pathname: `/productreviews/edit/${product.currentuser_productreview_id}` })}} 
                                            >
                                                <div className="product__ratingValue">{myRating.toFixed(1)}</div>
                                            </a>
                                        )
                                    }

                                    {product.currentuser_productreview_id === null
                                    ? ""
                                    : ( 
                                        <Button 
                                            className="button--DeleteRating" 
                                            as={Link} 
                                            onClick={() => {deleteProductreview(`${product.currentuser_productreview_id}`)}}
                                            // color="primary" 
                                            size="small"
                                            startIcon={<DeleteOutlineIcon />}
                                        > 
                                        </Button> 
                                        )
                                    }

                                </article>
                            </section>


                        </div>

                        <div className="container__productImage">                                
                            <img 
                                className="product__imgURL" 
                                src={
                                    product.group_id === 1
                                    ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690729/scentsible/hairdryer_outline_iconixar_ytovm0.png"
                                    : (product.group_id === 2
                                        ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690741/scentsible/skincare_outline_iconixar_afwtte.png"
                                        : (product.group_id === 3
                                            ? "https://res.cloudinary.com/djxxamywv/image/upload/v1611690748/scentsible/makeup_outline_iconixar_upirkv.png"
                                            : ""
                                            )    
                                        )                
                                    }
                                alt="product">                            
                            </img>
                        </div>

                        <div className="container__productButtons">                                
                            {product.currentuser_created === true
                            ? (<>
                                    {/* <Button 
                                        className="button--listProductButtons" 
                                        as={Link} 
                                        onClick={() => {}}
                                        variant="text"
                                        color="primary"
                                        size="small" 
                                        startIcon={<ListIcon />}
                                        > 
                                    </Button> */}
                                    <Button 
                                        className="button--editProduct" 
                                        as={Link} 
                                        onClick={() => {history.push({ pathname: `/products/edit/${product.id}` })}}
                                        variant="text"
                                        // color="primary"
                                        size="small" 
                                        startIcon={<EditIcon />}
                                        > 
                                        Edit Product 
                                    </Button>
                                    <Button 
                                        className="button--deleteProduct" 
                                        as={Link} 
                                        onClick={() => {deleteProduct(`${product.id}`)}}
                                        variant="text" 
                                        // color="primary"
                                        size="small" 
                                        startIcon={<HighlightOffIcon />}
                                        > 
                                        Delete Product 
                                    </Button>
                                </>
                                )
                            : ""}
                        </div>

                        {/* <section>
                            <IconButton className="button--viewProductDetail" onClick={() => {history.push({ pathname: `/products/${product.id}` })}}> ℹ︎ </IconButton>
                        </section> */}

                        {/* <section>
                            <IconButton className="button--viewProductDetail" onClick={openModal}> ℹ
                                <InfoOutlinedIcon /> 
                            </IconButton>
                        </section> */}

                    </div>
                    <br></br>
                </>)
            })
        )
    }
    
    
    return (
        <>
            <main>

                {products !== []
                ? renderFilters()
                : ""}

                <br></br>

                <header className="products__header"> 
                    <h2 className="title">Products</h2> 

                    <div>                        
                        <Button 
                            className="button--addProduct" 
                            as={Link} 
                            onClick={() => {history.push({ pathname: "/products/create"})}}
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<AddIcon />}
                            >
                            New Product
                        </Button>
                    </div>

                </header>

                <br></br>
                            
                {products !== []
                ? renderList(arrayOfProducts)
                : ""}

            </main>

            <footer>
                <div>Icons made by <a href="https://www.flaticon.com/authors/iconixar" target="_blank" title="iconixar">iconixar </a> from <a href="https://www.flaticon.com/" target="_blank" title="Flaticon">www.flaticon.com</a></div>
            </footer>
        </>
    )
}