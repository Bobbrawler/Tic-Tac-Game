import { type ReactElement, Dispatch, SetStateAction, ChangeEvent } from "react";
import "./style.css";

export interface IPlayerNameFieldProps {
    id: string;
    icon: string;
    color: string;
    name: string;
    playersNames: string[];
    updatePlayersNames: Dispatch<SetStateAction<string[]>>;
}

const PlayerNameField = ({
    id,
    icon,
    color,
    name,
    playersNames,
    updatePlayersNames,
}: IPlayerNameFieldProps): ReactElement => {

    const changeName = (event: ChangeEvent<HTMLInputElement>) => {
        let currentPlayersNames = [...playersNames];
        currentPlayersNames[Number(id)] = event.target.value;
        updatePlayersNames(currentPlayersNames)
    }

    return (
        <div className="name-field-container">
            <div className="icon" style={{ backgroundColor: color }}>
                {icon}
            </div>
            <div className="name-info-container">
                <div className="name-header">PLAYER {id}</div>
                <input
                id="nickname-input"
                type="text"
                value={name}
                onChange={changeName}
                style={{color: color}}
                className="name-field"
                />
            </div>
        </div>
    );
};

export default PlayerNameField;
