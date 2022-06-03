import React, { useState } from 'react'
import Navbar from './Navbar'
import RequestForm from './RequestForm'
import RequestViewer from './RequestViewer'

export default function Dashboard() {

    const [requestUpdating, setRequestUpdating] = useState(null)

    const handleUpdateRequest = (request) => setRequestUpdating(request)
    const handleCancelUpdating = () => setRequestUpdating(null)

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row mt-1 g-3">
                    <div className="col-12 col-lg-4">
                        <RequestForm request={requestUpdating} onCancelUpdating={handleCancelUpdating}/>
                    </div>
                    <div className="col-12 col-lg-8">
                        <RequestViewer onRequestUpdate={handleUpdateRequest}/>
                    </div>
                </div>
            </div>

        </>
    )
}
