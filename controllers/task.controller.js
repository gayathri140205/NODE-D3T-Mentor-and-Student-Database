const TaskRouter = require('express').Router();
//Importing the models
const Mentor = require("../model/Mentor");
const Student = require("../model/Student");


// CREATE Mentor
TaskRouter.post("/mentor", async (req, res) => {
    try {
      const mentor = new Mentor(req.body);
      await mentor.save();
      res.send(mentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // CREATE Student
  TaskRouter.post("/student", async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Assign
  TaskRouter.post("/mentor/:mentorId/assign", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      const students = await Student.find({ _id: { $in: req.body.students } });
      students.forEach((student) => {
        student.cMentor = mentor._id;
        student.save();
      });
      mentor.students = [
        ...mentor.students,
        ...students.map((student) => student._id),
      ];
      await mentor.save();
      res.send(mentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  //Assign and change
  TaskRouter.put("/student/:studentId/assignMentor/:mentorId", async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const nMentor = await Mentor.findById(req.params.mentorId);
  
      if (student.cMentor) {
        student.pMentor.push(student.cMentor);
      }
  
      student.cMentor = nMentor._id;
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Show all students for a particular mentor
  TaskRouter.get("/mentor/:mentorId/students", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId).populate(
        "students"
      );
      res.send(mentor.students);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
// Show the previously assigned mentor for a particular student
TaskRouter.get("/student/:studentId/pMentor", async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId).populate(
        "pMentor"
      );
      if (!student) {
        return res.status(404).json({ error: "No previous Mentor Available" });
      } else {
        res.send(student.pMentor);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = TaskRouter;