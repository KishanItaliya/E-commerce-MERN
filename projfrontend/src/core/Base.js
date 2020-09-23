import React from 'react'
import Menu from "./Menu"
import "../styles.css"

const Base = ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white p-4",
    children 
}) => (
        <div>
            <Menu />
            <div className="container-fluid title-top">
                <div className="bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
            <footer className="footer bg-dark mt-auto py-2">
                <div className="container-fluid bg-success text-white text-center py-2 footer-font">
                    <p>If you got any questions, feel free to reach out</p>
                    <button className="btn btn-warning btn-md cbtn">Contact Us</button>
                </div>
                <div className="container-fluid text-center footer-font">
                    <span className="text-muted">
                        An Amazing <span className="text-white">MERN</span> Bootcamp
                    </span>
                </div>
            </footer>
        </div>
    )

export default Base
