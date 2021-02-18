import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { GroupContext } from "../group/GroupProvider"
import Button from '@material-ui/core/Button'


export const Homepage = ({ props }) => {
    const { groups, getGroups, selectedGroupId, setSelectedGroupId } = useContext(GroupContext)    
    const history = useHistory()


    return(
        <>
            <div className="container__homepageButtons">
                <Button 
                    className="button--selectGroup" 
                    as={Link} 
                    onClick={() => {history.push({ pathname: "/products"})}}
                    variant="contained"
                    color="primary"
                    size="large"
                    // startIcon={<AddIcon />}
                    >
                    Hair
                </Button>                
            </div>
        </>
    )
}
  