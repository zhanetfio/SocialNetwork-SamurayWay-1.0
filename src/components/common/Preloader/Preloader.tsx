import React from 'react';
import loader from "../../../assets/images/Lazy-Loader.svg";

const Preloader = () => {
    return (
        <div>
            <img src={loader} alt={'preloader'}/>
        </div>
    );
};

export default Preloader;