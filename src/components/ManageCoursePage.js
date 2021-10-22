import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import * as courseApi from '../api/courseApi';
import { toast } from 'react-toastify';

const ManageCoursePage = props => {

  const [errors, setErrors] = useState({});

  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(() => {
    const slug = props.match.params.slug; // `/courses/:slug1`
    if (slug) {
      courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
    }
  }, [props.match.params.slug])

  function handleChange({target}) {
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(!formIsValid()) return;
    courseApi.saveCourse(course).then( () => {
      // Bc this component was loaded via ReactRouter, we have access to those props
      props.history.push('/courses');
      toast.success('Course Saved')
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title Is Required";
    if (!course.authorId) _errors.authorId = "Author ID Is Required";
    if (!course.category) _errors.category = "Category Is Required";

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
    </>
  )
};

export default ManageCoursePage;
