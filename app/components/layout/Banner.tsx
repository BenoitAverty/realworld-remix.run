import React, {FC} from "react";

const Banner: FC = function Banner({ children }) {
    return (
        <div className="banner">
            <div className="container">
                {children}
            </div>
        </div>
    )

};

export default Banner;