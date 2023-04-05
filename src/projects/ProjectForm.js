import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Project } from './Project';

//any new object you want to initialize in your state, you do so like this
//const [objX, setObjX] = useState({name: ''}); etc

//accept a function in the child component as a prop and invoke it
function ProjectForm({project: initialProject, onCancel, onSave}) {

    //create an event handler to handle form submission
    //the function should prevent default behavior of the browser to 
    //POST to the server and then invoke the function passed into onSave() prop
    const handleSubmit = (event) => {
        event.preventDefault();
        //checking whether data is valid
        if(!isValid())  return;
        onSave(project);
    }

    //state variable project using useState hook
    const [project, setProject] = useState(initialProject);
    //error variable part of the state
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        budget: ''
    });

    //validate function for error checking
    function validate(project) {
        let errors = {name: '', description: '', budget: ''};
        if(project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if(project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be at least 3 chars';
        }
        if(project.description.length === 0) {
            errors.description = 'Description is required';
        }
        if(project.budget === 0) {
            errors.budget = 'Budget must be more than $0';
        }
        return errors;
    }
    function isValid() {
        return(
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    //event handler for the input and textarea components
    const handleChange = (event) => {
        const {type, name, value, checked} = event.target;
        
        //if input type is checkbox use checked
        //otherwise, its a type text, number -> use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is a number, convert from string
        if(type === 'number') {
            updatedValue = Number(updatedValue);
        }
        //otherwise its a text value
        const change = {
            [name]: updatedValue
        };

        //finally compile into Project object
        let updatedProject;
        setProject((p) => {
            updatedProject = new Project({...p,...change});
            return updatedProject;
        });

        //validate the data set
        setErrors(() => validate(updatedProject));
    }

    //updated so they are controlled forms that account for value changes
    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange}/>
        {/* after each input display the validation messages */}
        {errors.name.length > 0 && 
        (
        <div className="card error">
            <p>{errors.name}</p>
        </div>
        )};

        <label htmlFor="description">Project Description</label>
        <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}/>
        {errors.description.length > 0 && 
        (
        <div className="card error">
            <p>{errors.description}</p>
        </div>
        )};
        
        <label htmlFor="budget">Project Budget</label>
        <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange}/>
        {errors.budget.length > 0 && 
        (
        <div className="card error">
            <p>{errors.budget}</p>
        </div>
        )};


        <label htmlFor="isActive">Active?</label>
        <input type="checkbox" name="isActive" value={project.isActive} onChange={handleChange}/>
        <div className="input-group">
            <button className="primary bordered medium">Save</button>
            <span />
            {/* invoke your onCancel here */}
            <button type="button" className="bordered medium" onClick={onCancel}>
            cancel
            </button>
        </div>
        </form>
    );
}
ProjectForm.propTypes = {
    project: PropTypes.instanceOf(Project),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

export default ProjectForm;