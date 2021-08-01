import { Card, CardHeader, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, InputGroup, Input, Button, FormGroup, Label} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Home} from 'react-feather'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AddPage = () => {
  const [desarolladorSeleccionado, setDesarolladorSeleccionado] = useState({
    name: "",
    profesion: "",
    puesto: "",
    tecnologia: ""
  })
  const url = "http://localhost:3000/desarolladores/"
  const [data, setData] = useState([])

  const handleChange = e => {
    const {name, value} = e.target
    setDesarolladorSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(desarolladorSeleccionado)
  }
  const peticionGet = async() => {
    await axios.get(url)
    .then(response => {
      setData(response.data)
    })
  }

  const peticionPost = async() => {
    await axios.post(url, desarolladorSeleccionado)
    .then(response => {
      setData(data.concat(response.data))
      
    })
  }
  useEffect(async() => {
    await peticionGet()
  }, [])
   
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem className="pb-2">
          <Link to="#">
            {" "}
            <Home size={16} />{" "}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="#"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="home"> Desarolladores </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Agregar </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Agregar desarollador</CardTitle>
        </CardHeader>
        <CardBody className="d-flex column">
          <InputGroup className="m-2 " size="lg">
            <Input clasaName="m-4" placeholder="Nombre" name='name' onChange={handleChange} value={desarolladorSeleccionado.name} />
          </InputGroup>
          <InputGroup className="m-2 " size="lg" >
          
            <Input placeholder="Profesion" name='profesion' onChange={handleChange} value={desarolladorSeleccionado && desarolladorSeleccionado.profesion} />
          </InputGroup>
        </CardBody>
        <CardBody className="d-flex column">
          <InputGroup className="m-2 " size="lg">
          <FormGroup>
        <Label for="exampleSelect" className='h4' >Puesto</Label>
        <Input type="select" className='pl-5 pr-5' name="puesto" id="exampleSelect" onChange={handleChange} value={desarolladorSeleccionado && desarolladorSeleccionado.puesto}>
          <option >Elegir</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Fullstack</option>
          <option>UX/UI</option>
         
        </Input>
      </FormGroup>
          </InputGroup>
          <InputGroup className="m-2 " size="lg">
          <FormGroup>
        <Label for="exampleSelect" className='h4'>Tecnologia</Label>
        <Input type="select" className='pl-5 pr-5' name="tecnologia" id="exampleSelect"  onChange={handleChange} value={desarolladorSeleccionado && desarolladorSeleccionado.tecnologia}>
          <option >Elegir</option>
          <option>React</option>
          <option>Laravel</option>
          <option>Otras</option>
         
        </Input>
      </FormGroup>
          </InputGroup>
         
        </CardBody>
        <CardBody className='d-flex row justify-content-between pl-5 pr-5' >    
        <Button.Ripple className='' href='home' color='primary' outline>Cancelar</Button.Ripple>
        <Button.Ripple  color='primary' onClick={peticionPost} href='home'>Agregar</Button.Ripple> 
        </CardBody>

      </Card>
    </div>
  )
}

export default AddPage