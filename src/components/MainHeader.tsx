import React from 'react';
// style

const MainHeader: React.FC<any> = ({ name, description }) => (
    <div className="container">
        <h1 className="header__name">{name}</h1>
        <p className="header__description">{description}</p>
    </div>
);

export default MainHeader;