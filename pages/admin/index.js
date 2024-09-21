import { useRouter } from "next/router";
import { useEffect } from "react";


function Index() {
    const router=useRouter();
    useEffect(() => {
        router.replace('admin/dashboard')
    }, [])
 return(
    <></>
 )
}

export default Index;
