import { useInfiniteQuery } from "@tanstack/react-query"
import { useSocket } from "@/components/providers/socket-provider"
import qs from "query-string"

interface ChatQueryProps{
    queryKey:string;
    apiUrl: string;
    paramKey: "channelId"|"conversationId";
    paramValue:string
}

const useChatQuery = ({queryKey,apiUrl,paramKey,paramValue}:ChatQueryProps) => {
    const {isConnected} = useSocket();

    const fetchMessages = async({ pageParam }: { pageParam?: string })=>{
        
        const queryParams = {
            ...(pageParam && { cursor: pageParam }), // Include cursor only if pageParam is defined
            [paramKey]: paramValue,
        };

        const url = qs.stringifyUrl({
            url:apiUrl,
            query:queryParams,
        }, {skipNull:true});
        
        const res = await fetch(url);
        return res.json(); 
    }
    
    const { data,fetchNextPage,hasNextPage,isFetchingNextPage, status} 
    = useInfiniteQuery({ queryKey:[queryKey], queryFn: fetchMessages,
        getNextPageParam:(lastPage)=>lastPage?.nextCursor, refetchInterval: isConnected? false: 1000
    })

    return {
        data,fetchNextPage,hasNextPage,isFetchingNextPage,status
    }
}

export default useChatQuery
