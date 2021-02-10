import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import Button from '@material-ui/core/Button'
import "./Filter.css"


export const ProductFilters = () => {
    const { families, getFamilies, setSelectedFamilyId } = useContext(FamilyContext)
    const { groups, getGroups, setSelectedGroupId } = useContext(GroupContext)

    useEffect(() => {
        getGroups()
        getFamilies()
    }, [])


    return (
        <>
            <section className="container--productFilters"> 

                <article className="container--filterSet"> 
                    <h3 className="filter__title">View by Product Type</h3>
                    {groups.map(group => {return <button className="button--filterProductGroup" as={Link} value={group.id} 
                        onClick={(event) => {
                            const groupId = parseInt(event.target.value)
                            setSelectedGroupId(groupId)
                            }}
                        > {group.name} </button>})}
                </article>

                <article className="container--filterSet"> 
                    <h3 className="filter__title">View by Scent Type</h3>
                    {families.map(familiy => {return <button className="button--filterScentFamily" as={Link} value={familiy.id} 
                        onClick={(event) => {
                            const familyId = parseInt(event.target.value)
                            setSelectedFamilyId(familyId)
                        }}
                        > {familiy.name} </button>})}
                </article>

                <article className="container--filterSet">                    
                        <h3 className="filter__title">View All</h3>
                        <button 
                            className="button--viewAll" 
                            as={Link} 
                            onClick={() => {
                                setSelectedGroupId(0)
                                setSelectedFamilyId(0)
                            }} 
                        > 
                            ALL 
                        </button>
                </article>

            </section>
        </>
    )
}