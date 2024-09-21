import Card from "../modules/Card"

function Customers({customers}) {
  return (
    <div>
        {
            customers?.map(customer=>{
                return <Card key={customer._id} customer={customer}/>
            })
        }
    </div>
  )
}

export default Customers