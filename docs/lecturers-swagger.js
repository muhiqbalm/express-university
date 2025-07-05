/**
 * @swagger
 * components:
 *   schemas:
 *     Lecturer:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - gender
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unik dosen
 *         first_name:
 *           type: string
 *           description: Nama depan dosen
 *         last_name:
 *           type: string
 *           description: Nama belakang dosen
 *         email:
 *           type: string
 *           format: email
 *           description: Email dosen (unique)
 *         gender:
 *           type: string
 *           description: Jenis kelamin dosen (male/female)
 *       example:
 *         id: 1
 *         first_name: "Budi"
 *         last_name: "Subambang"
 *         email: "budisubambang@gmail.com"
 *         gender: "male"
 *
 *     PayloadLecturer:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - gender
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nama depan dosen
 *         last_name:
 *           type: string
 *           description: Nama belakang dosen
 *         email:
 *           type: string
 *           format: email
 *           description: Email dosen (unique)
 *         gender:
 *           type: string
 *           description: Jenis kelamin dosen (male/female)
 *       example:
 *         first_name: "Budi"
 *         last_name: "Subambang"
 *         email: "budisubambang@gmail.com"
 *         gender: "male"
 *
 *     PartialPayloadLecturer:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           description: Nama depan dosen
 *         last_name:
 *           type: string
 *           description: Nama belakang dosen
 *         email:
 *           type: string
 *           description: Email dosen (unique)
 *           format: email
 *         gender:
 *           type: string
 *           description: Jenis kelamin dosen (male/female)
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
 *   name: Lecturers
 *   description: API untuk mengelola data dosen
 */

/**
 * @swagger
 * /lecturers:
 *   get:
 *     summary: Mengambil semua data dosen
 *     tags: [Lecturers]
 *     responses:
 *       200:
 *         description: Daftar dosen berhasil diambil
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
 *                     $ref: '#/components/schemas/Lecturer'
 */
/**
 * @swagger
 * /lecturers:
 *   post:
 *     summary: Menambahkan data dosen baru
 *     tags: [Lecturers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayloadLecturer'
 *     responses:
 *       201:
 *         description: dosen berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer created successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Lecturer'
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
/**
 * @swagger
 * /lecturers/{id}:
 *   put:
 *     summary: Memperbarui data dosen secara keseluruhan berdasarkan ID
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dosen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PayloadLecturer'
 *     responses:
 *       200:
 *         description: Data dosen berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Lecturer'
 *       404:
 *         description: dosen dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer with ID 1 not found
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
/**
 * @swagger
 * /lecturers/{id}:
 *   get:
 *     summary: Mengambil data dosen berdasarkan ID
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dosen
 *     responses:
 *       200:
 *         description: Data dosen dengan ID tertentu berhasil didapatkan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/Lecturer'
 *       404:
 *         description: dosen dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer with ID 1 not found
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
/**
 * @swagger
 * /lecturers/{id}:
 *   patch:
 *     summary: Memperbarui sebagian data dosen berdasarkan ID
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dosen
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PartialPayloadLecturer'
 *     responses:
 *       200:
 *         description: Data dosen berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer updated successfully.
 *                 data:
 *                   $ref: '#/components/schemas/Lecturer'
 *       404:
 *         description: dosen dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer with ID 1 not found
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
/**
 * @swagger
 * /lecturers/{id}:
 *   delete:
 *     summary: Menghapus data dosen berdasarkan ID
 *     tags: [Lecturers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dosen
 *     responses:
 *       200:
 *         description: Data dosen berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer deleted successfully.
 *       404:
 *         description: dosen dengan ID tersebut tidak ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lecturer with ID 1 not found
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
