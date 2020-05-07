import React, {Suspense} from "react";

export default function WaitingComponent({children}) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
}
