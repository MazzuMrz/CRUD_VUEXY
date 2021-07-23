import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledButtonDropdown 
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Link } from "react-router-dom"
import axios from "axios"
import { Home, MoreVertical, ChevronLeft, ChevronRight } from "react-feather"
import { useState, useEffect } from "react"

const Index = () => {
  const [basicModal, setBasicModal] = useState(false)
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

  const columnas = [
    {
      name: "ID",
      selector: "id",
      sorteable: true
    },
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
            <DropdownToggle color="flat-dark">
              <MoreVertical size="16px" />
            </DropdownToggle>
            <DropdownMenu className="text-center">
              <DropdownItem href="edit" tag="a">
                Editar
              </DropdownItem>
              <DropdownItem
                tag="a"
                className="text-danger"
                onClick={() => setBasicModal(!basicModal)}
              >
                Eliminar
                <Modal
                  isOpen={basicModal}
                  toggle={() => setBasicModal(!basicModal)}
                >
                  <ModalBody className="m-2">
                    <h3>Esta seguro que desea eliminar?</h3>
                    ATENCION: Esta accion NO se puede deshacer
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => setBasicModal(!basicModal)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setBasicModal(!basicModal)}
                    >
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
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
          <Button href="second-page" color="primary">
            + Agregar
          </Button>
        </CardHeader>
        <hr />
        <CardBody className="text-center">
          <DataTable
            columns={columnas}
            data={peoples}
            pagination
            fixedHeader 
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default Index