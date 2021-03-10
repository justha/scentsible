import React, { useContext, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { FamilyContext } from "../family/FamilyProvider"
import { GroupContext } from "../group/GroupProvider"
import "./Filter.css"
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export const ProductFilters = () => {
    const { families, getFamilies, selectedFamilyId, setSelectedFamilyId } = useContext(FamilyContext)
    const { groups, getGroups, selectedGroupId, setSelectedGroupId } = useContext(GroupContext)

    const filterOn = {
        'font-weight': 'bold', 
        'text-decoration': 'underline wavy'
        }
    const filterOff = {}

    useEffect(() => {
        getGroups()
        getFamilies()
    }, [])


    return (
        <>
            <section className="container--productFilters"> 
 
                {/* <article className="container--filterSet">                    
                        <h3 className="filter__title">View</h3>
                        <Button 
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
                            size="small" 
                            variant="outlined"
                            color="secondary" 
                        > 
                            ALL 
                        </Button>
                </article> */}

                <article className="container--filterSet"> 
                    <h3 className="filter__title">Product Type</h3>                     
                    
                    <ButtonGroup>
                        {groups.map(group => {
                            return (                            
                                <Button 
                                    className="button--filterProductGroup" 
                                    as={Link} 
                                    value={group.id} 
                                    onClick={(event) => {
                                        const groupId = parseInt(event.currentTarget.value)
                                        setSelectedGroupId(groupId)
                                        }}
                                    style={
                                        selectedGroupId === group.id 
                                        ? filterOn
                                        : filterOff
                                        }
                                    size="small" 
                                    variant="outlined"
                                    color="secondary" 
                                > 
                                    {group.name} 
                                </Button>
                            )
                        })}
                        
                        <Button 
                            className="button--clearFilter" 
                            as={Link} 
                            onClick={() => {setSelectedGroupId(0)}} 
                            style={
                                selectedGroupId === 0
                                ? filterOn
                                : filterOff
                                }
                            disabled={(selectedGroupId === 0) ? true : ""}
                            size="small" 
                            variant="outlined"
                            color="secondary" 
                        > 
                            {(selectedGroupId === 0) ? "All" : "Reset"}
                        </Button>
                    </ButtonGroup>

                </article>

                <article className="container--filterSet"> 
                    <h3 className="filter__title">Scent Type</h3>
                    
                    <ButtonGroup>                        
                        {families.map(family => {
                            return (
                                <Button 
                                className="button--filterScentFamily" 
                                as={Link} 
                                value={family.id} 
                                onClick={(event) => {
                                    const familyId = parseInt(event.currentTarget.value)
                                    setSelectedFamilyId(familyId)
                                }}
                                style={
                                    selectedFamilyId === family.id 
                                    ? filterOn
                                    : filterOff
                                    }
                                    size="small" 
                                    variant="outlined" 
                                    color="secondary"
                                    > 
                                    {family.name} 
                                </Button>
                                )
                            })}

                        <Button 
                            className="button--clearFilter" 
                            as={Link} 
                            onClick={() => {setSelectedFamilyId(0)}}
                            style={
                                selectedFamilyId === 0
                                ? filterOn
                                : filterOff
                                }
                            disabled={(selectedFamilyId === 0) ? true : ""}
                            size="small" 
                            variant="outlined"
                            color="secondary" 
                        > 
                            {(selectedFamilyId === 0) ? "All" : "Reset"}
                        </Button>
                    </ButtonGroup>

                </article>

            </section>
        </>
    )
}