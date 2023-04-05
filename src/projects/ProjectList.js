import React, { useState } from "react";
import { Project } from "./Project";
import PropTypes from 'prop-types';
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

//accept the onSave event in the props

function ProjectList({projects, onSave}) {
    //add state to this component
    const [projectBeingEdited, setProjectBeingEdited] = useState({});
    //add the event handler in the function component
    const handleEditClick = (project) => {
        //this setter method comes thru React api context
        setProjectBeingEdited(project);
    }
    const cancelEditing = () => {
        setProjectBeingEdited({});
    };

    //add the onEdit event handler to the child component
    const cards = projects.map((project) => 
        <div key={project.id} className="cols-sm">
            {project === projectBeingEdited ? 
            (<ProjectForm project={project} onCancel={cancelEditing} onSave={onSave}/>) : 
            (<ProjectCard project={project} onEdit={handleEditClick}/>)}
        </div>
    );
    return (
        <div className="row">
            {cards}
        </div>
    );
}

/* with typescript you can define props types like so */
/* make it isRequired by adding the property at the end of the type */
ProjectList.propTypes = {
    projects: PropTypes.arrayOf(PropTypes.instanceOf(Project)).isRequired,
    onSave: PropTypes.func.isRequired
};
export default ProjectList;