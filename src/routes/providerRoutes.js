// import required constants
const express = require("express");
const router = express.Router(); // enable router;
const providerController = require("../controllers/providerController"); // provider controller

const { successRes } = require('../utils/responseHandler');

/**
 * @swagger
 * tags:
 *   name: provider
 *   description: provider endpoints
 */


/**
*  @swagger
*  paths:
*   /providers:
*     get:
*       summary: test provider route
*       tags: [provider]
*       responses:
*         "200":
*           description: test provider route
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
router.get("/test", (req, res) => successRes(res, 200, { message: 'Welcome to the Makala API v1.0! This is provider routes'}));

/**
*  @swagger
*  paths:
*   /providers/company-profile:
*     get:
*       summary: Get company profile
*       tags: [provider]
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
router.get("/", providerController.getAll);



/**
 * /api/v1/${id}:
 *  get:
 *    summary: Route for getting all records
 *    responses:
 *      '200':
 *        description: OK
 */
 router.get('/:id', providerController.get);

/**
 * /api/v1/create:
 *  provider:
 *    summary: Route for creating a record
 *    responses:
 *      '200':
 *        description: OK
 */
router.post('/add', providerController.add);


/**
 * /api/v1/edit/${id}:
 *  put:
 *    summary: Route for editing a record
 *    responses:
 *      '200':
 *        description: OK
 */
 router.put('/edit/:id', providerController.edit);


/**
 * /api/v1/delete/${id}:
 *  delet:
 *    summary: Route for deleting a record
 *    responses:
 *      '200':
 *        description: OK
 */
router.delete('/delete/:id', providerController.delete);


module.exports = router;