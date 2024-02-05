
export default interface LinearState {
  id: string,
  info: string,
  renderFn: React.FunctionComponent,
  next: string|null
  prev: string|null
}