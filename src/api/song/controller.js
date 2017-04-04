import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Song } from '.'
import { Version } from '../version' // importei aqui 

export const create = ({ bodymen: { body } }, res, next) =>
{
  // Version.findById(body.versionId)
  //   .then((version) =>  version.view(true))
  //   .then((newVersion) => {
  //     console.log(newVersion)
    return Song.create(body)
    
   
    .then((song) => song.view(true))
    .then(success(res, 201))
    .catch(next)
  }

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Song.find(query, select, cursor)
    .then((songs) => songs.map((song) => song.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Song.findById(params.id)
    .populate('releaseVersion').exec()
    .then(notFound(res))
    .then((song) => song ? song.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Song.findById(params.id)
    .then(notFound(res))
    .then((song) => song ? _.merge(song, body).save() : null)
    .then((song) => song ? song.view(true) : null)
    .then(success(res))
    .catch(next)

// export const destroy = ({ params }, res, next) =>
//   Song.findById(params.id)
//     .then(notFound(res))
//     .then((song) => song ? song.remove() : null)
//     .then(success(res, 204))
//     .catch(next)

export const destroy = ({ params }, res, next) => {
  console.log(params)
  return Song.findOne({name:params.id})
    .then(notFound(res))
    .then((song) => song ? song.remove() : null)
    .then(success(res, 204))
    .catch(next) }
