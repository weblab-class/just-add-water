import React from 'react';
function Wizard(props){
    /**
     * @param tutorialStep
     */
    const text = {"0":"welcome! here's a quick tutorial to get you started"}
    return(
        <div className="caption">
            {text[props.tutorialStep+""]}
        </div>
    )
}
export default Wizard