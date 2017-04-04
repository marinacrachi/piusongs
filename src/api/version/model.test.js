import { Version } from '.'

let version

beforeEach(async () => {
  version = await Version.create({ name: 'test', releaseDate: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = version.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(version.id)
    expect(view.name).toBe(version.name)
    expect(view.releaseDate).toBe(version.releaseDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = version.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(version.id)
    expect(view.name).toBe(version.name)
    expect(view.releaseDate).toBe(version.releaseDate)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
