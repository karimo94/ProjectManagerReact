import { Project } from "./Project";
import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

/* This component represents our card component for each Project */
function formatDescription(description) {
    return description.substring(0,60) + '...';
}
function ProjectCard(props) {
    //accept all props and set them as a pair (or more)
    const { project, onEdit } = props;
    const handleEditClick = (projectBeingEdited) => {
        onEdit(projectBeingEdited);
    }
    return(
        <div className="card">
            <img src={project.imageUrl} alt={project.name} />
            <section className="section dark">
                <Link to={'/projects/' + project.id}>
                    <h5 className="strong">
                        <strong>{project.name}</strong>
                    </h5>
                    <p>{project.description}</p>
                    <p>Budget : {project.budget.toLocaleString()}</p>
                </Link>
                <button className="bordered" onClick={()=> handleEditClick(project)}>
                    <span className="icon-edit "></span>
                    Edit
                </button>
            </section>
        </div>
    );
}
ProjectCard.propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    onEdit: PropTypes.func.isRequired
};
  
  export default ProjectCard;