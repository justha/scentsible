import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { GroupContext } from "../group/GroupProvider"
import Button from '@material-ui/core/Button'
import "./Homepage.css"
import FilterListIcon from '@material-ui/icons/FilterList'

export const Homepage = ({ props }) => {
    const { groups, getGroups, setSelectedGroupId } = useContext(GroupContext)    
    const history = useHistory()

    useEffect(() => {
        getGroups()
    }, [])


    return(
        <>
            <main className="homepage__main">                
                <section className="container--homepageButtons"> 

                <Button 
                    className="button--selectProductGroup" 
                    as={Link} 
                    onClick={(event) => {
                        setSelectedGroupId(0)
                        history.push({ pathname: "/products"})
                        }}
                    variant="outlined"
                    color="none"
                    size="large"
                > 
                    All
                </Button>

                    {groups.map(group => {
                        return (   
                            <Button 
                                className="button--selectProductGroup" 
                                as={Link} 
                                value={group.id} 
                                onClick={(event) => {
                                    const groupId = parseInt(event.currentTarget.value)  //note: material-ui uses 'currentTarget' instead of 'target'
                                    setSelectedGroupId(groupId)
                                    history.push({ pathname: "/products"})
                                    }}
                                    variant="outlined"
                                    color="none"
                                    size="large"
                                    endIcon={<FilterListIcon />}
                                    // startIcon={<img className="button__imgURL" src={"https://res.cloudinary.com/djxxamywv/image/upload/v1615344084/scentsible/hairdryer_gradient_iconixar_x4uny3.png"} />}    
                            > 
                                {group.name} 
                            </Button>            
                        )
                    })}

                </section>
            </main>

        </>
    )
}
  