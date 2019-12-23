export function getSongUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
export function generateSong(song) {
  const { id, picUrl, name, artists, mvid, duration } = song
  return {
    id,
    url: getSongUrl(id),
    picUrl,
    name,
    artists,
    mvid,
    duration: duration / 1000
  }
}