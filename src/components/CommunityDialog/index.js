
import React, { useState, useEffect, Component } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Select } from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import getCoursesByProfessor from 'services/getCoursesByProfessorId';
import firebaseApp from "../../firebase/credentials";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import {MyCommunityPage} from "pages/MyCommunity";

export class CommunityDialog extends Component {

  constructor(props) {
    super(props);
    const user = JSON.parse(localStorage.getItem("loggedAppUser"));
    const firestore = getFirestore(firebaseApp);
    this.state = {open: true,
                  courses: [],
                  age: '',
                  texto: '',
                  nombre: user.nombre,
                  id: user.id,
                  firestore: firestore,
                  course_id: null,
                  cantidad_alumnos: null, 
                  

    };
  //  console.log(this.props.onClose);
   // this.props.onClose = props;
   // this.handleClick = this.handleClick.bind(this);
   this.getCourses = this.getCourses.bind(this);

   var filtro;

   var nw;
  }


  componentDidMount() {
    //this.getCourses();
    this.getCourses();
    console.log(this.state.course_id);
  }

  handleOpen = () => {
    //setOpen(true);
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    
   this.setState({
    open: false
  });

  this.props.onClose();
  };

  handleChange = (event) => {
    this.setState({
      age: event.target.value,
      course_id: event.target.value
    });
    console.log(event.target.value);

  };

  handleChangeText = (event) => {
    this.setState({
      texto: event.target.value
    });

    console.log(event.target.value);
  };

  async getCourses(){

    await getCoursesByProfessor().then((data) => { 

      this.setState({
        courses: data
      });

    });

  }

  async getCantidadAlumnos(course_id){

    console.log('epa', course_id);

    await getCoursesByProfessor().then((data) => { 
      
      this.filtro = data.filter(alumno => alumno.id === course_id);
      
    });

   
    this.filtro.map((canal)=>{
      console.log('canal',canal.cantidadAlumnos);
      
        this.nw = canal.cantidadAlumnos;
      });

      this.setState({
        cantidad_alumnos: this.nw
      
    });
    
    console.log('get',this.state.cantidad_alumnos);
     /* filtro.map((canal) => {
        console.log(canal.alumnos.nombre);
      });*/
  }   

   addTopic = async () => {

    try{

      const docuRef = doc(this.state.firestore, `topics/${this.state.texto}`);
      console.log(this.state.texto);
      console.log(this.state.nombre);
      console.log(this.state.id);

     await this.getCantidadAlumnos(this.state.course_id);


      console.log('add',this.state.cantidad_alumnos);
      setDoc(docuRef, {

        id: new Date().getTime(),
        nombre: this.state.texto,
        author: this.state.nombre,
        author_id: this.state.id,
        course_id: this.state.course_id,
        cantidad_alumnos: this.state.cantidad_alumnos
      });

    }catch(e){

      console.log('error ', e);

    }
    
    this.props.onClose();

    this.setState({
      open: false
    });
        
  }

  render(){
  
  return (
   
    <div>      
      <Dialog open={this.state.open} onClose={this.handleClose}>
        <DialogTitle>Save a Topic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            required={true}
            id="name"
            name="sala"
            label="Topic name"
            value={this.state.texto}
            onChange={this.handleChangeText}
            type="text"
            fullWidth
            variant="standard"
            
          />
        <InputLabel id="demo-simple-select-label">Cursos</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.age}
            label="Age"
            onChange={this.handleChange}
            fullWidth
          >

          {this.state.courses ? this.state.courses.map((canal) => {
                
            return (
              
              <MenuItem key={canal.id} value={canal.id}>{canal.nombre}</MenuItem>
                  
              );
            })
            : null}

          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button disabled={ !this.state.texto } onClick={this.addTopic}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}
