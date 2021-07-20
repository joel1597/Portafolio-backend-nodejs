'use strict'

const Proyecto = require('../models/proyectos');
const fs = require('fs');
const dirpath = require('path');

const proyectoController = {

	save: (req, res) => {

		let Pmodel = new Proyecto();
		let params = req.body;

		Pmodel.name = params.name;
		Pmodel.description = params.description;
		Pmodel.category = params.category;
		Pmodel.langs = params.langs;
		Pmodel.year = params.year;

		Pmodel.save( (err, projectstored) => {
			if(err) return res.status(500).send({message: "error al guardar el documento"});
			if(projectstored) return res.send({proyectos: projectstored});
		});

	},

	getProject: (req, res) => {

		let ProjectId = req.params.id;

		if( ProjectId==null )
			return res.status(200).send({message: 'El proyecto no existe'});

		Proyecto.findById(ProjectId, (err, Proyecto) => {

			if(err) return res.status(200).send({message:'Error al devolver los datos'});

			if(!Proyecto) return res.status(404).send({message:'El proyecto no existe'});

			return res.status(200).send({
				Proyecto

			});
		});

	},

	getProjects: (req, res) => {

		Proyecto.find({}).sort('-year').exec((err, projects)=> {

			if(err) return res.status(500).send({message:'Error al devolver los datos'});

			if(!projects) return res.status(404).send({message:'No hay proyectos que mostrar'});

			return res.status(200).send({projects});

		});
	},


	updateProject: (req, res) => {

		let id = req.params.id;
		let update = req.body;

		Proyecto.findByIdAndUpdate( id, update, {new: true}, (err, doc) => {

			if (err) return res.status(500).send({ message: "Error al actualizar los datos" });

			if (!doc) return res.status(404).send({ message: "El proyecto no existe" });

			if(doc) return res.status(200).send({
				project: doc
			});
		});

	},

	deleteProject: (req, res) => {

		let id = req.params.id;

		Proyecto.findByIdAndRemove(id, (err, projectRemoved) => {

			if (err) return res.status(500).send({ message: "Error al Eliminar el proyecto" });

			if (!projectRemoved) return res.status(404).send({ message: "El proyecto no existe" });

			if(projectRemoved) return res.status(200).send({
				project: projectRemoved
			});

		});
	},

	uploadImage: (req, res) => {
		
		let id = req.params.id;
		let filename = "... no existe una imagen";	

		if( req.files ){

			let path = req.files.image.path;
			let spl = path.split("\\");
			let filename = spl[1];

			let existe = filename.split('\.');
			let filexst = existe[1];

			if( filexst=='png' || filexst=='jpg' || filexst=='jpeg' || filexst=='gif' ){

				Proyecto.findByIdAndUpdate(id, {image: filename}, {new:true}, (err, projectUpdate) => {

					if (err) return res.status(500).send({ message: "La imagen no se ah subido" });

					if (!projectUpdate) return res.status(404).send({ message: "El proyecto no existe" });

					if(projectUpdate) return res.status(200).send({
						project: projectUpdate				
					});

				});

			}else{

				fs.unlink(path, (err) => {

					if(err) return res.status(500).send({ message:"Error al realizar la funcion" });

					return res.status(200).send({ message:"La extension no es valida" });

				});
			}
						
		}else{
			return res.status(200).send({
				files:filename
			});
		}

	},

	getImagenFile: (req, res) => {
		let file = req.params.image;
		let path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {

			if( exists ){
				return res.sendFile(dirpath.resolve(path_file));
			}else{
				
				return res.status(200).send({
					message:"No existe la Imagen..."
				});

			}
		})
	}
}

module.exports = proyectoController;