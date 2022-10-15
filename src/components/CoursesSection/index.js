import React from "react";
import { Link } from "wouter";

import CoursesList from "components/CoursesList";

export default function CourseListSection({ title, courses, link, url }) {
  return (
    <section className="flex w-full flex-col gap-5 p-5 md:p-10">
      {title ? (
        <div className="flex items-center gap-5">
          <h2 className="mr-5 font-Barlow text-2xl font-semibold text-primary">
            {title}
          </h2>
          <Link
            href={link}
            className="rounded-xl bg-accent py-1 px-2 text-sm font-medium text-primary"
          >
            Browse All
          </Link>
        </div>
      ) : (
        <></>
      )}
      <CoursesList courses={courses} url={url} />
    </section>
  );
}
