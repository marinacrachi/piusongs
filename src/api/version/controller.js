import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Version } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Version.create(body)
    .then((version) => version.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Version.find(query, select, cursor)
    .then((versions) => versions.map((version) => version.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Version.findById(params.id)
    .then(notFound(res))
    .then((version) => version ? version.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Version.findById(params.id)
    .then(notFound(res))
    .then((version) => version ? _.merge(version, body).save() : null)
    .then((version) => version ? version.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Version.findById(params.id)
    .then(notFound(res))
    .then((version) => version ? version.remove() : null)
    .then(success(res, 204))
    .catch(next)
