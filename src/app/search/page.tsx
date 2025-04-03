import { Suspense } from "react";
import SearchPage from "@/components/Search";

export default function Page() {
    return (
        <Suspense fallback={<p>Loading search results...</p>}>
            <SearchPage />
        </Suspense>
    )
}