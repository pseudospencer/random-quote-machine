import React from 'react';

function Footer(props) {
    return (
        <footer id="footer">
            <div className="footer-container">
                <div className="footer-row-container">
                    <p>Designed and built by Spencer James in 2018.</p>
                </div>
                <div className="footer-row-container">
                    <p><a href="https://github.com/pseudospencer" target="_blank">GitHub</a>
                    <a href="https://spencerleejames.com" target="_blank">UX Portfolio</a>
                    <a href="https://www.linkedin.com/in/spencerleejames/" target="_blank">LinkedIn</a></p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
