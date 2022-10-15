import React from "react";
import CoursesIcons from "components/CoursesIcons";

export default function CoursesHeader({
     coursesNum,
     handleCategory,
     handleStatus,
     handleSearch,
     search
}) {
     return (
          <>
               <header className="flex justify-between">
                    <div className="flex items-center gap-3">
                         <h2 className="text-primary text-2xl">My Courses.</h2>
                         <span className="text-xl text-gray-400">
                              ({coursesNum})
                         </span>
                    </div>
                    <form className="flex items-center gap-2">
                         <div className="flex h-8 w-40 items-center rounded-lg border border-white bg-white">
                              <input
                                   type="text"
                                   placeholder="Find Course"
                                   className="h-full w-full px-2 text-xs outline-none"
                                   value={search}
                                   onChange={handleSearch}
                              />
                              <CoursesIcons name="search" />
                         </div>
                         <label className="text-sm text-gray-400">
                              Category
                         </label>
                         <select
                              className="h-8 w-28 rounded-lg border border-white px-2 text-xs text-gray-400"
                              onChange={handleCategory}
                         >
                              <option value="">All</option>
                              <option value="job">Job</option>
                              <option value="food">Food</option>
                         </select>
                         <label className="text-sm text-gray-400">Status</label>
                         <select
                              className="h-8 w-28 rounded-lg border border-white px-2 text-xs text-gray-400"
                              onChange={handleStatus}
                         >
                              <option value="">All</option>
                              <option value="completed">Completed</option>
                              <option value="in progress">In Progress</option>
                              <option value="no started">Not Started</option>
                         </select>
                    </form>
               </header>
          </>
     );
}
