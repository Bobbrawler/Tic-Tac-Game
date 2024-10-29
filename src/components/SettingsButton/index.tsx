import React, {Dispatch, SetStateAction, ReactElement} from "react";
import "./style.css"

export interface ISettingButtonProps {
    setSettingsStyle: Dispatch<SetStateAction<string>>;
    setMainContainerStyle: Dispatch<SetStateAction<string>>;
}

const SettingsButton = ({setSettingsStyle, setMainContainerStyle}: ISettingButtonProps): ReactElement => {

    const changeSettingStyle = () => {
        setSettingsStyle("settings-container-show");
        setMainContainerStyle("main-container-hidden");
        return;
    }

    return(
        <div className="settings-button">
            <img className="settings-button-image" onClick={changeSettingStyle} src="assets/images/settings.png" alt="settings" />
        </div>
    )
}

export default SettingsButton;

