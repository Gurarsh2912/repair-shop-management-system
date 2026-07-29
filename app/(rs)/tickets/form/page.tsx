import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm"

export default async function TicketPageForm({
    searchParams,}:
    {
        searchParams: Promise<{ [key:string]: string | undefined }>
}) {
    try{
        const {customerId, ticketId} = await searchParams

        if(!customerId && !ticketId){
            return (
                <>
                    <h2 className="text-2xl mb-2 ">
                        TicketId or CustomerId is required to load ticket form
                        <BackButton title="Go Back" variant= "default" className="" />
                    </h2>
                </>
            )
        }

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

            if(!customer.active){
                <>
                    <h2 className="text-2xl mb-2 ">
                        CustomerID #{customerId} Not Active !!!
                        <BackButton title="Go Back" variant= "default" className="" />
                    </h2>
                </>
            }

            console.log(customer);
            return <TicketForm customer={customer}/>
        }

        if(ticketId){
            const ticket = await getTicket(parseInt(ticketId));
            if(!ticket){
                return (
                    <>
                        <h2 className="text-2xl mb-2 ">
                            TicketID #{ticketId} Not Found !!!
                            <BackButton title="Go Back" variant= "default" className="" />
                        </h2>
                    </>
                )
            }
            const customer = await getCustomer((await ticket).customerId)
            console.log("ticket:", ticket);
            console.log("customer:", customer);
            return <TicketForm customer={customer} ticket={ticket}/>

        }
        
    }catch(e){
        if(e instanceof Error){
            Sentry.captureException(e);
            throw e;
        }
    }
}