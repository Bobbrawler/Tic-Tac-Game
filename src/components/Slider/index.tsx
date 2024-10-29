import { useState, ReactElement, Dispatch, SetStateAction } from "react";
import "./style.css";

export interface ISliderProps {
    setValue: Dispatch<SetStateAction<number>>;
    value: number;
    name: string;
}

const Slider = ({ value, setValue, name }: ISliderProps): ReactElement => {
    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);

        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };

    return (
        <div className="container">
            <div className="slider-name">
                {name}: {value}
            </div>
            <input
                type="range"
                onChange={changeValue}
                min={1}
                max={10}
                step={1}
                value={value}
                className="custom-slider"
            ></input>
        </div>
    );
};

export default Slider;
