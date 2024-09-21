import FormInput from "../elements/FormInput";
import UserIcon from "../icons/UserIcon";
import ItemsList from "./ItemsList";

function Form({ form, setForm }) {
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <>
      <div className="form-input grid grid-cols-3 gap-3">
        <FormInput
          Icon={UserIcon}
          id="firstname"
          placeholder="firstname"
          name="firstname"
          value={form.firstname}
          type="text"
          onChange={handleChange}
          label={"FirstName"}
        />
        <FormInput
          Icon={UserIcon}
          id="lastname"
          placeholder="lastname"
          name="lastname"
          value={form.lastname}
          type="text"
          onChange={handleChange}
          label={"LastName"}
        />
        <FormInput
          Icon={UserIcon}
          id="email"
          placeholder="email"
          name="email"
          value={form.email}
          type="email"
          onChange={handleChange}
          label={"Email"}
        />
        <FormInput
          Icon={UserIcon}
          id="phone"
          placeholder="phone"
          name="phone"
          value={form.phone}
          type="number"
          onChange={handleChange}
          label={"Phone"}
        />
        <FormInput
          Icon={UserIcon}
          id="address"
          placeholder="address"
          name="address"
          value={form.address}
          type="text"
          onChange={handleChange}
          label={"Address"}
        />
        <FormInput
          Icon={UserIcon}
          id="date"
          placeholder="date"
          name="date"
          value={form.date && new Date(form.date).toISOString().slice(0, 10)}
          type="date"
          onChange={handleChange}
          label={"date"}
        />
        <FormInput
          Icon={UserIcon}
          id="postalCode"
          placeholder="postalCode"
          name="postalCode"
          value={form.postalCode}
          type="text"
          onChange={handleChange}
          label={"Postal Code"}
        />
      </div>
      {
        <div className="item-list">
          <ItemsList form={form} setForm={setForm} />
        </div>
      }
    </>
  );
}

export default Form;
