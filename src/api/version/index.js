import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Version, { schema } from './model' 

const router = new Router()
const { name, releaseDate } = schema.tree

/**
 * @api {post} /versions Create version
 * @apiName CreateVersion
 * @apiGroup Version
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Version's name.
 * @apiParam releaseDate Version's releaseDate.
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 * @apiError 401 master access only.
 */
router.post('/',
  body({ name, releaseDate }),
  create)

/**
 * @api {get} /versions Retrieve versions
 * @apiName RetrieveVersions
 * @apiGroup Version
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} versions List of versions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  query({releaseDate}),
  index)

/**
 * @api {get} /versions/:id Retrieve version
 * @apiName RetrieveVersion
 * @apiGroup Version
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  show)

/**
 * @api {put} /versions/:id Update version
 * @apiName UpdateVersion
 * @apiGroup Version
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Version's name.
 * @apiParam releaseDate Version's releaseDate.
 * @apiSuccess {Object} version Version's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Version not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  body({ name, releaseDate }),
  update)

/**
 * @api {delete} /versions/:id Delete version
 * @apiName DeleteVersion
 * @apiGroup Version
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Version not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  destroy)

export default router
