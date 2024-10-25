import { ReactElement } from "react";
import "./style.css"

export interface IStatusProps {
    info: string;
    player: string;
    imageSrc: string;
}

const Status = ({info, player, imageSrc}: IStatusProps): ReactElement => {


    return(
        <div className="status-container">
            <div className="image-container">
                <img className="status-image" src={imageSrc} alt={info} />
            </div>

            <div className="status-info-container">
                <div className="status-header">STATUS</div>
                <div className="status-info">
                    {`${info} ${player}`}
                </div>
            </div>
        </div>
    )
}

export default Status;