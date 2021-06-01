import React from "react"

function Search({searchPost, setSearchPost}){

    const handleSearch =(e)=>setSearchPost(e.target.value)
    return (
        <section className = "flex-box">
            <div className="search">
                <div>
                <input type = "text"
                    name="search"
                    placeholder="Search Posts by country"
                    aria-label="search"
                    value={searchPost}
                    onChange={handleSearch}/>
                </div>
            </div>
        </section>
    )
}

export default Search