import React from "react"

function FilterPosts({setFilterAllPosts}){

    const handleFilter =(e)=>setFilterAllPosts(e.target.value)
    return(
        <div>
            <label>Sort</label>
            <select onChange={handleFilter}>
                <option value="--">--</option>
                <option value="Recent Travel">Recent Travel</option>
            </select>
        </div>
    )
}

export default FilterPosts