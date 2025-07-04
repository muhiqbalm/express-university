const express = require("express");
const router = express.Router();
const { StudentsControllers } = require("../controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - gender
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unik mahasiswa
 *         first_name:
 *           type: string
 *           description: Nama depan mahasiswa
 *         last_name:
 *           type: string
 *           description: Nama belakang mahasiswa
 *         email:
 *           type: string
 *           format: email
 *           description: Email mahasiswa (unique)
 *         gender:
 *           type: string
 *           description: Jenis kelamin mahasiswa (male/female)
 *       example:
 *         id: 1
 *         first_name: "Budi"
 *         last_name: "Subambang"
 *         email: "budisubambang@gmail.com"
 *         gender: "male"
 *
 *     PayloadStudent:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - gender
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nama depan mahasiswa
 *         last_name:
 *           type: string
 *           description: Nama belakang mahasiswa
 *         email:
 *           type: string
 *           format: email
 *           description: Email mahasiswa (unique)
 *         gender:
 *           type: string
 *           description: Jenis kelamin mahasiswa (male/female)
 *       example:
 *         first_name: "Budi"
 *         last_name: "Subambang"
 *         email: "budisubambang@gmail.com"
 *         gender: "male"
 *
 *     PartialPayloadStudent:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nama depan mahasiswa
 *         last_name:
 *           type: string
 *           description: Nama belakang mahasiswa
 *         email:
 *           type: string
 *           description: Email mahasiswa (unique)
 *           format: email
 *         gender:
 *           type: string
 *           description: Jenis kelamin mahasiswa (male/female)
 *       minProperties: 1
 *       additionalProperties: false
 *       example:
 *         first_name: "Budi"
 *         last_name: "Subambang"
 *         email: "budisubambang@gmail.com"
 *         gender: "male"
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API untuk mengelola data mahasiswa
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Mengambil semua data mahasiswa
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Daftar mahasiswa berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */
router.get("/", StudentsControllers.getAllStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Menambahkan data mahasiswa baru
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayloadStudent'
 *     responses:
 *       201:
 *         description: Siswa berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       400:
 *         description: Bad Request - Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               InvalidPayload:
 *                 summary: Payload tidak sesuai
 *                 value:
 *                   message: "All fields are required: first_name, last_name, email, gender."
 *               EmailExist:
 *                 summary: Email sudah terdaftar
 *                 value:
 *                   message: Email already exist.
 *               InvalidEmail:
 *                 summary: Format email tidak sesuai
 *                 value:
 *                   message: Email format must be valid.
 *               InvalidGender:
 *                 summary: Tipe gender tidak sesuai
 *                 value:
 *                   message: Gender must be female or male.
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */

router.post("/", StudentsControllers.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Memperbarui data mahasiswa secara keseluruhan berdasarkan ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID mahasiswa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayloadStudent'
 *     responses:
 *       200:
 *         description: Data mahasiswa berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Siswa dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student with ID 1 not found
 *       400:
 *         description: Bad Request - Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               InvalidPayload:
 *                 summary: Payload tidak sesuai
 *                 value:
 *                   message: "All fields are required: first_name, last_name, email, gender."
 *               EmailExist:
 *                 summary: Email sudah terdaftar
 *                 value:
 *                   message: Email already exist.
 *               InvalidEmail:
 *                 summary: Format email tidak sesuai
 *                 value:
 *                   message: Email format must be valid.
 *               InvalidGender:
 *                 summary: Tipe gender tidak sesuai
 *                 value:
 *                   message: Gender must be female or male.
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */
router.put("/:id", StudentsControllers.updateStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Mengambil data mahasiswa berdasarkan ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID mahasiswa
 *     responses:
 *       200:
 *         description: Data mahasiswa dengan ID tertentu berhasil didapatkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Siswa dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student with ID 1 not found
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */
router.get("/:id", StudentsControllers.getStudentById);

/**
 * @swagger
 * /students/{id}:
 *   patch:
 *     summary: Memperbarui sebagian data mahasiswa berdasarkan ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID mahasiswa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartialPayloadStudent'
 *     responses:
 *       200:
 *         description: Data mahasiswa berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Student'
 *       404:
 *         description: Siswa dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student with ID 1 not found
 *       400:
 *         description: Bad Request - Validasi gagal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               InvalidPayload:
 *                 summary: Payload tidak sesuai
 *                 value:
 *                   message: "Please input one of these fields: first_name, last_name, email, gender."
 *               EmailExist:
 *                 summary: Email sudah terdaftar
 *                 value:
 *                   message: Email already exist.
 *               InvalidEmail:
 *                 summary: Format email tidak sesuai
 *                 value:
 *                   message: Email format must be valid.
 *               InvalidGender:
 *                 summary: Tipe gender tidak sesuai
 *                 value:
 *                   message: Gender must be female or male.
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */
router.patch("/:id", StudentsControllers.patchStudent);

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Menghapus data mahasiswa berdasarkan ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID mahasiswa
 *     responses:
 *       200:
 *         description: Data mahasiswa berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student deleted successfully.
 *       404:
 *         description: Siswa dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student with ID 1 not found
 *       401:
 *         description: Unauthorized - Token tidak diberikan atau tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Unauthorized.
 *       403:
 *         description: Forbidden - Bukan admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Action forbidden.
 */
router.delete("/:id", StudentsControllers.deleteStudent);

module.exports = router;
