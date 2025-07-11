
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

function App() {
  //variable de estado
  const [productos,setProductos]=useState([]);

  const [formularioAgregar,SetAgregarProducto]=useState({
    nombre:'',
  });
  const [formularioEditar,SetEditarProducto]=useState({
    nombre:'',
  });
  const [productoId,SetProductoId]=useState(null);
  const [busqueda,SetBusqueda]=useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [mostrar, setMostrar] = useState(false);
  const CerrarModal = () => setMostrar(false);
  const AbrirModal = () => setMostrar(true);

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch('http://localhost:3001/api/productos');
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      alert('ERROR' + error);
    }
  },[]);

  useEffect(()=>{
    fetchProductos();
  },[fetchProductos]);

  const Agregar=async(e)=>{
    e.preventDefault();
    if(!formularioAgregar.nombre.trim()){
      alert('Nombre requerido');
      return;
    }
    try{
     const respuesta=await fetch(`http://localhost:3001/api/productos`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioAgregar
        })
      });
      if(!respuesta.ok){
        let errorMensaje='Error al cargar';
        try{
          const error=await respuesta.json();
          errorMensaje=error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      handleClose();
      Swal.fire({
        title: "!Se agrego correctamente el Producto!",
        icon: "success",
        draggable: true,
        timer:2000
      });
      SetAgregarProducto({
        nombre:'',
      })
      fetchProductos();

    }catch(error){
      console.error(error);
      Swal.fire({
        title: "!No se pudo agregar el nuevo producto!",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }

  }
  const cambiosFormularioAgregar=async(e)=>{
    SetAgregarProducto({
      ...formularioAgregar,
      [e.target.name]:e.target.value
    })
  }
  const EditarProductos=(producto)=>{
    SetEditarProducto({
      nombre:producto.nombre
    });
    SetProductoId(producto.id);
    AbrirModal();
  }
  const cambiosFormularioEditar=(e)=>{
    SetEditarProducto({
      ...formularioEditar,
      [e.target.name]:e.target.value
    });
  }
  const EditarProducto=async(e)=>{
    e.preventDefault();
    if(!formularioEditar.nombre.trim()){
      alert('Nombre requerido');
      return;
    }
    try{
     const respuesta=await fetch(`http://localhost:3001/api/productos/${productoId}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...formularioEditar
        })
      });
      if(!respuesta.ok){
        let errorMensaje='Error al cargar';
        try{
          const error=await respuesta.json();
          errorMensaje=error.message || errorMensaje
        }catch(error){
          console.error(errorMensaje);
        }
        throw new Error(errorMensaje);
      }
      CerrarModal();
      Swal.fire({
        title: "!Se edito correctamente el Producto!",
        icon: "success",
        draggable: true,
        timer:2000
      });
      fetchProductos();

    }catch(error){
      console.error(error);
      Swal.fire({
        title: "!No se pudo editar el nuevo producto!",
        icon: "error",
        draggable: true,
        timer:2000
      });
    }
  }
 const EliminarProducto=async(id)=>{
  Swal.fire({
    title: "¿Estas seguro de que deseas eliminar este registro?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Si, Eliminar!"
  }).then(async(result) => {
    if (result.isConfirmed) {
      try{
        await fetch(`http://localhost:3001/api/productos/${id}`,{
          method:`DELETE`
        });
        Swal.fire({
          title: "¡Producto Eliminado Correctamente!",
          icon: "success",
          timer:2000
        });
        fetchProductos();
      }catch(error){
        Swal.fire({
          title: "¡No se pudo eliminar el producto",
          icon: "success",
          timer:2000
        });
      }
      
    }
  });
 }
 const columnas=[
  {
    name:'ID',
    selector: row=>row.id,
    sortable:true
  },
  {
    name:'Nombre',
    selector:row=>row.nombre,
    sortable:true
  },
  {
    name:'Acciones',
    cell:row=>(
      <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-warning"  onClick={()=>{EditarProductos(row)}}><CiEdit /></button>
              <button type="button" className="btn btn-danger" onClick={()=>{EliminarProducto(row.id)}}><MdDeleteForever /></button>
      </div>
    )
  }
 ];
 const PaginacionOpciones={
   rowsPerPageText:'Filas por pagina'
 };


  return (
    <div className="contendor">
      <div style={{margin:'30px 0px'}}>
       <Button variant="primary" onClick={handleShow}>Crear</Button>
      </div>
       <Form.Control
        type='text'
        placeholder='Buscar producto'
        className='mb-3'
        value={busqueda}
        onChange={(e)=>{SetBusqueda(e.target.value)}}
       />

       <DataTable
        columns={columnas}
        data={productos.filter(producto=>
          producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        )}
        pagination
        highlightOnHover
        striped
        paginationComponentOptions={PaginacionOpciones}
       />
    

    {/*Modal para Agregar nuevo producto*/}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioAgregar}
                value={formularioAgregar.nombre}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={Agregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Modal para Editar*/}
      <Modal show={mostrar} onHide={CerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                name='nombre'
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombre}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={EditarProducto}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;