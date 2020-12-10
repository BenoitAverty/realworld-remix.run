import React, {FC} from "react";

const Tag: FC = function Tag({children}) {
    return (<a href="" className="tag-pill tag-default">{children}</a>)
};

export default Tag;