import React, {FC} from "react";

type FeedToggleProps = {
    tag?: string;
}

const FeedToggle: FC<FeedToggleProps> = function FeedToggle({ tag }) {
    return (
        <div className="feed-toggle">
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <a className="nav-link" href="">Your Feed</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="">Global Feed</a>
                </li>
                {tag && <li className="nav-item">
                    <a className="nav-link" href="">#{tag}</a>
                </li>}
            </ul>
        </div>
    )
};

export default FeedToggle;