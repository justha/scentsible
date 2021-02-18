import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Filter.css"


export const ProductFilters = () => {
    const { families, getFamilies, selectedFamilyId, setSelectedFamilyId } = useContext(FamilyContext)
    const { groups, getGroups, selectedGroupId, setSelectedGroupId } = useContext(GroupContext)

    const filterOn = {'font-weight': 'bold', 'text-decoration': 'underline wavy'}
    const filterOff = {}

    useEffect(() => {
        getGroups()
        getFamilies()
    }, [])


    return (
        <>
            <section className="container--productFilters"> 
 
                <article className="container--filterSet">                    
                        <h3 className="filter__title">View</h3>
                        <button 
                            className="button--viewAll" 
                            as={Link} 
                            onClick={() => {
                                setSelectedGroupId(0)
                                setSelectedFamilyId(0)
                            }} 
                            style={
                                selectedGroupId === 0 && selectedFamilyId === 0
                                ? filterOn
                                : filterOff
                            }
                        > 
                            ALL 
                        </button>
                </article>

                <article className="container--filterSet"> 
                    <h3 className="filter__title">by Product Type</h3>                     
                    
                    {groups.map(group => {
                        return (                            
                            <button 
                                className="button--filterProductGroup" 
                                as={Link} 
                                value={group.id} 
                                onClick={(event) => {
                                    const groupId = parseInt(event.target.value)
                                    setSelectedGroupId(groupId)
                                    }}
                                style={
                                    selectedGroupId === group.id 
                                    ? filterOn
                                    : filterOff
                                }
                            > 
                                {group.name} 
                            </button>
                        )
                    })}
                    
                    <button 
                        className="button--clearFilter" 
                        as={Link} 
                        onClick={() => {setSelectedGroupId(0)}} 
                        disabled={(selectedGroupId === 0) ? true : ""}
                        > 
                        Clear Filter
                    </button>

                </article>

                <article className="container--filterSet"> 
                    <h3 className="filter__title">by Scent Type</h3>
                    
                    {families.map(family => {
                        return (
                            <button 
                            className="button--filterScentFamily" 
                            as={Link} 
                            value={family.id} 
                            onClick={(event) => {
                                const familyId = parseInt(event.target.value)
                                setSelectedFamilyId(familyId)
                            }}
                            style={
                                selectedFamilyId === family.id 
                                ? filterOn
                                : filterOff
                            }
                            > 
                                {family.name} 
                            </button>
                            )
                        })}

                    <button 
                        className="button--clearFilter" 
                        as={Link} 
                        onClick={() => {setSelectedFamilyId(0)}}
                        disabled={(selectedFamilyId === 0) ? true : ""}
                        > 
                        Clear Filter
                    </button>

                </article>

            </section>
        </>
    )
}