import type { MaBaseComponent } from './types'

/**
 * Instantiates a marmo component factory inside a Solid component or scope.
 *
 * Solid components are only executed once, so `createMarmo` simply evaluates the
 * incoming factory and returns the generated component.
 */
const createMarmo = <Props extends object>(factory: () => MaBaseComponent<Props>): MaBaseComponent<Props> => {
  return factory()
}

export default createMarmo
