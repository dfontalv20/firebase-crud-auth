import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { createRequest, updateRequest } from '../services/request.service'
import { getServices } from '../services/services.service'
import Validator from 'validatorjs'

const validationRules = {
    category: ['required'],
    service: ['required'],
    description: ['required', 'string'],
    ubication: ['required', 'string'],
}

export default function RequestForm({ request = null, onCancelUpdating }) {
    const [services, setServices] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [description, setDescription] = useState('')
    const [ubication, setUbication] = useState('')
    const [updating, setUpdating] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const user = useContext(UserContext)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const services = await getServices();
                setServices(services)
                setSelectedCategory(services[0].category)
                setSelectedService(services[0].services[0])
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        if (request) {
            setSelectedCategory(request.category)
            setSelectedService(request.service)
            setDescription(request.description)
            setUbication(request.ubication)
            setUpdating(true)
            return
        }
        cleanInputs()
        setUpdating(false)
    }, [request])



    const handleSubmit = async (e) => {
        e.preventDefault();
        const validator = new Validator({
            category: selectedCategory,
            service: selectedService,
            description,
            ubication,
        }, validationRules)
        validator.setAttributeNames({
            category: 'categoria',
            service: 'servicio',
            description: 'descripcion',
            ubication: 'ubicacion',
        })
        const validInput = validator.check()
        setErrors(Object.values(validator.errors.errors))
        if(!validInput) return
        if (!updating) return handleCreateRequest()
        handleUpdateRequest()
    }

    const handleUpdateRequest = async () => {
        try {
            if (!request) throw new Error()
            await updateRequest(request.id, {
                userId: user.uid,
                category: selectedCategory,
                service: selectedService,
                description,
                ubication,
                date: new Date()
            })
            alert('Solicitud actualizada')
            cleanInputs()
            window.dispatchEvent(new Event('requestCreated'))
        } catch (error) {
            alert('Error al actualizar solicitud')
        }
    }
    const handleCreateRequest = async () => {
        try {
            await createRequest({
                userId: user.uid,
                category: selectedCategory,
                service: selectedService,
                description,
                ubication,
                date: new Date()
            })
            alert('Solicitud creada')
            cleanInputs()
            window.dispatchEvent(new Event('requestCreated'))
        } catch (error) {
            alert('Error al crear solicitud')
        }
    }

    const cleanInputs = () => {
        setUbication('')
        setDescription('')
        setSelectedCategory(services[0]?.category)
        setSelectedService(services[0]?.services[0])
    }

    return (
        <div className='card card-body'>
            {
                errors.length > 0 &&
                <div className="alert alert-danger" role="alert">
                    {
                        errors.map((error, idx) => <label key={idx}>{error[0]}</label>)
                    }
                </div>
            }
            {loading ? <center><span className='spinner-border my-5' /></center> :
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3>Nueva Solicitud</h3>
                    <div className='mt-4'>
                        <label className='form-label'>Categoria</label>
                        <select className='form-select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                            {
                                services.map(({ category }, idx) => <option key={idx}>{category}</option>)
                            }
                        </select>
                    </div>
                    <div className='mt-4'>
                        <label className='form-label'>Tipo</label>
                        <select className='form-select' value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                            {
                                selectedCategory ? services.find(({ category }) => category == selectedCategory).services.map((service, idx) => <option key={idx}>{service}</option>) : <></>
                            }
                        </select>
                    </div>
                    <div className='mt-4'>
                        <label className='form-label'>Descripcion</label>
                        <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className='mt-4'>
                        <label className='form-label'>Ubicacion</label>
                        <input className='form-control' type='text' value={ubication} onChange={(e) => setUbication(e.target.value)} required />
                    </div>
                    <div className='mt-4 d-flex justify-content-around'>
                        <button type='submit' className='btn btn-success'>{updating ? 'Actualizar' : 'Crear'}</button>
                        <button type='button' className='btn btn-danger' onClick={updating ? onCancelUpdating : cleanInputs}>{updating ? 'Cancelar' : 'Limpiar'}</button>
                    </div>
                </form>
            }
        </div>
    )
}
