import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function usePolling(searchParams: string | null, ms: number = 6000){
    const router = useRouter();

    useEffect(()=>{
        const IntervalId = setInterval(()=>{
            console.log("Interval Running")
            if(!searchParams){
                console.log("refreshing")
                router.refresh();
            }
        }, ms)
        return ()=> clearInterval(IntervalId)
    }, [searchParams, ms]) //eslint-diable-line react-hooks/exhaustive-deps
}