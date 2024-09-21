import FormInput from "../elements/FormInput";
import UserIcon from "../icons/UserIcon";

function ItemsList({ form, setForm }) {
  function handleAdd() {
    setForm({
      ...form,
      products: [...form.products, { name: "", price: "", qty: "" }],
    });
  }
  function handleRemove(index) {
    const newProducts = [...form.products];
    if (newProducts.length < 2) {
      setForm({
        ...form,
        products: [{ name: "", price: "", qty: "" }],
      });
      return;
    }
    newProducts.splice(index, 1);
    setForm({ ...form, products: newProducts });
  }
  function handleChange(e, index) {
    const { name, value } = e.target;
    const newProducts = [...form.products];
    newProducts[index][name] = value;
    setForm({ ...form, products: newProducts });
  }
  return (
    <>
      {form.products.map((product, index) => {
        return (
          <div
            key={index}
            className="form-input__list grid grid-cols-3 gap-3 mt-6"
          >
            <ProductItem
              product={product}
              handleChange={(e) => handleChange(e, index)}
            />
            <div className="flex gap-4">
              <button
                className="bg-[#fff] text-[#2a2a2a]  px-2 py-1 rounded shadow-sm"
                onClick={handleAdd}
              >
                add item
              </button>
              <button
                className="bg-[#2a2a2a]  text-white font-bold px-2 py-1 rounded shadow-sm"
                onClick={() => handleRemove(index)}
              >
                remove item
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ItemsList;

function ProductItem({ product, handleChange }) {
  return (
    <>
      <FormInput
        Icon={UserIcon}
        id="name"
        placeholder="name"
        name="name"
        label="Product Name"
        value={product.name}
        type="text"
        onChange={handleChange}
      />
      <FormInput
        Icon={UserIcon}
        id="price"
        placeholder="price"
        name="price"
        label="Price"
        value={product.price}
        type="text"
        onChange={handleChange}
      />
      <FormInput
        Icon={UserIcon}
        id="qty"
        placeholder="qty"
        name="qty"
        label="qty"
        value={product.qty}
        type="text"
        onChange={handleChange}
      />
    </>
  );
}
