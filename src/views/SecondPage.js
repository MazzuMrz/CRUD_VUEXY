import { Card, CardHeader, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, InputGroup, Input, Button, FormGroup, Label} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Home} from 'react-feather'
import { useState, useEffect } from 'react'
import axios from 'axios'

const SecondPage = () => {
  const url = "http://localhost:3000/desarolladores"
  const [peoples, setPeoples] = useState([])
  const [desarolladorSeleccionado, setDesarolladorSeleccionado] = useState({
    name: "",
    profesion: "",
    puesto: "",
    tecnologia: ""   
  })

  const handleChange = e => {
    const {name, value} = e.target
    setDesarolladorSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    })
      )
      
  }
  const peticionPost = async() => {
    await axios.post(url, desarolladorSeleccionado)
    .then((response) => {
      setPeoples(peoples.concat(response.peoples))
      
    })
    
  }
  useEffect(() => {
    peticionPost()
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
          <CardTitle>Agregar nuevo desarollador</CardTitle>
        </CardHeader>
        <CardBody className="d-flex column">
          
          <InputGroup className="m-2 " size="lg">
            <Input clasaName="m-4" name="name" placeholder="Nombre" Label="name" onChange={handleChange} />
          </InputGroup>
          <InputGroup className="m-2 " size="lg">
            <Input placeholder="Profesion" Label="profesion" name="profesion" onChange={handleChange} />
          </InputGroup>
        </CardBody>
        <CardBody className="d-flex column">
          <InputGroup className="m-2 " size="lg">
          <FormGroup>
        <Label for="exampleSelect" className='h4'>Puesto</Label>
        <Input type="select" className='pl-5 pr-5' name="select" id="exampleSelect"  name="puesto" onChange={handleChange}>
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
        <Input type="select" className='pl-5 pr-5' name="select" id="exampleSelect"  name="tecnologia" onChange={handleChange}>
          <option>React</option>
          <option>Laravel</option>
          <option>Otras</option>
         
        </Input>
      </FormGroup>
          </InputGroup>
         
        </CardBody>
        <CardBody className='d-flex row justify-content-between pl-5 pr-5' >    
        <Button.Ripple href='home' className='' color='primary' outline>Cancelar</Button.Ripple>
        <Button.Ripple  color='primary' onClick={() => peticionPost()} >Subir</Button.Ripple> 
        </CardBody>

      </Card>
    </div>
  )
}

export default SecondPage
