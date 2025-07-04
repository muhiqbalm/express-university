/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           description: Role user (admin/user)
 *       example:
 *         id: 1
 *         username: "budi"
 *         password: "budi123"
 *         role: "admin@gmail.com"
 *
 *     ResponseLogin:
 *       type: object
 *       required:
 *         - id
 *         - username
 *         - role
 *         - token
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         role:
 *           type: string
 *           description: Role user (admin/user)
 *         token:
 *           type: string
 *           description: Token untuk autentikasi
 *       example:
 *         id: 2
 *         username: "budi"
 *         role: "admin"
 *         token: "asdhajlsdjlAJLDjdlaslJALKDASJFLKA"
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Manajemen pengguna (user & admin)
 *
 * /users/login:
 *   post:
 *     summary: Login dan mendapatkan bearer token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               username: "budi"
 *               password: "budi123"
 *     responses:
 *       200:
 *         description: Login berhasil dan token diberikan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseLogin'
 *       401:
 *         description: Login gagal - Username atau password salah
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Invalid username or password
 *
 * /users/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Registrasi gagal - Validasi atau duplikat username/email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: Username already exists
 *
 * /users:
 *   get:
 *     summary: Mengambil seluruh data user (hanya admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daftar user berhasil diambil
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
 *                     $ref: '#/components/schemas/User'
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
