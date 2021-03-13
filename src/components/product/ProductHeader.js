import React from "react"
import { Link, useHistory } from "react-router-dom"
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'


export const ProductHeader = () => {
    const history = useHistory()


    return (
        <header className="products__header"> 
            <h2 className="title">Personal Care Products</h2> 

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
        </header>
    )
}