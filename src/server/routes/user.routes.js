const Router = require("express");
const router = new Router();
const userController = require("../controllers/user.controller");

router.post("/login", userController.loginUser);
router.post("/getExamsByGroup", userController.getExamsByGroup);
router.post("/getExamsByTeacher", userController.getExamsByTeacher);
router.post("/getGroupById", userController.getGroupById);
router.post("/getStudentByGroupId", userController.getStudentByGroupId);
router.post("/getStudentNameById", userController.getStudentNameById);
router.post("/getTeacherById", userController.getTeacherById);

module.exports = router;
