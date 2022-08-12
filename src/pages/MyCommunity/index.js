import React, { useState, useEffect, Component } from "react";
import { Link } from "wouter";
import firebaseApp from "../../firebase/credentials";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import getAllUsers from "services/getAllUsers";
import CommunityCard from "components/CommunityCard";
import { CommunityDialog } from "components/CommunityDialog";
import getCoursesByProfessor from "services/getCoursesByProfessorId";


export class MyCommunityPage extends React.Component {

  constructor() {
    super();
    const firestore = getFirestore(firebaseApp);
    const user = JSON.parse(localStorage.getItem("loggedAppUser"));
    const username = user.nombre.split(" ").slice(0, 1);
    this.state = {students: [],
                  user: user,
                  listaCanales: [],
                  username: username,
                  firestore: firestore,
                  showDialog: false,
                  professor: [],
                  course_id_get: [],
                  alumnos_totales: []

      
    }

    this.getCanales = this.getCanales.bind(this);

    this.agregarCanal = this.agregarCanal.bind(this);

    this.getProfessor = this.getProfessor.bind(this);

    var filtro;
  }

  componentDidMount() {
   /* getCanales();
    getStudents(); */

      this.getCanales();
      this.getProfessor();
    
//    this.getStudents();
  }

  async getProfessor(){

    await getCoursesByProfessor().then((data) => {
      
      this.setState({
        professor: data
      });

    });

   // let approved = data.filter(student => student.rol === 'Alumno');

    this.state.professor.map((canal)=>{

      console.log(canal.cantidadAlumnos);
    });

  }
  

  

  async getCanales(){

    const canalesArr = [];

      const collectionRef = collection(this.state.firestore, "topics");

      const canalesCifrados = await getDocs(collectionRef);
        canalesCifrados.forEach((canalCifrado) => {
        canalesArr.push(canalCifrado.data());
        });

        this.setState({
          listaCanales: canalesArr
        });        
    
    this.setState({
      showDialog: false
    });
      
  }

  agregarCanal (){  
    
        this.setState({
          showDialog: true
        });
    
     }

     async getStudents(){

      await getAllUsers().then((data) => { 
        
        let approved = data.filter(student => student.rol === 'Alumno');
  
        this.setState({
          students: approved
        });

      });
  
    }

  render(){ 

  return (

    <div className="w-full p-5">
      <div className="bg-primary flex w-full flex-col rounded-xl p-5">
        <span className="text-xl font-semibold text-white">
          Welcome {this.state.username} to I Speak Community
        </span>
        <span className=" text-white">
          Select a topic and start practicing!
        </span>
        <div>
          <br></br>

          {this.state.user.rol === "Profesor" ? (
                      <button className="bg-accent text-primary w-40 rounded-md p-1 text-sm font-semibold" onClick={this.agregarCanal} >
                      Create topic
                    </button>
          ) : (
            <p></p>
          )}

          {this.state.showDialog ? (
                      <CommunityDialog onClose={() =>this.getCanales()}  />
          ) : null}
          


        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-5 mt-5">

        {this.state.listaCanales ? this.state.listaCanales.map((canal, index) => {

               
                     
                return (
                    
                  
                  <div  key={canal.id} className="max-w-sm rounded  overflow-hidden shadow-lg" >
                    <div  className="px-6 py-4" >
                      
                      <div className="grid grid-cols-2 gap-2" >
                      
                       <div className="mt-2 col-end-1 "> <small className="text-base text-gray-400">{canal.cantidad_alumnos} Students</small></div> 

                       {this.state.user.rol === "Profesor" ? (


                     <div className="mt-2 col-end-4	">  <CommunityCard  topic = {canal} /></div>
                     ) : (
                      <p></p>
                    )}

                        
                      </div>


                      
                      <div className="font-bold text-xl mb-2"><Link key={canal.id} href={`/community/${canal.id}`}>{canal.nombre}  </Link>                  

                      </div>
                      <small className="text-base text-gray-400">Author</small>
                      <p className="text-gray-700 text-base">
                        {canal.author}
                      </p>
                    </div>
                      
                  </div>
                                   
                );
              })
            : null}
      </div>
    </div>
   
  );
  
}

}
