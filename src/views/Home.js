import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown,
  InputGroup,
  Input,
  FormGroup,
  Label
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import axios from "axios"
import { Home, MoreVertical, Check } from "react-feather"
import { useState, useEffect } from "react"

const Index = () => {
 
  const url = "http://localhost:3000/desarolladores/"
  const [data, setData] = useState([])
  const [desarolladorSeleccionado, setdesarolladorSeleccionado] = useState({
    id: "",
    name: "",
    profesion: "",
    puesto: "",
    tecnologia: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setdesarolladorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setData(response.data)
    })
  }

  const peticionPut = async() => {
    await axios.put(url + desarolladorSeleccionado.id, desarolladorSeleccionado)
    .then(response => {
      const dataNueva = data
      dataNueva.map(desarollador => {
        if (desarollador.id === desarolladorSeleccionado.id) {
          desarollador.name = desarolladorSeleccionado.name
          desarollador.profesion = desarolladorSeleccionado.profesion
          desarollador.puesto = desarolladorSeleccionado.puesto
          desarollador.tecnologia = desarolladorSeleccionado.tecnologia
        }
      })
      setData(dataNueva)
      abrirCerrarModalEditar()
    }).catch(error => {
      console.log(error)
    })
  }

  const peticionDelete = async() => {
    await axios.delete(url + 2)
    .then(response => {
      setData(data.filter(desarollador => desarollador.id !== desarolladorSeleccionado.id))
      alert('Se ha eliminado con exito')
      location.reload()
    })
  }

  
  useEffect(() => {
    peticionGet()
  }, [])
  
  const columnas = [
    {
      name: "Nombre",
      selector: "name",
      sorteable: true
    },
    {
      name: "Profesion",
      selector: "profesion",
      sorteable: true
    },
    {
      name: "Puesto",
      selector: "puesto",
      sorteable: true
    },
    {
      name: "Tecnologia",
      selector: "tecnologia",
      sorteable: true
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="flat-dark" >
              <MoreVertical size="16px"  />
            </DropdownToggle>
            <DropdownMenu className="text-center" >
              <DropdownItem
                href='edit'
                tag="a"
              >
                Editar
                
              </DropdownItem>
              <DropdownItem
                tag="a"
                className="text-danger"
                onClick={() => peticionDelete()}
              >
                Eliminar
                
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </div>
      )
    }
  ]

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
        <BreadcrumbItem active>
          <span> Desarolladores </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Tabla de desarolladores</CardTitle>
          <Button
            color="primary"
            href='second-page'
          >
            + Agregar
          </Button>
        
        </CardHeader>
        <hr />
        <CardBody>
          <DataTable
            data={data}
            columns={columnas}
            noHeader
            selectableRows
            selectableRowsComponentProps={{
              color: "primary",
              icon: <Check className="vx-icon" size={12} />,
              label: "",
              size: "sm"
            }}
            
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default Index
