// components/CourseSelector.tsx
import React from 'react';


const CourseSelector = ({
  courses,
  selectedCourse,
  onCourseChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-1">
        เลือกหลักสูตร
      </label>
      <select
        id="course-select"
        value={selectedCourse}
        onChange={(e) => onCourseChange(e.target.value)}
        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {courses.length === 0 ? (
          <option value="">กำลังโหลดหลักสูตร...</option>
        ) : (
          courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default CourseSelector;

