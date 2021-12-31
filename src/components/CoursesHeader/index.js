import React from "react";
import CoursesIcons from "../CoursesIcons";

export default function CoursesHeader () {
  return <>
    <header className="flex justify-between">
        <div className="flex items-center gap-3">
        <h2 className="text-primary text-2xl">Your Courses.</h2>
        <span className="text-gray-400 text-xl">(12)</span>
        </div>
        <form className="flex items-center gap-2">
          <div className="flex items-center h-8 w-40 rounded-lg border border-white bg-white">
          <input type="text" placeholder="Find Course" className="px-2 text-xs h-full w-full outline-none"/>
          <CoursesIcons name="search" />
          </div>
          <label className="text-sm text-gray-400">Category</label>
          <select className="h-8 w-28 rounded-lg border border-white text-xs text-gray-400 px-2">
            <option value=''>All</option>
            <option value=''>English</option>
            <option value=''>Job</option>
            <option value=''>Food</option>
          </select>
          <label className="text-sm text-gray-400">Status</label>
          <select className="h-8 w-28 rounded-lg border border-white text-xs text-gray-400 px-2">
            <option value=''>All</option>
            <option value=''>Completed</option>
            <option value=''>In Progress</option>
            <option value=''>No</option>
          </select>
        </form>
      </header>
  </>;
}