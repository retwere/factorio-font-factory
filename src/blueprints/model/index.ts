/** An entity. */
export abstract class Entity<Schema> {
  abstract encode(): Schema
}
