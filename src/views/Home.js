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
  Modal,
  ModalBody,
  ModalFooter,
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
  const [agregarModal, setAgregarModal] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const url = "http://localhost:3000/desarolladores/"
  const [data, setData] = useState([])
  const [desarolladorSeleccionado, setDesarolladorSeleccionado] = useState({
    name: "",
    profesion: "",
    id: "",
    puesto: "",
    tecnologia: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setDesarolladorSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const seleccionarDesarollador = (Desarollador, caso) => {
      setDesarolladorSeleccionado(Desarollador)(caso === "Editar")
}

  const peticionGet = async () => {
    await axios.get(url).then((response) => {
      setData(response.data)
    })
  }
  useEffect(() => {
    peticionGet()
  }, [])

  const peticionDelete = async () => {
    await axios
      .delete(url + desarolladorSeleccionado.id)
      .then((response) => {
        setData(
          data.filter(
            (desarollador) => desarollador.id !== desarolladorSeleccionado.id
          )
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const peticionPut = async () => {
    await axios
      .put(baseUrl + desarolladorSeleccionado.id, desarolladorSeleccionado)
      .then((response) => {
        const dataNueva = data
        dataNueva.map((desarollador) => {
          if (desarollador.id === desarolladorSeleccionado.id) {
            desarollador.name = desarolladorSeleccionado.name
            desarollador.profesion = desarolladorSeleccionado.profesion
            desarollador.puesto = desarolladorSeleccionado.puesto
            desarollador.tecnologia = desarolladorSeleccionado.tecnologia
          }
        })
        setData(dataNueva)
        abrirCerrarModalEditar()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionPost = async () => {
    await axios
      .post(url, desarolladorSeleccionado)
      .then((response) => {
        setData(data.concat(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
    alert("Se agrego con exito, puede cerrar la ventana.")
  }

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
            <DropdownToggle color="flat-dark">
              <MoreVertical size="16px" />
            </DropdownToggle>
            <DropdownMenu className="text-center">
              <DropdownItem
                onClick={() => setModalEditar(!modalEditar)}
                onClick={ (event, rowData) => seleccionarDesarollador(rowData, "Editar")}
                tag="a"
              >
                Editar
                <Modal
                  isOpen={modalEditar}
                  toggle={() => setModalEditar(!modalEditar)}
                >
                  <ModalBody className="m-2 d-flex row">
                    <p className="h3">Editar desarollador</p>
                    <InputGroup className="m-2 " size="lg">
                      <Input
                        clasaName="m-4"
                        name="name"
                        placeholder="Nombre"
                        Label="name"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="m-2 " size="lg">
                      <Input
                        placeholder="Profesion"
                        Label="profesion"
                        name="profesion"
                        onChange={handleChange}
                      />
                    </InputGroup>
                    <InputGroup className="m-2 " size="lg">
                      <FormGroup>
                        <Label for="exampleSelect" className="h4">
                          Puesto
                        </Label>
                        <Input
                          type="select"
                          className="pl-5 pr-5"
                          name="select"
                          id="exampleSelect"
                          name="puesto"
                          onChange={handleChange}
                        >
                          <option>Elegir</option>
                          <option>Frontend</option>
                          <option>Backend</option>
                          <option>Fullstack</option>
                          <option>UX/UI</option>
                        </Input>
                      </FormGroup>
                    </InputGroup>
                    <InputGroup className="m-2 " size="lg">
                      <FormGroup>
                        <Label for="exampleSelect" className="h4">
                          Tecnologia
                        </Label>
                        <Input
                          type="select"
                          className="pl-5 pr-5"
                          name="select"
                          id="exampleSelect"
                          name="tecnologia"
                          onChange={handleChange}
                        >
                          <option>Elegir</option>
                          <option>React</option>
                          <option>Laravel</option>
                          <option>Otras</option>
                        </Input>
                      </FormGroup>
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => peticionPut(!modalEditar)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setModalEditar(!modalEditar)}
                    >
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
              </DropdownItem>
              <DropdownItem
                tag="a"
                className="text-danger"
                onClick={() => setModalEliminar(!modalEliminar)}
              >
                Eliminar
                <Modal
                  isOpen={modalEliminar}
                  toggle={() => setModalEliminar(!modalEliminar)}
                >
                  <ModalBody className="m-2">
                    <h3>Esta seguro que desea eliminar?</h3>
                    ATENCION: Esta accion NO se puede deshacer
                    <b>{data && data.name}</b>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      onClick={() => peticionDelete(!modalEliminar)}
                    >
                      Aceptar
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setModalEliminar(!modalEliminar)}
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
          <Button
            color="primary"
            onClick={() => setAgregarModal(!agregarModal)}
          >
            + Agregar
          </Button>
          <Modal
            isOpen={agregarModal}
            toggle={() => setAgregarModal(!agregarModal)}
          >
            <ModalBody className="m-2 d-flex row">
              <p className="h3">Agregar desarollador</p>
              <InputGroup className="m-2 " size="lg">
                <Input
                  clasaName="m-4"
                  name="name"
                  placeholder="Nombre"
                  Label="name"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="m-2 " size="lg">
                <Input
                  placeholder="Profesion"
                  Label="profesion"
                  name="profesion"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup className="m-2 " size="lg">
                <FormGroup>
                  <Label for="exampleSelect" className="h4">
                    Puesto
                  </Label>
                  <Input
                    type="select"
                    className="pl-5 pr-5"
                    name="select"
                    id="exampleSelect"
                    name="puesto"
                    onChange={handleChange}
                  >
                    <option>Elegir</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Fullstack</option>
                    <option>UX/UI</option>
                  </Input>
                </FormGroup>
              </InputGroup>
              <InputGroup className="m-2 " size="lg">
                <FormGroup>
                  <Label for="exampleSelect" className="h4">
                    Tecnologia
                  </Label>
                  <Input
                    type="select"
                    className="pl-5 pr-5"
                    name="select"
                    id="exampleSelect"
                    name="tecnologia"
                    onChange={handleChange}
                  >
                    <option>Elegir</option>
                    <option>React</option>
                    <option>Laravel</option>
                    <option>Otras</option>
                  </Input>
                </FormGroup>
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={() => peticionPost(!agregarModal)}
              >
                Aceptar
              </Button>
              <Button
                color="danger"
                onClick={() => setAgregarModal(!agregarModal)}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
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
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar Desarollador',
                onClick: (event, rowData) => seleccionarDesarollador(rowData, "Editar")
              },
              {
                icon: 'delete',
                tooltip: 'Eliminar Desarollador',
                onClick: (event, rowData) => seleccionarDesarollador(rowData, "Eliminar")
              }
            ]}
          />
        </CardBody>
      </Card>
    </div>
  )
}

export default Index
