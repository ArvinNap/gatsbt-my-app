import React, { useContext, useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

const AllPost = () => {
  const [isShown, setIsShown] = useState(false)
  const [isSorted, setIsSorted] = useState(false)
  const [sortBy, setSortBy] = useState("title")

  const query = graphql`
    {
      allRestApiPosts {
        nodes {
          userId
          title
          body
          id
        }
      }
    }
  `
  const data = useStaticQuery(query)
  const [listPost] = useState(data.allRestApiPosts.nodes)
  const [isUpdatedList, setisUpdatedList] = useState(listPost)

  const filterByUserId = () => {
    const val = document.getElementById("inputRef").value
    const int = parseInt(val)

    const filtered = listPost.filter(option => option?.userId === int)
    setisUpdatedList(filtered)
  }

  const reset = () => {
    setisUpdatedList(listPost)
  }

  const getList = () => {
    if (!isShown) {
      setIsShown(true)
    } else {
      setIsShown(false)
    }
  }

  const handleSort = value => {
    if (sortBy === value && isSorted) {
      setIsSorted(false)
      const sortDescending = isUpdatedList
        .slice()
        .sort((a, b) => b?.[sortBy]?.localeCompare(a?.[sortBy]))

      setisUpdatedList(sortDescending)
    } else {
      setIsSorted(true)
      const sortAscending = isUpdatedList
        .slice()
        .sort((a, b) => a?.[sortBy]?.localeCompare(b?.[sortBy]))
      setisUpdatedList(sortAscending)
      setSortBy(value)
    }
  }

  return (
    <div className="flex">
      <div className="w-1/5  h-auto p-5">
        <button
          className="w-full bg-black text-white py-3 px-5 rounded-lg my-3 hover:bg-orange-500 hover:text-black"
          onClick={getList}
        >
          Get list
        </button>
        <button
          className="w-full bg-black text-white py-3 px-5 rounded-lg my-3 hover:bg-orange-500 hover:text-black"
          onClick={() => handleSort("title")}
        >
          {isSorted ? "Descending" : "Ascending"}
        </button>
        <div className="flex gap-3">
          <button
            className=" bg-black text-white py-3 px-5 rounded-lg my-3 hover:bg-orange-500 hover:text-black"
            onClick={filterByUserId}
          >
            Filter
          </button>
          <input
            id="inputRef"
            placeholder="Enter userID"
            className="w-full p-2 px-4 my-3 text-left text-black bg-white border placeholder:text-xs placeholder:text-left md:text-left placeholder:md:text-left focus:outline-none"
          />
        </div>
        <button
          className="w-full bg-black text-white py-3 px-5 rounded-lg my-3 hover:bg-orange-500 hover:text-black"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="w-4/5  h-auto">
        {isShown && (
          <div className="grid grid-flow-rows grid-cols-3 gap-4">
            {isUpdatedList.map(post => {
              const { id, title, userId, body } = post
              return (
                <div
                  className="p-5 border rounded-2xl hover:bg-gray-200 "
                  key={id}
                >
                  <p className="text-md text-cyan-600 font-extrabold">
                    {title}
                  </p>
                  <p className="text-md text-red-600 font-extrabold">
                    {userId}
                  </p>
                  <p className="text-sm text-black font-medium italic">
                    {body}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllPost
