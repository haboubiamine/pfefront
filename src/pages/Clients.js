import React , {useState , useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter , MDBCol, MDBFormInline , MDBIcon } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuItem from '@material-ui/core/MenuItem';
import { MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'
import $ from 'jquery'
import Api_url from './../component/Api_url';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

// import { mdbTableEditor } from 'mdb-table-editor'


function Clients() {
    const token = localStorage.getItem('token')
    const [open, setopen] = useState(false)
    const [suppopen, setsuppopen] = useState(false)
    const [editopen, seteditopen] = useState(false)
    const history = useHistory();
    const [selectedrow, setselectedrow] = useState( {
      "id": 6,
      "Nom_compteCli": "amine",
      "description": "aaaaaaaaaaaaa",
      "createdAt": "2021-03-17T08:35:26.000Z",
      "updatedAt": "2021-03-17T08:39:45.000Z",
      "ServiceId": 1,
      "EquipeId": 1,
      "Equipe": {
          "id": 1,
          "Nom_equipe": "dream team",
          "createdAt": "2021-03-16T15:08:53.000Z",
          "updatedAt": "2021-03-16T15:08:53.000Z",
          "ServiceId": 1
      },
      "Service": {
          "id": 1,
          "Nom_service": "informatiqueeeee",
          "createdAt": "2021-03-16T15:08:36.000Z",
          "updatedAt": "2021-03-16T15:08:36.000Z"
      },
      "Clientimg": {
          "id": 2,
          "img_profile": "http://localhost:3001/clientimg/1615970126679.jpeg",
          "img_background": "http://localhost:3001/clientimg/1615970126707.jpeg",
          "createdAt": "2021-03-17T08:35:26.000Z",
          "updatedAt": "2021-03-17T08:35:26.000Z",
          "CompteClientId": 6
      }
  })

    const toggle = () =>{
        setopen(!open)
    }

    const toggleSupp = () =>{
      setsuppopen(!suppopen)
    }


    const changeselected = (client) =>{
      setselectedrow(client)
      console.log(selectedrow)
    }

    const toggleEdit = () =>{
     
      seteditopen(!editopen)

     
    } 

    useEffect(() => {
   // fonction affiche table
    const getclientlist = async ()=>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}clients/`,  
        });
        setclients(res.data)
        console.log(res)
    }

    const getequipe = async() =>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}equipe/`,  
        });
        setequipe(res.data)
        
        // console.log(res)
       
    }
    const getservice = async() =>{
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'get',
        url : `${Api_url}service/`,  
        });
        setservice(res.data)
        
    }

    getclientlist()
    getequipe()
    getservice()
    }, [])
  
    const [nomclient, setnomclient] = useState("")
    const [ServiceId, setServiceId] = useState("")
    const [EquipeId, setEquipeId] = useState("")

    const [clients, setclients] = useState([])
    const [equipe, setequipe] = useState([])
    const [service, setservice] = useState([])
    const [search, setsearch] = useState("")

    const [service_eq, setservice_eq] = useState([])

    const [profileimgprev, setprofileimgprev] = useState("")
    const [bgprevimg, setbgprevimg] = useState("https://p7.hiclipart.com/preview/816/475/744/star-thumbnail.jpg")
    const [description, setdescription] = useState("")

    const [num, setnum] = useState("")

