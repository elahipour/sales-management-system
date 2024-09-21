function FormInput({value,onChange,id,name,type,placeholder,Icon}) {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <Icon/>
      <input type={type} name={name} id={id} onChange={onChange} value={value} placeholder={placeholder} className="grow"/>
    </label>
  );
}

export default FormInput;
