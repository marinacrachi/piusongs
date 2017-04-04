import { Song } from '.'

let song

beforeEach(async () => {
  song = await Song.create({ level: 'test', releaseVersion: 'test', presentIn: 'test', disc: 'test', stepCount: 'test', patterns: 'test', Id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = song.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(song.id)
    expect(view.level).toBe(song.level)
    expect(view.releaseVersion).toBe(song.releaseVersion)
    expect(view.presentIn).toBe(song.presentIn)
    expect(view.disc).toBe(song.disc)
    expect(view.stepCount).toBe(song.stepCount)
    expect(view.patterns).toBe(song.patterns)
    expect(view.Id).toBe(song.Id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = song.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(song.id)
    expect(view.level).toBe(song.level)
    expect(view.releaseVersion).toBe(song.releaseVersion)
    expect(view.presentIn).toBe(song.presentIn)
    expect(view.disc).toBe(song.disc)
    expect(view.stepCount).toBe(song.stepCount)
    expect(view.patterns).toBe(song.patterns)
    expect(view.Id).toBe(song.Id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
