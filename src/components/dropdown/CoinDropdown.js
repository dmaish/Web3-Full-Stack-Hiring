import React, {useState} from "react";
import downArrows from '../../assets/down-arrows.png';
import './dropdown.css';

const CoinDropdown = ({ pickedOption, setPickedOption, optionsList }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const renderSelectedOption = (optionName) => {
    const filteredOption = optionsList?.find((option) => option?.name === optionName);
    return (
      <div 
        class="option d-flex justify-content-between align-items-center" 
        onClick={() => setOptionsOpen(true)}
      >
        <div>
          <img class="option-image" src={filteredOption?.asset} alt={filteredOption?.name}/>
          <span class="option-text">{filteredOption?.name.toUpperCase()}</span>
        </div>
        <div class="d-flex align-items-center">
          <img class="down-arrows-image" src={downArrows} alt='down-arrow'/>
        </div>
      </div>
    );
  }

  const selectOption = (e, optionName) => {
    e.stopPropagation();
    setPickedOption(optionName);
    setOptionsOpen(false);
  }

  return (
      <div class="parent">
          <div class="picked-option">
            {renderSelectedOption(pickedOption)}
          </div>
          <div class='options' style={{visibility: optionsOpen ? "visible": "hidden"}}>
            {optionsList?.map((optionItem) => {
              return(
              <div key={optionItem?.name} class="option selectable-option" onClick={(e) => selectOption(e, optionItem?.name)}>
                <img class="option-image" src={optionItem?.asset} alt={optionItem?.name}/> 
                <span class="option-text">{optionItem?.name.toUpperCase()}</span> 
              </div>
              )
            })}
          </div>
      </div>
  );
}

export default CoinDropdown;