import React, { useContext, useEffect, useState} from "react"
import { Link, useHistory } from "react-router-dom"
import { GroupContext } from "../group/GroupProvider"
import Button from '@material-ui/core/Button'
import "./Homepage.css"


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
                                    color="primary"
                                    size="large"
                            > 
                                {group.name} 
                            </Button>
                        )
                    })}

                    <Button 
                        className="button--selectProductGroup" 
                        as={Link} 
                        onClick={(event) => {
                            setSelectedGroupId(0)
                            history.push({ pathname: "/products"})
                            }}
                        variant="outlined"
                        color="primary"
                        size="large"
                    > 
                        All
                    </Button>

                </section>
            </main>

        </>
    )
}
  