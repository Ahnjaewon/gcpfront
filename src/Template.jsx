import React from 'react';
import {Outlet} from "react-router";

const Template = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Template;