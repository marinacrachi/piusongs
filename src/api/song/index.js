import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Song, { schema } from './model'

const router = new Router()
const { name, optionalName, level, releaseVersion, disc, stepCount, patterns, Id } = schema.tree

/**
 * @api {post} /songs Create song
 * @apiName CreateSong
 * @apiGroup Song
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam level Song's level.
 * @apiParam releaseVersion Song's releaseVersion.
 * @apiParam presentIn Song's presentIn.
 * @apiParam disc Song's disc.
 * @apiParam stepCount Song's stepCount.
 * @apiParam patterns Song's patterns.
 * @apiParam Id Song's Id.
 * @apiSuccess {Object} song Song's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Song not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ name, optionalName, level:[Object], releaseVersion, disc, stepCount, patterns, Id }),
  create)

/**
 * @api {get} /songs Retrieve songs
 * @apiName RetrieveSongs
 * @apiGroup Song
 * @apiUse listParams
 * @apiSuccess {Object[]} songs List of songs.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({name}),
  index)

/**
 * @api {get} /songs/:id Retrieve song
 * @apiName RetrieveSong
 * @apiGroup Song
 * @apiSuccess {Object} song Song's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Song not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /songs/:id Update song
 * @apiName UpdateSong
 * @apiGroup Song
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam level Song's level.
 * @apiParam releaseVersion Song's releaseVersion.
 * @apiParam presentIn Song's presentIn.
 * @apiParam disc Song's disc.
 * @apiParam stepCount Song's stepCount.
 * @apiParam patterns Song's patterns.
 * @apiParam Id Song's Id.
 * @apiSuccess {Object} song Song's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Song not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ name, optionalName, level, releaseVersion, disc, stepCount, patterns, Id }),
  update)

/**
 * @api {delete} /songs/:id Delete song
 * @apiName DeleteSong
 * @apiGroup Song
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Song not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
