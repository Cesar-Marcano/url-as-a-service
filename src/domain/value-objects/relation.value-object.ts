export class Relation<T> {
  constructor(
    public readonly id: number,
    private readonly _data?: T,
  ) {}

  get isPopulated(): boolean {
    return !!this._data
  }

  get data(): T {
    if (!this._data) throw new Error('Relation not populated')
    return this._data
  }
}
