import { useSearchParams } from 'next/navigation';

function useSearchParamsBy(param: string) {
    const searchParams = useSearchParams();

    return searchParams.get(param);
}

export default useSearchParamsBy;
