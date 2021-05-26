import React from "react"

function Search({searchPost, setSearchPost}){

    const handleSearch =(e)=>setSearchPost(e.target.value)
    return (
        <div className = "search-bar">
            <input type = "text"
                className="search-bar__input"
                name="search"
                placeholder="Search"
                aria-label="search"
                value={searchPost}
                onChange={handleSearch}/>
                {/* <button type="submit" className="search-bar__search">
                <i className="fas fa-search"></i>
                </button> */}
        </div>
    )
}

export default Search