import { Card, CardHeader, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, InputGroup, Input, Button, FormGroup, Label} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Home} from 'react-feather'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Editpage = () => {
  const url = "http://localhost:3000/desarolladores"
  const [peoples, setPeoples] = useState([])
  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setPeoples(response.data)
    })
  }
  useEffect(() => {
    peticionGet()
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
          <span> Editar </span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Editar desarollador</CardTitle>
        </CardHeader>
        <CardBody className="d-flex column">
          <InputGroup className="m-2 " size="lg">
            <Input clasaName="m-4" placeholder="Nombre" />
          </InputGroup>
          <InputGroup className="m-2 " size="lg">
          
            <Input placeholder="Profesion" />
          </InputGroup>
        </CardBody>
        <CardBody className="d-flex column">
          <InputGroup className="m-2 " size="lg">
          <FormGroup>
        <Label for="exampleSelect" className='h4'>Puesto</Label>
        <Input type="select" className='pl-5 pr-5' name="select" id="exampleSelect">
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
        <Input type="select" className='pl-5 pr-5' name="select" id="exampleSelect">
          <option>React</option>
          <option>Laravel</option>
          <option>Otras</option>
         
        </Input>
      </FormGroup>
          </InputGroup>
         
        </CardBody>
        <CardBody className='d-flex row justify-content-between pl-5 pr-5' >    
        <Button.Ripple className='' href='home' color='primary' outline>Cancelar</Button.Ripple>
        <Button.Ripple  color='primary'>Editar</Button.Ripple> 
        </CardBody>

      </Card>
    </div>
  )
}

export default Editpage