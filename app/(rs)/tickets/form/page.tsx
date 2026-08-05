import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as Kindeinit} from "@kinde/management-api-js";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { customerId, ticketId } = await searchParams

    if (!customerId && !ticketId) return {
        title: 'Missing Ticket ID or Customer ID'
    }

    if (customerId) return {
        title: `New Ticket for Customer #${customerId}`
    }

    if (ticketId) return {
        title: `Edit Ticket #${ticketId}`
    }
}

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

        const {getPermission, getUser} = getKindeServerSession();
        const [managerPermission, user] = await Promise.all([
            getPermission("manager"), getUser(),
        ])
        const isManager = managerPermission?.isGranted

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

            if(isManager){
                Kindeinit() //Kinde Management API
                const{users} = await Users.getUsers();
                const techs = users? users.map(user=>({ id: user.email!, description: user.email!})): []
                
                return <TicketForm customer={customer} techs = {techs}/>
            }
            else{
            return <TicketForm customer={customer}/>
            }
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
            if(isManager){
                Kindeinit() //Kinde Management API
                const{users} = await Users.getUsers();
                const techs = users? users.map(user=>({ id: user.email!, description: user.email!})): []
                
                return <TicketForm customer={customer} ticket={ticket} techs = {techs}/>
            }else{
                const isEditable = user?.email?.toLowerCase()===ticket.tech.toLowerCase()
                return <TicketForm customer={customer} ticket={ticket} isEditable = {isEditable}/>
            }
        }

    }
        
    catch(e){
        if(e instanceof Error){
            Sentry.captureException(e);
            throw e;
        }
    }
}