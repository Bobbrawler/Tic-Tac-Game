import React, { ReactElement, Dispatch, SetStateAction } from "react";
import { modeList } from "../../utils/constants";
import ModeButton from "../ModeButton";
import Slider from "../Slider";
import "./style.css";

export interface ISettingsProps {
    settingsStyle: string;
    setSettingsStyle: Dispatch<SetStateAction<string>>;
    setMainContainerStyle: Dispatch<SetStateAction<string>>;
    setRows: Dispatch<SetStateAction<number>>;
    setCols: Dispatch<SetStateAction<number>>;
    rows: number;
    cols: number;
}

const Settings = ({
    settingsStyle,
    setSettingsStyle,
    setMainContainerStyle,
    rows,
    cols,
    setRows,
    setCols
}: ISettingsProps): ReactElement => {
    const closeSettings = () => {
        setSettingsStyle("settings-container-hidden");
        setMainContainerStyle("main-container-show");
        return;
    };

    return (
        <div className={settingsStyle}>
            <p className="settings-header">settings</p>

            <div className="modes-container">
                {modeList.map((mode) => (
                    <ModeButton
                        key={mode.id}
                        id={mode.id}
                        imageSrc={mode.imageSrc}
                    />
                ))}
            </div>

            <div className="sliders-container">
                <Slider key={"rows"} setValue={setRows} value={rows} name={"Count rows"} />
                <Slider key={"cols"} setValue={setCols} value={cols} name={"Count cols"}/>
            </div>

            <div className="close-settings-button" onClick={closeSettings}>
                close
            </div>
        </div>
    );
};

export default Settings;
