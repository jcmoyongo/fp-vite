export const RadioButtonComponent = (props) => {
    const { changed, id, isSelected, label, value } = props;

    return (
      <div className="RadioButton flex flex-row">
        <input
          id={id}
          onChange={changed}
          value={value}
          type="radio"
          checked={isSelected}
        />
        <div>&nbsp;</div>
        {value && <img className="w-8" src={`/images/teams/${value}.png`}/>}
        <label className="flex items-center text-sm" htmlFor={id}>&nbsp;{label}</label>
        {/*<input id={id} class= {`peer/${value}`} type="radio" name={name}/>
        <label for={value} class={`peer-checked/${value}:text-sky-500`}> {label}</label>*/}
      </div>
    );
  };

  export default RadioButtonComponent;