import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Visibility from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import GroupIcon from '@material-ui/icons/Group';
// import { mdbTableEditor } from 'mdb-table-editor'


function Equipe() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const history = useHistory();
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    
    const [selectedrow, setselectedrow] = useState({id: 26, Nom_equipe: "hhhh", Service: "Telephonie", createdAt: "2021-03-09T15:20:45.000Z", updatedAt: "2021-03-09T15:20:45.000Z"})
    const [services, setservices] = useState([])
    const [servicename, setservicename] = useState(selectedrow.Service.Nom_service)
    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (equipe) =>{
      setselectedrow(equipe)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    useEffect(() => {
   // fonction affiche table
    const getequipelist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });
        setequipes(res.data)
        console.log(res)
       
    }


    const getservices = async () =>{
    
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'get',
          url : `${Api_url}service/`,  
          });
            setservices(res.data)
          
    }

    getequipelist()
    getservices()
    }, [])
   
    const [nomequipe, setnomequipe] = useState("")
    const [service, setservice] = useState("")
    const [equipes, setequipes] = useState([]);

    const [search, setsearch] = useState("")
// fonction add row table
    const Addequipe = async (e) =>{
      e.preventDefault()
      const data = {
        ServiceID :service,
        nomEquipe:nomequipe,
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}equipe/`,
        data
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`L'??quipe ${res.data.equipe.Nom_equipe} a ??t?? ajout??e avec succ??s`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setequipes([res.data.equipe ,...equipes])
              }, 500);

              setnomequipe("")
              setservice("")


            
        }
        else {
          toast.error('error', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
        }
          
        
    

    }
  
  // fonction update table
    const updatedequipe = async (e)=>{
      e.preventDefault()
      const data = {
        ServiceID :servicename,
        nomEquipe:selectedrow.Nom_equipe,
      }
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'put',
        url : `${Api_url}equipe/update/equipe/${selectedrow.id}`,
        data
        
    });

    console.log(res)
   
        if(res.status === 200){
          toast.success(`L'??quipe ${res.data.equipe.Nom_equipe} a ??t?? modif??e avec succ??s`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
           
              setTimeout(() => {
                $(`#${res.data.equipe.id} #Nomeq`).text(res.data.equipe.Nom_equipe)
                $(`#${res.data.equipe.id} #Ser`).text(res.data.equipe.Service.Nom_service)
              }, 200);   
              seteditopen(!editopen)
        }
        else {
          toast.error('error', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
        }
    }

// fonction delete row table
const Suppequipe = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}equipe/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`L'??quipe ${res.data.equipe.Nom_equipe} a ??t?? supprim??e avec succ??s`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            $(`#${res.data.equipe.id}`).hide()
            $(`#${res.data.equipe.id}`).removeClass("true")
          }, 200);   
          setsuppopen(!suppopen)
    }
    else {
      toast.error('error', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
    }
}

const filter = () =>{
    var value = $("#equipe-search").val().toLocaleLowerCase()
    $("#equipe-body .true").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     console.log( $(this).text())
    }); 
}



    return (
      <>
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      
   
        <div className="row  justify-content-center">
            <div className="col-10 text-center">
            

            <div className="row col-12 mb-2">
              <div className="col-9"> 
              <MDBCol >
                <MDBFormInline className="md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" label="Recherche" variant="outlined" id="equipe-search" type="text" onChange={()=>{filter()}}/>
                </MDBFormInline>
              </MDBCol>
               </div> 
               <div className="col-3"> 
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={()=>toggle(!open)}> Ajouter </Button> 
               </div>
            </div> 
                <Table  striped bordered hover>
                    
                    <thead>
                    <tr>
                        <th style={{width:50}}>#</th>
                        <th>Equipe</th>
                        <th>Service</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="equipe-body">


                      {
                        equipes.map((equipe , index)=>(
                            <tr className="true" key={index} id={equipe.id}>
                        <td> {equipe.id}</td>
                        <td id="Nomeq" > {equipe.Nom_equipe}</td>
                        <td id="Ser"> {equipe.Service ? equipe.Service.Nom_service : "no service"}
                        <IconButton className="float-right mr-2" size="small" aria-label="delete" color="primary" >
                        <GroupIcon /> <span className="ml-2" style={{fontSize:15}}>{equipe.Users.length}</span>
                        </IconButton> </td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(equipe);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(equipe); toggleEdit()}}>
                        <EditIcon />
                        </IconButton>
                        <IconButton size="small" aria-label="eye" onClick={()=>{history.push(`/equipe/${equipe.id}`)}} style={{color :"#388e3c"}} >
                        <Visibility />
                        </IconButton>     
                        </td>
                      </tr>
                          ))
                      }
                      


                    </tbody>
            </Table>

                        {/* MODAL ADD */}
              <MDBModal isOpen={open} toggle={()=>toggle()} size="lg">
                <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter une nouvelle ??quipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={nomequipe} onChange={(e)=>{setnomequipe(e.target.value)}} id="standard-basic" label="Nom de l'equipe" required />
                      <TextField
                        className="ml-5"
                        id="standard-select-currency"
                        select
                        required
                        size="medium"
                        label="Service"
                        value={service}
                        onChange={(e)=>{setservice(e.target.value)}}
                      >

                      {
                        services.map((ser , index)=>(
                          <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                        ))
                      }
                      
                      </TextField>

                      
                      </div>
                      <Button onClick={(e)=>{Addequipe(e)}} variant="outlined" className="btn btn-outline-success">
                      Ajouter
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les donn??es de l'??quipe</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
              <div>
              <div className="mb-5">
              <TextField value={selectedrow.Nom_equipe} onChange={(e)=>{setselectedrow({...selectedrow , Nom_equipe : e.target.value})}} id="standard-basic" label="Nom de l'equipe" />
                      <TextField
                        className="ml-5"
                        id="standard-select-currency"
                        select
                        size="medium"
                        label="Service"
                        defaultValue="aaaaa"
                        value={servicename}
                        onChange={(e)=>{setservicename(e.target.value)}}
                      >

                    { 
                        services.map((ser , index)=>(
                          <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                        ))
                      }
                      </TextField>

                      
                      </div>
                      <Button onClick={(e)=>{updatedequipe(e)}} variant="outlined" className="btn btn-outline-success">
                      Modifier
                      </Button> 
                </div>
                </form>
                </MDBModalBody>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer l'??quipe</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer cette ??quipe ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppequipe(e)}}>Supprimer</Button>
                        <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
                </MDBModalFooter>
                </div>
                </MDBModal>


      {/* <div className="container">
        <mdb-table-editor
        :data="datatable"
        striped
        bordered
       /> */}
</div>
            </div></>
      
    );
}

export default Equipe