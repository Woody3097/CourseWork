const conn = require("../app");
require("dotenv").config();

class UserController {
  loginUser(req, res) {
    const { fullName, code } = req.body;

    conn.query('SELECT EXISTS(SELECT userId FROM users WHERE full_name = ? and password = ?) as exist', [fullName, code]).then(data => {
      res.status(200).send(data[0]);
    }).catch(err => res.send(err))
  }

  getExamsByGroup(req, res) {
    const { group } = req.body;

    conn.query("SELECT groupId from groups_ where group_name = ?", [group]).then(data => {
      conn.query("SELECT * from exams where groupId = ?", [data[0][0]]).then(data1 => {
          res.status(200).send(data1[0]);

      }).catch(err => res.send(err))
    })
  }

  getExamsByTeacher(req, res) {
    const { fullName } = req.body;

    conn.query("SELECT userId from schedule_of_exam.users where full_name = ?", [fullName]).then(data => {
      conn.query("SELECT * from schedule_of_exam.exams where teacherId = ?", [data[0][0].userId, data[0][0].userId]).then(data1 => {
        res.status(200).send(data1[0]).catch(err => res.send([]));
      }).catch(err => res.send([]))
    })
  }

  getGroupById(req, res) {
    const { id } = req.body;

    conn.query('select group_name from groups_ where groupId = ?', [id]).then(data => {
      console.log(data)
      res.send(data[0]);
    })
  }

  getStudentByGroupId(req, res) {
    const { id } = req.body;

    conn.query('select studentId from students where groupId = ?', [id]).then(data => {
      res.send(data[0]);
    })
  }

  getStudentNameById(req, res) {
    const id = req.body;

    conn.query('select full_name as student_name from users where userId = ?', [id]).then(data => {
      res.send(data[0]);
    })
  }

  getTeacherById(req, res) {
    const { id } = req.body;

    conn.query('select full_name from schedule_of_exam.users where userId = ?', [id]).then(data => {
      res.send(data[0]);
    })
  }
}

module.exports = new UserController();
