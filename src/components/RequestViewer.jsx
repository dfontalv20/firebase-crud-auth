import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { deleteRequest, getUserRequests } from '../services/request.service'

export default function RequestViewer({ onRequestUpdate }) {
    const user = useContext(UserContext)
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        loadUserRequests()
    }, [user])

    useEffect(() => {
      window.addEventListener('requestCreated', () => loadUserRequests())
    }, [])
    

    const loadUserRequests = async () => {
        if (user) {
            try {
                setLoading(true)
                const userRequests = await getUserRequests(user)
                setRequests(userRequests)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        }
    }

    const handleUpdateRequest = (request) => onRequestUpdate(request)
    const handleDeleteRequest = (request) => {
        const confirm = window.confirm('¿Esta seguro que desea eliminar esta solicitud?')
        if (confirm) {
            deleteRequest(request.id)
            alert('Solicitud eliminada')
            loadUserRequests()
        }
    }

    return (
        <div className='card card-body'>
            <div className='py-2 w-100 d-flex'>
                <h3>SOLICITUDES</h3>
                <button className='btn btn-primary ms-auto' onClick={loadUserRequests} disabled={loading}><i className="bi bi-arrow-clockwise" /></button>
            </div>
            <div>
                {
                    loading ? <center><span className='spinner-border my-5' /></center> :
                        requests.length === 0 ? <center>Sin solicitudes</center> :
                            requests.map(request =>
                                <div className='card card-body bg-secondary my-1 text-white' key={request.id}>
                                    <div className="row">
                                        <div className="col-10">
                                            <dt>{`${request.category} (${request.service})`}</dt>
                                            <dd>{request.ubication}</dd>
                                            <dd>{request.date.toLocaleString()}</dd>
                                            <dd>{request.description}</dd>
                                        </div>
                                        <div className="col-2 d-flex flex-column justify-content-center align-items-center">
                                            <button className='btn btn-warning my-1 w-100' onClick={() => handleUpdateRequest(request)}><i className='bi bi-pencil'/></button>
                                            <button className='btn btn-danger my-1 w-100' onClick={() => handleDeleteRequest(request)}><i className='bi bi-trash'/></button>
                                        </div>
                                    </div>

                                </div>
                            )
                }
            </div>
        </div>
    )
}
