import React, {useState, useEffect} from "react";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";
import PropTypes from "prop-types";
import { MOCK_PROJECTS } from "./MockProjects";
import ProjectList from "./ProjectList";

function ProjectsPage() {
    //remember, this is your state
    const [projects, setProjects] = useState<any | null>([]);
    //loading spinner
    const [loading, setLoading] = useState(false);
    //errors from loading data
    const [error, setError] = useState<string | null>(null);
    //lets add pagination to our state
    const [currentPage, setCurrentPage] = useState(1);
    
    //handleMoreClick event handler
    //this is to increment the page and then calling loadProjects
    const handleMoreClick = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };
    
    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(currentPage);
                if(currentPage === 1) {
                    setProjects(data);
                }
                else {
                    setProjects((projects: any) => [...projects, ...data]);
                }
            }
            catch(e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
            finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, [currentPage]);

    //use your PUT endpoing
    const saveProject = (project: Project) => {
        projectAPI.put(project)
        .then((updatedProject) => {
            let updatedProjects = projects.map((p:any) => {
                return p.is === project.id ? new Project(updatedProject) : p;
            });
            setProjects(updatedProjects);
        })
        .catch((e) => {
            setError(e.message);
        })
    }
    return(
        <>
            <h1>Projects</h1>
            {/* Display the error message above the PROJECT LIST */}
            {error && 
                (<div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>)
            }
            <ProjectList projects={projects} onSave={saveProject}/>
            {/* Your pagination here, display the More... button only when not loading */}
            {/* Handle the button click event and call your event handler */}
            {!loading && !error && (
                <div className="row">
                    <div className="col-sm-12">
                        <div className="button-group fluid">
                            <button className="button default" onClick={handleMoreClick}>
                                More...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display the loading indicator BELOW THE PROJECT LIST when loading is true*/}
            {loading && 
            (<div className="center-page">
                <span className="spinner primary"></span>
                <p>Loading...</p>
            </div>)
            }
        </>
    );
}


export default ProjectsPage;