// fonction add row table
    const Addclient = async (e) =>{
      e.preventDefault()

      const formData = new FormData();
      
        formData.append('clientimg[]',document.getElementById('client-img').files[0]);
        formData.append('clientimg[]',document.getElementById('client-bg').files[0]);
        formData.append('Nom_compteCli',nomclient);
        formData.append('ServiceId',ServiceId);
        formData.append('EquipeId',EquipeId);
        formData.append('description',description);
        

     
      const res = await axios({
        headers: {'Authorization': `Bearer ${token}`},
        method: 'post',
        url : `${Api_url}clients/`,
        data : formData
        
        });
        console.log(res)
        if(res.status === 200){
          toast.success(`Le client ${res.data.client.Nom_compteCli} a ??t?? ajout??e avec succ??s`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            });
              setTimeout(() => {
                setclients([res.data.client ,...clients])
              }, 500);

              setnomclient("")
              setprofileimgprev("")
              setbgprevimg("")
              setServiceId("")
              setEquipeId("")
              setdescription("")


            
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
    const updatedclient = async (e)=>{
      e.preventDefault()
      const formData = new FormData();
      // formData.append('clientimg[]',document.getElementById('up-client-img').files[0]);
      // formData.append('clientimg[]',document.getElementById('up-client-bg').files[0]);
      formData.append('Nom_compteCli',selectedrow.Nom_compteCli);
      formData.append('ServiceId',selectedrow.Service.id);
      formData.append('EquipeId',selectedrow.Equipe.id);
      formData.append('description',selectedrow.description);

      
      if (((document.getElementById('up-client-bg').files[0] !== undefined) === true) && ((document.getElementById('up-client-img').files[0] !== undefined) === false)){
        formData.append('clientimg[]',document.getElementById('up-client-bg').files[0]);
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}clients/update/clients/bg/${selectedrow.id}`,
          data : formData 
      });
     console.log(res)
     if(res.status === 200){
      toast.success(`Le client ${res.data.client.Nom_client} a ??t?? modif??e avec succ??s`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setclients(
              clients.map(item => 
                item.id === res.data.client.id 
                ? res.data.client 
                : item )
            )
           
            console.log(res.data.client.Service.Nom_service)
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
       
        
      }else if(((document.getElementById('up-client-bg').files[0] !== undefined) === false ) && ((document.getElementById('up-client-img').files[0] !== undefined) === true)){
        formData.append('clientimg[]',document.getElementById('up-client-img').files[0]);
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}clients/update/clients/prof/${selectedrow.id}`,
          data : formData
          
      });
     console.log(res)
     if(res.status === 200){
      toast.success(`Le client ${res.data.client.Nom_client} a ??t?? modif??e avec succ??s`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setclients(
              clients.map(item => 
                item.id === res.data.client.id 
                ? res.data.client 
                : item )
            )
           
            console.log(res.data.client.Service.Nom_service)
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
      else if(((document.getElementById('up-client-bg').files[0] !== undefined) === true) && ((document.getElementById('up-client-img').files[0] !== undefined) === true)){
        formData.append('clientimg[]',document.getElementById('up-client-img').files[0]);
      formData.append('clientimg[]',document.getElementById('up-client-bg').files[0]);
        const res = await axios({
          headers: {'Authorization': `Bearer ${token}`},
          method: 'put',
          url : `${Api_url}clients/update/clients/${selectedrow.id}`,
          data : formData
      });
     console.log(res)
     if(res.status === 200){
              toast.success(`Le client ${res.data.client.Nom_client} a ??t?? modif??e avec succ??s`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                });
                  setTimeout(() => {
                    // $(`#${res.data.client.id} #Nomcli`).text(res.data.client.Nom_compteCli)  
                    // $(`#${res.data.client.id} #sercli`).text(res.data.client.Service.Nom_service)  
                    // $(`#${res.data.client.id} #eqcli`).text(res.data.client.Equipe.Nom_equipe)  
                    // $(`#${res.data.client.id} #img .prof_img`).attr("src",res.data.client.Clientimg.img_profile)
                    
                    setclients(
                      clients.map(item => 
                        item.id === res.data.client.id 
                        ? res.data.client 
                        : item )
                    )
                   
                    console.log(res.data.client.Service.Nom_service)
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

     
  
     
  //       if(res.status === 200){
  //         toast.success(`Le client ${res.data.client.Nom_client} a ??t?? modif??e avec succ??s`, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           });
  //             setTimeout(() => {
  //               $(`#${res.data.client.id} #Nomcli`).text(res.data.client.Nom_compteCli)  
  //               $(`#${res.data.client.id} #sercli`).text(res.data.client.Service.Nom_service)  
  //               $(`#${res.data.client.id} #eqcli`).text(res.data.client.Equipe.Nom_equipe)  
  //               $(`#${res.data.client.id} .prof_img`).attr("src",res.data.client.Clientimg.img_profile)  

  //               console.log(res.data.client.Service.Nom_service)
  //             }, 200);   
  //             seteditopen(!editopen)
  //       }
  //       else {
  //         toast.error('error', {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           });
  //       }
    }

// fonction delete row table
const Suppclient = async (e)=>{
  e.preventDefault()
  const res = await axios({
    headers: {'Authorization': `Bearer ${token}`},
    method: 'delete',
    url : `${Api_url}clients/${selectedrow.id}`
   
    
});

    if(res.status === 200){
      toast.success(`Le client ${res.data.compteCli.Nom_compteCli} a ??t?? supprim??e avec succ??s`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        });
          setTimeout(() => {
            setclients(
                clients.filter(item =>item.id !== res.data.compteCli.id)
            )
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
 
    var value = $("#client-search").val().toLocaleLowerCase()
    $("#client-body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
     console.log( $(this).text())
    });
  
}

const prev = () =>{
  const url = URL.createObjectURL(document.getElementById('client-img').files[0])
  setprofileimgprev(url)
 }

 const prev2 = () =>{
  const url = URL.createObjectURL(document.getElementById('client-bg').files[0])
  setbgprevimg(url)
 }


 const upprev = () =>{
  const url = URL.createObjectURL(document.getElementById('up-client-img').files[0])
  // Clientimg img_profile img_background
  setselectedrow({...selectedrow , Clientimg :{
    ...selectedrow.Clientimg,
    img_profile : url
  }})
 }

 const upprev2 = () =>{
  const url = URL.createObjectURL(document.getElementById('up-client-bg').files[0])
  setselectedrow({...selectedrow , Clientimg :{
    ...selectedrow.Clientimg,
    img_background : url
  }})
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
      

      {/* <!-- Page Header--> */}
          <header class="page-header">
            <div class="container-fluid">
              <h2 class="no-margin-bottom">Liste des clients</h2>
            </div>
          </header>
          {/* <!-- Breadcrumb--> */}
          <div class="breadcrumb-holder container-fluid">
            <ul class="breadcrumb">
              <li class="breadcrumb-item"><a href="home">Home</a></li>
              <li class="breadcrumb-item active">Client</li>
            </ul>
          </div>


        <div className="row  justify-content-center">
            <div className="col-10 text-center">
            

            <div className="row col-12 mb-2">
              <div className="col-9"> 
              <MDBCol >
                <MDBFormInline className="md-form">
                  <MDBIcon icon="search" />
                  <TextField className="ml-3 " size="small" label="Recherche" variant="outlined" id="client-search" type="text" onChange={()=>{filter()}}/>
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
                        <th>Nom du client</th>
                        <th>Service</th>
                        <th>Equipe</th>
                        <th style={{width:150}}>Action</th>
                      </tr>
                    </thead>
                    <tbody id="service-body">


                      {
                        clients.map((client , index)=>(
                            <tr key={index} id={client.id} >
                        <td> {client.id}</td>
                        <td id="img"  className=" d-flex justify-content-start align-items-center "> <Avatar className=" prof_img ml-3" src={client.Clientimg.img_profile} style={{width: 30, height :30}} /> <span id="Nomcli" className="ml-3 text-center">{client.Nom_compteCli}</span></td>
                        <td id="sercli"  className=""> <div className="d-flex  float-center " >{client.Service.Nom_service}</div> </td>
                        <td id="eqcli" > {client.Equipe.Nom_equipe}</td>
                        <td>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="secondary" onClick={()=> {changeselected(client);toggleSupp()}}>
                        <DeleteIcon />
                        </IconButton>
                        <IconButton className="mr-3" size="small" aria-label="delete" color="primary" onClick={()=>{changeselected(client);setservice_eq(
                          equipe.filter(item =>item.Service.id === client.Service.id)
                        ); toggleEdit()}}>
                        <EditIcon />
                        </IconButton>     
                        <IconButton size="small" aria-label="delete" color="primary" onClick={()=>{history.push(`/client/${client.id}`)}} style={{color :"#388e3c"}}>
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
                <MDBModalHeader toggle={()=>toggle()} className="text-center">Ajouter un nouveau client</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
                  <div className="col-6 mt-5">
                    <div className="text-right right_button">
                    <input accept="image/*"  id="client-bg" type="file"  style={{display:'none'}} onChange={()=>{prev2()}} required/>
                    <label htmlFor="client-bg">
                      <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                        <PhotoCamera style={{color:'#c2c1c1'}}/>
                      </IconButton>
                    </label>
                    </div>
                <div  className="d-flex justify-content-center " >
                  <div id="client-background">
                  <img  style={{width:"100%", height:230 , borderRadius:10}} className=""  alt="" src={bgprevimg} />
                  </div>
                  <div id="client-image">
                  <Avatar style={{width:160, height:160}}  alt="" src={profileimgprev} />
                  <input accept="image/*"  id="client-img" type="file" className="mb-3"  style={{display:'none'}} onChange={()=>{prev()}}   required/>
                  <label htmlFor="client-img">
                    <IconButton className="mt-5" color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera style={{color:'#2DCD94'}}/>
                    </IconButton>
                  </label>
                  </div>
                
            
             </div>
               
            </div>
            <div className="col-6">
              <TextField className="col-8 mt-2" value={nomclient} onChange={(e)=>{setnomclient(e.target.value)}} id="standard-basic" label="Nom du client" required /><br />
              <TextField value={description} onChange={(e)=>{setdescription(e.target.value)}} className="col-8 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={7} />
             
              <TextField
                        className=" ml-2 col-4 mb-5 mt-3"
                        id="standard-select-currency"
                        select
                        variant="outlined"
                        
                        required
                        size="small"
                        label="Service"
                        value={ServiceId}
                        onChange={(e)=>{setServiceId(e.target.value); setservice_eq(
                          equipe.filter(item =>item.Service.id === e.target.value)
                        )}}
                      >

                      {
                        service.map((ser , index)=>(
                          <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                        ))
                      }
                      
                      </TextField>


                      <TextField
                        className="ml-2 mt-3 mb-5 col-4"
                        id="standard-select-currency"
                        select
                        required
                        variant="outlined"
                        size="small"
                        label="equipe"
                        value={EquipeId}
                        onChange={(e)=>{setEquipeId(e.target.value)}}
                      >

                      {
                        service_eq.map((eq , index)=>(
                          <MenuItem key={index} value={eq.id}>{eq.Nom_equipe}</MenuItem>
                        ))
                      }
                      
                      </TextField>
                    
                      <Button onClick={(e)=>{Addclient(e)}} variant="outlined" class="btn btn-outline-success mb-5">
                      Ajouter
                      </Button> 
                      </div>
                </form>
                </MDBModalBody>
                </MDBModal>
                        {/* MODAL EDIT */}
                <MDBModal isOpen={editopen} toggle={()=>toggleEdit()} size="lg">
                <MDBModalHeader toggle={()=>toggleEdit()} className="text-center">Modifier les donn??es du client</MDBModalHeader>
                <MDBModalBody>
                <form className="row col-12 justify-content-center align-middle" >
                  <div className="col-6 mt-5">
                    <div className="text-right right_button">
                    <input accept="image/*"  id="up-client-bg" type="file"  style={{display:'none'}} onChange={()=>{upprev2()}} required/>
                    <label htmlFor="up-client-bg">
                      <IconButton className="" color="primary"  aria-label="upload picture" component="span">
                        <PhotoCamera style={{color:'#c2c1c1'}}/>
                      </IconButton>
                    </label>
                    </div>
                <div  className="d-flex justify-content-center " >
                  <div id="client-background">
                  <img  style={{width:"100%", height:230 , borderRadius:10}} className=""  alt="a" src={selectedrow.Clientimg.img_background} />
                  </div>
                  <div id="client-image">
                  <Avatar style={{width:160, height:160}}  alt="a" src={selectedrow.Clientimg.img_profile} />
                  <input accept="image/*"  id="up-client-img" type="file" className="mb-3"  style={{display:'none'}} onChange={()=>{upprev()}}   required/>
                  <label htmlFor="up-client-img">
                    <IconButton className="mt-5" color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera style={{color:'#2DCD94'}}/>
                    </IconButton>
                  </label>
                  </div>
                
            
             </div>
               
            </div>
            <div className="col-6">
              <TextField className="col-8 mt-2" value={selectedrow.Nom_compteCli} onChange={(e)=>{setselectedrow({...selectedrow , Nom_compteCli:e.target.value})}} id="standard-basic" label="Nom du client" required /><br />
              <TextField value={selectedrow.description} onChange={(e)=>{setselectedrow({...selectedrow , description:e.target.value})}} className="col-8 mt-3" id="time" type="text" label="description" multiline={true} variant="outlined" size="small" rows={7} />
             
              <TextField
                        className=" ml-2 col-4 mb-5 mt-3"
                        id="standard-select-currency"
                        select
                        variant="outlined"
                        
                        required
                        size="small"
                        label={"Service"}
                        value={selectedrow.Service.id}
                        onChange={(e)=>{setselectedrow({...selectedrow , Service:{
                          ...selectedrow.Service,
                          id: e.target.value
                        }}); 
                        setservice_eq(
                          equipe.filter(item =>item.Service.id === e.target.value)
                        )}}
                      >

                      {
                        service.map((ser , index)=>(
                          <MenuItem key={index} value={ser.id}>{ser.Nom_service}</MenuItem>
                        ))
                      }
                      
                      </TextField>

                      
                      <TextField
                        className="ml-2 mt-3 mb-5 col-4"
                        id="standard-select-currency"
                        select
                        required
                        variant="outlined"
                        size="small"
                        label="equipe"
                        value={selectedrow.Equipe.id}
                        onChange={(e)=>{setselectedrow({...selectedrow , Equipe : {
                          ...selectedrow.Equipe ,
                          id: e.target.value
                        }})}}
                      >

                      {
                        service_eq.map((eq , index)=>(
                          <MenuItem key={index} value={eq.id}>{eq.Nom_equipe}</MenuItem>
                        ))
                      }
                      
                      </TextField>
                      <Button onClick={(e)=>{updatedclient(e)}} variant="outlined" class="btn btn-outline-success">
                      Modifier
                      </Button> 
                     
                      </div>
                
                      
               
                </form>
                </MDBModalBody>
                </MDBModal>


                      {/* MODAL SUPP */}
                <MDBModal isOpen={suppopen} toggle={()=>toggleSupp()} size="lg">
                <MDBModalHeader toggle={()=>toggleSupp()} className="text-center sm">Supprimer le client</MDBModalHeader>
                    <MDBModalBody>
                        <div className="row col-12 ">
                          <div >
                            <p>vous les vous vraiment supprimer ce client ?</p>
                          </div>
                        </div>
                  </MDBModalBody> 
                  <div>
                <MDBModalFooter>
                        <Button color="primary" variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={(e)=>{Suppclient(e)}}>Supprimer</Button>
                        <Button color="primary" variant="contained" color="primary"  onClick={()=>toggleSupp()}>annuler</Button>
                </MDBModalFooter>
                </div>
                </MDBModal>


      {/* <div class="container">
        <mdb-table-editor
        :data="datatable"
        striped
        bordered
       /> */}
</div>
            </div></>
      
    );
}

export default Clients