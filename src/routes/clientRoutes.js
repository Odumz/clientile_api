// import required constants
const express = require("express"),
    router = express.Router(), // enable router;
    clientController = require("../controllers/clientController"); // client controller

const { successRes } = require('../utils/responseHandler');

/**
 * @swagger
 * tags:
 *   name: client
 *   description: client endpoints
 */


/**
*  @swagger
*  paths:
*   /clients:
*     get:
*       summary: test client route
*       tags: [client]
*       responses:
*         "200":
*           description: test client route
*           content:
*             application/json:
*               schema:
*                 $ref: ''
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 token:
 *                   type: string
 *                   description: JWT client token
 *             example: 
 * 
*/
router.get("/test", (req, res) => successRes(res, 200, { message: 'Welcome to the Makala API v1.0! This is client routes'}));

/**
*  @swagger
*  paths:
*   /clients/company-profile:
*     get:
*       summary: Get company profile
*       tags: [client]
*       responses:
*         "200":
*           description: Get company profile.
*           content:
*             application/json:
*               schema:
*                 $ref: ''
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Response status
 *                 token:
 *                   type: string
 *                   description: JWT client token
 *             example: 
 * 
*/
router.get("/", clientController.getAll);



/**
 * /api/v1/${id}:
 *  get:
 *    summary: Route for getting all records
 *    responses:
 *      '200':
 *        description: OK
 */
 router.get('/:id', clientController.get);

/**
 * /api/v1/create:
 *  client:
 *    summary: Route for creating a record
 *    responses:
 *      '200':
 *        description: OK
 */
router.post('/add', clientController.add);


/**
 * /api/v1/edit/${id}:
 *  put:
 *    summary: Route for editing a record
 *    responses:
 *      '200':
 *        description: OK
 */
 router.put('/edit/:id', clientController.edit);


/**
 * /api/v1/delete/${id}:
 *  delet:
 *    summary: Route for deleting a record
 *    responses:
 *      '200':
 *        description: OK
 */
router.delete('/delete/:id', clientController.delete);


module.exports = router;