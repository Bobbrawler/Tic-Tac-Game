import { ReactElement } from "react";
import "./style.css"

export interface IModeButtonProps {
    id: string;
    imageSrc: string;
}

const ModeButton = ({id, imageSrc}: IModeButtonProps): ReactElement => {
    return(
        <div
        className="mode-button"
        >
            <div className="image-container">
                <img className="mode-image" src={imageSrc} alt={id} />
            </div>
            <div className="mode-name">{id}</div>
        </div>
    )
}

export default ModeButton ;