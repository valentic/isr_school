import React from 'react'

const Footer = () => {

    return (
        <footer>
            Release {process.env.REACT_APP_RELEASE}. &nbsp; <a href={process.env.REACT_APP_ROOT_URL+"/admin"}>Admin</a>
        </footer>
    )

}

export { Footer }
