import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

export default async function CustomerPageForm({
    searchParams,}:
    {
        searchParams: Promise<{ [key:string]: string | undefined }>
}) {
    try{
        const {customerId} = await searchParams

        if(customerId){
            const customer = await getCustomer(parseInt(customerId));

            if(!customer){
                return (
                    <>
                        <h2 className="text-2xl mb-2 ">
                            CustomerID #{customerId} Not Found !!!
                            <BackButton title="Go Back" variant= "default" className="" />
                        </h2>
                    </>
                )
            }
            console.log(customer);
        
        }
    }catch(e){
        if(e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}