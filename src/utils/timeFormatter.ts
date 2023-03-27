export default (time: Date) => {
  return time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear()
}