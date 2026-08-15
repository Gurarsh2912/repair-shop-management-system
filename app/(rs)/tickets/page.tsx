import TicketSearch from "./TicketSearch"
import { getOpenTickets } from "@/lib/queries/getOpenTickets"
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResult"
import TicketTable from "@/app/(rs)/tickets/TicketTable"

export const metadata = {
    title:  "Ticket Search", 
}

export default async function Tickets({
    searchParams,
}:{
    searchParams: Promise<{[key:string]: string | undefined}>
}){
    const {searchText} = await searchParams
    if(!searchText){
        const results = await getOpenTickets();
        return( //default results
            <>
                <TicketSearch/>
                {results.length ? <TicketTable data={results} />: <p>No Open Tickets Found</p>}
            </>
        )
    }

    const results = await getTicketSearchResults(searchText)

    return(  //search using params
        <>
            <TicketSearch/>
            {results.length ? <TicketTable data={results} />: <p>No Results Found</p>}
        </>
    )
    
}